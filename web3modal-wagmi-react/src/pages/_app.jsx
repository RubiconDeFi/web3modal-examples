import { useEffect, useState } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";
import { getDefaultWallets, connectorsForWallets, RainbowKitProvider, darkTheme } from '@rubicondefi/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import { braveWallet } from '@rubicondefi/rainbowkit/wallets';

import "../styles.css";
import '@rubicondefi/rainbowkit/styles.css';


// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Configure wagmi client
const { chains, publicClient } = configureChains(
  [optimism],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  projectId,
  appName: 'Rubicon App',
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [braveWallet({ chains })],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
          >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      ) : null}

    </>
  );
}
