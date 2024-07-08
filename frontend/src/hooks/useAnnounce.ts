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

const useAnnounce = (id: number) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async () => {
      if (!isSupportedChain(chainId)) {
        return toast.error("Wrong network | Connect your wallet");
      }
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContract(signer);

      try {
          const transaction = await contract.pickWinners(id);
          console.log("transaction",transaction);
          
          const receipt = await transaction.wait();

        if (receipt.status) {
          return toast.success("Winners announced!!");
          
        } 
          toast.error("Announcement failed!");
        
      } catch (error: unknown) {
        console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Lottery is not active") {
          errorText = "Lottery no longer active!";
        } else if (err?.reason === "Lottery duration has not ended") {
          errorText = "Wait for play time to end!";
        }
        else if (
          err?.reason === "requestRandomWords not called yet" ||
          err?.reason === "Wait a bit longer for fulfillment" ||
          err?.reason === "Request not yet fulfilled" ||
          err?.reason === "no out of bounds"
        ) {
          errorText = "drawing...wait!";
        }
        else {
          console.log(err?.message);
          errorText = "An unknown error occurred!";
        }

        toast.error(`${errorText}`);
      }
    },
    [chainId, walletProvider, id]
  );
};

export default useAnnounce;
