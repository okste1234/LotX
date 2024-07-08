"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import { isSupportedChain } from "@/utils/constant/chain";
import { getProvider } from "@/utils/constant/provider";
import { getContract } from "@/utils/constant/contract";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useCreateLottery = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (time: any) => {
      if (!isSupportedChain(chainId)) return toast.error("Wrong network | Connect your wallet");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getContract(signer);

      try {
        const transaction = await contract.createLottery(time);
        const receipt = await transaction.wait();

        // console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("Lottery created successfully!");
        }

        toast.error("Lottery creation failed!");
      } catch (error: unknown) {
        console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Invalid future time") {
          errorText = "You have to pick a valid time!";
        } else {
            console.log(err?.message);
            
          errorText ="An unknown error occurred!";
        }

        toast.error(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider]
  );
};

export default useCreateLottery;
