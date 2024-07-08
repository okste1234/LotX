"use client"
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SUPPORTED_CHAIN_ID= 11155111;


const sepolia = {
    chainId: SUPPORTED_CHAIN_ID,
    name: "Sepolia",
    currency: "ETH",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: process.env.NEXT_PUBLIC_rpc_url || "",
};


const metadata = {
    name: "LotX",
    description: "Experience the thrill of playing the lottery with our secured app. Check your numbers, claim your prizes, and stay up-to-date with the latest jackpot information.",
    url: "https://lot-x.vercel.app/", 
    icons: ["https://avatars.mywebsite.com/"],
};

export const configureWeb3Modal = () =>
    createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains: [sepolia],
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
        enableAnalytics: false, 
    });
