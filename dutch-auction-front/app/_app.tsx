
import "./globals.css";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 
import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}