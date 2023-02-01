import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from "../components/commons/navbar";
import Footer from '@/components/commons/footer';
import { RecoilRoot } from 'recoil'
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }
  
  if (typeof window === 'undefined') {
    return <></>;
  } else {
  return ( 
    <RecoilRoot>
    <Navbar>
    <Component {...pageProps} />
    </Navbar>
    </RecoilRoot>
    )
  }
}
