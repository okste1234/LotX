"use client";

import { useCallback, useState } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import { isSupportedChain } from "@/utils/constant/chain";
import { getProvider } from "@/utils/constant/provider";
import { getContract } from "@/utils/constant/contract";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useDrawWinners = (id: number) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [status, setStatus] = useState<boolean>(false);

  // console.log("IDDDD",id);
  
  const drawWinners = useCallback(async () => {
    if (!isSupportedChain(chainId)) {
      return toast.error("Wrong network | Connect your wallet");
    }
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = getContract(signer);

    try {
      const transaction = await contract.makeDraw(id);
      // console.log("transaction", transaction);
      
      const receipt = await transaction.wait();
      // console.log("receipt: ", receipt);

      if (receipt.status) {
        toast.success("Rounds draw began!");
        setStatus(true);
      } else {
        toast.error("Trigger random winner failed!");
      }
    } catch (error: unknown) {
      console.log(error);
      const err = error as ErrorWithReason;
      let errorText: string;

      if (err?.reason === "Lottery is not active") {
        errorText = "Lottery no longer active!";
      } else if (err?.reason === "Lottery duration has not ended") {
        errorText = "Wait for play time to end!";
      } else {
        console.log(err?.message);
        errorText = "An unknown error occurred!";
      }

      toast.error(`${errorText}`);
    }
  }, [chainId, walletProvider, id]);

  return [drawWinners, status] as const;
};

export default useDrawWinners;
