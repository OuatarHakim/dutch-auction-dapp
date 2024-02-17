
"use client"; 
// Dans Layout
import React, { ReactNode, useState } from 'react';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Utils/Navbar';
import './globals.css'

interface LayoutProps {
  children: ReactNode;
  dehydratedState?: DehydratedState; // Rendre dehydratedState optionnel
}

const Layout = ({ children, dehydratedState }: LayoutProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body >
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <Navbar />
        <div>{children}</div>
      </Hydrate>
    </QueryClientProvider>
    </body>
    </html>
  );
};

export default Layout;
