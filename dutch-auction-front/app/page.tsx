


"use client"; 
import React, { useState, useEffect, FormEvent } from 'react';
import { ethers } from 'ethers';
import abi from "./abi.json";
import { resolve } from 'path';
import axios from 'axios';
const Homepage = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const [userBalance, setUserBalance] = useState<string>('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [auctions, setAuctions] = useState<any[]>([]);
  const [auctionsRendered, setAuctionsRender] = useState<any[] | null>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [ au, setAu] = useState<any[]>([(<><div>Hola</div></>)]);
  const contractAddress =  "";

  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setUserAddress(account);

        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);

        const signer = ethProvider.getSigner();
        const balance = await ethProvider.getBalance(account);
        setUserBalance(ethers.utils.formatEther(balance));

        fetchAuctions(ethProvider);
      } else {
        alert("Veuillez installer MetaMask pour accéder à cette fonctionnalité.");
      }
    } catch (error) {
      console.error('Erreur lors de la connexion à MetaMask :', error);
    }
  };

  const fetchAuctions = async (ethProvider: ethers.providers.Web3Provider) => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, ethProvider);
  
      const fetchedAuctions = await contract.getAuctions();
      console.log(fetchAuctions);
  
      setAuctions(fetchedAuctions);
    } catch (error) {
      console.error('Erreur lors de la récupération des enchères :', error);
    }
  };
  

  useEffect(() => {
    if (provider) {
      fetchAuctions(provider);
    }
  }, [provider]);

  const getPrice = async (auction: any) => {
    if (provider) {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const startTime = auction.startNow;
      const elapsedTime = Math.floor(new Date().getTime() / 1000) - startTime;

      let startingPrice = await contract.STARTING_PRICE();
      let priceDec = await contract.PRICE_DECREMENT();
      const currentPrice = startingPrice - (priceDec * Math.floor(elapsedTime / 60));
      const reservePrice = await contract.RESERVE_PRICE();

      let res = Math.max(currentPrice, reservePrice) / (10 ** 18);
      return res;
    } else {
      return ethers.utils.parseUnits('0', 'ether');
    }
  };

  const acheterArticle = async (value: number, auction: any, articleId: any) => {
    if (provider) {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const articleIndex = articleId;
      const bidAmount = ethers.utils.parseUnits(value.toString(), 'ether');
      try {
        if (provider) {
          const ganacheUrl = 'http://localhost:7545';
          await axios.post(ganacheUrl, { jsonrpc: '2.0', method: 'evm_increaseTime', params: [0], id: new Date().getTime() });
          await axios.post(ganacheUrl, { jsonrpc: '2.0', method: 'evm_mine', id: 1 });
        }

        let signer = provider.getSigner();
        let signedTransaction = await signer.sendTransaction({ to: contract.address, value: bidAmount, data: contract.interface.encodeFunctionData('placeBid', [articleIndex, auction.id - 1]) });

        await signedTransaction.wait();
        setAuctionsRender(null);
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  const renderAuctions = async () => {console.log('render auctions');

    if (provider) {console.log('provider', provider);
      try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const auct = await contract.getAuctions();
        
        let getPrices = async () => {
          let prices = [];
          for (let index = 0; index < auctions.length; index++) {
            const au = auctions[index];
            let price = await getPrice(au);
            prices.push(price);
          }
          return prices;
        }
        let prices = await getPrices();
        
        const renderedAuctionsMap = auct.map( (auction: any, index: any) => {
          console.log('check auction', auction);
          if (auction.closed) return null;
  
          const articles = auction.articles.filter((a: any) => a.name);
          console.log('check articles', articles);
          
          const auctionsArticles = articles.map( (a: any, index: any) => {
            if (a.closed) return null;
  
            const handleSubmit = (e: any) => {
              e.preventDefault();
              let value = e.target.buy.value;
              acheterArticle(value, auction, index);
            }
  
            let price: any = a.currentPrice;
  
            let buildArt = (a: any, price: any) => {
              return (
                <div key={index} className="bg-gray-100 p-4 rounded-md">
  <div className="font-semibold">
    {a.name} {(auction.idxArticle.toNumber() == index) ? <span className="text-green-500">(Current)</span> : ''}
  </div>
  <div className="mt-2">
    Prix: {ethers.utils.formatEther(price)} eth
  </div>

  {(auction.idxArticle.toNumber() == index) ?
    (
      <>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center">
            <input type="number" name="buy" step="0.1" min="0.2" className="mr-2 py-2 px-4 border border-gray-300 rounded-md" />
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Acheter
            </button>
          </div>
        </form>
      </>
    ) :
    (<></>)
  }
</div>
              );
            }
  
            if (auction.idxArticle.toNumber() == index) {
              price = prices[index];
              return buildArt(a, ethers.utils.parseUnits(price.toString(), 'ether'));
            } else {
              return buildArt(a, price);
            }
          })
  
          return (
            <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4">
            <div className="font-semibold text-lg mb-2">Enchère {auction.id.toString()}</div>
            <div className="flex flex-col">
              <div className="font-semibold mb-1">Articles</div>
              <div className="article-wrapper">
                {auctionsArticles}
              </div>
            </div>
          </div>
          )
        })
        //console.log('rendered', renderedAuctionsMap);
        return renderedAuctionsMap;
      } catch (error) {
        console.error('Erreur lors de la récupération des enchères :', error);
      }
    } else {
      return ""
    }
    
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      renderAuctions().then(au => {
        //alert('render auctions', au);
        setAuctionsRender(au);
      })
    }, 1000);
    return () => clearInterval(interval);
  }, [auctionsRendered, au, provider]);

  const ajoutArticleEnchere = () => {
    let newArticles = [...articles];
    newArticles.push(<div className="article-input" key={articles.length}><input type="text" name="article" className="input-field" /></div>);
    setArticles(newArticles);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)

    let sendArticles = formData.getAll('article');

    if (sendArticles.length > 0) {
      if (provider) {
        let data = [sendArticles];
        try {
          let signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, provider);
          const signedTransaction = await signer.sendTransaction({
            to: contract.address,
            value: 0,
            data: contract.interface.encodeFunctionData('createAuction', data),
          });

          await signedTransaction.wait();
          setArticles([]);

        } catch (e: any) {
          console.log(e);
        }
      }
    }
  }
  return (
    <div className="bg-gray-100 p-4">
  <div className="header">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={connectMetaMask}>
      Connecter avec MetaMask
    </button>
  </div>
  {userAddress && (
    <div className="mt-4">
      <p className="text-gray-800">Adresse: {userAddress}</p>
      <p className="text-gray-800">Solde: {userBalance} ETH</p>
    </div>
  )}
  <div className="mt-8">
    <div className="create-auction">
      <h2 className="text-xl font-semibold mb-4">Créer une enchère</h2>
      <form onSubmit={onSubmit}>
        <div className="article-list mb-4">
          <h3 className="text-lg font-semibold mb-2">Les articles de l'enchère</h3>
          {articles}
        </div>
        <div className="add-button mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={ajoutArticleEnchere} type="button">Ajouter les articles</button>
        </div>
        {articles.length > 0 && (
          <div className="action-buttons">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2" type="submit">Créer l'enchère</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" type="button" onClick={() => { setArticles([]); }}>Annuler</button>
          </div>
        )}
      </form>
    </div>
    <div className="live-auctions mt-8">
      <h2 className="text-xl font-semibold mb-4">Les Enchères en cours</h2>
      <div className="auction-wrapper">
        {auctionsRendered}
      </div>
    </div>
  </div>
</div>

  );
};


export default Homepage;

