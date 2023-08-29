import { useEffect, useState } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";
import { getDefaultWallets, connectorsForWallets, RainbowKitProvider, darkTheme } from '@rubicondefi/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { braveWallet } from '@rubicondefi/rainbowkit/wallets';
import '@rubicondefi/rainbowkit/styles.css';
import Button from "Button";

const projectId = import.meta.env.VITE_NEXT_PUBLIC_PROJECT_ID;
console.log(import.meta)

enum Network {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  OPTIMISM_KOVAN = 69,
  OPTIMISM_MAINNET = 10,
  POLYGON_MAINNET = 137,
  POLYGON_MUMBAI = 80001,
  BSC_MAINNET = 56,
  GNOSIS_CHAIN_MAINNET = 100,
  FANTOM_OPERA_MAINNET = 250,
  ARBITRUM_MAINNET = 42161,
  ARBITRUM_GOERLI = 421613,
  BASE_MAINNET = 8453,
  BASE_GOERLI = 84531,
  AVALANCHE_C_CHAIN_MAINNET = 43114,
  AURORA_MAINNET = 1313161554,
  OPTIMISM_GOERLI = 420,
}

const RPC_URLS = {
  [Network.OPTIMISM_MAINNET]: "https://rpc.ankr.com/optimism"
}

// 2. Configure wagmi client
const { chains, publicClient } = configureChains(
  [optimism],
  [jsonRpcProvider({ rpc: (chain) => ({ http: RPC_URLS[chain.id as keyof typeof RPC_URLS] }) })]
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
export default function App() {

  return (
    <>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
          >
            <Button />
          </RainbowKitProvider>
        </WagmiConfig>

    </>
  );
}
