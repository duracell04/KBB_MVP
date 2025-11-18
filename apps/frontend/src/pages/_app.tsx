import type { AppProps } from "next/app";
import Head from "next/head";
import AppProviders from "@/components/providers";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>KBB MVP - Kartvelian Business Bonds | Georgian SME Financing</title>
      <meta
        name="description"
        content="Kartvelian Business Bonds: Fixed-income notes with programmable tokens, DvP settlement, and regulated cash rails for Georgian SMEs and professional investors."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content="tokenized securities, private debt, DvP, ISO 20022, ERC-3643, permissioned transfers, stablecoin, escrow, audit-ready, blockchain bonds"
      />
      <meta name="author" content="KBB MVP" />
      <meta property="og:title" content="KBB MVP - Token-registered Private Debt on Regulated Rails" />
      <meta
        property="og:description"
        content="Kartvelian Business Bonds: Making private debt programmable and auditable without pretending payments are on-chain."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/favicon.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@KBBProtocol" />
      <meta name="twitter:image" content="/favicon.png" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  </>
);

export default App;
