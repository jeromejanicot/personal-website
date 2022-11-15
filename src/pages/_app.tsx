import React from "react"
import "../styles/global.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="page general-padding">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
