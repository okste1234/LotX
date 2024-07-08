"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import { isSupportedChain } from "@/utils/constant/chain";
import { getProvider } from "@/utils/constant/provider";
import { getContract } from "@/utils/constant/contract";
import { ethers } from "ethers";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const usePlayLottery = (id: number) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async () => {
      if (!isSupportedChain(chainId)) return toast.error("Wrong network | Connect your wallet");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getContract(signer);
        const amount = ethers.parseEther("0.000015")
        // console.log(amount);

      try {
        const transaction = await contract.enterLottery(id, {
                value: amount
            });
        const receipt = await transaction.wait();

        // console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("ticket purchased!");
        }

        toast.error("Play failed!");
      } catch (error: unknown) {
        console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Lottery is not active") {
          errorText = "Lottery no longer active!";
        } else if (err?.reason === "Lottery has ended") {
            errorText = "Lottery has ended!";
        } else if (err?.reason === "Incorrect entry fee") {
            errorText = "Incorrect entry fee!";
        }
        else {
            
            console.log(err?.message);
            
          errorText ="An unknown error occurred!";
        }

        toast.error(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider, id]
  );
};

export default usePlayLottery;
