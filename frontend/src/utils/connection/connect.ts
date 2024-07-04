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
    name: "UmmahTech",
    description: "A decentralized learning application onChain tailored to give seamless learning and development for individuals. A place where students meet mentors, and opportunities",
    url: "", 
    icons: ["https://avatars.mywebsite.com/"],
};

export const configureWeb3Modal = () =>
    createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains: [sepolia],
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
        enableAnalytics: false, 
    });
