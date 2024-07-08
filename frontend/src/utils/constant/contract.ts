import { ethers } from "ethers";
import Abi from "./abi.json";
import multicallAbi from './multicallAbi.json'


export const getContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
    new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
        Abi,
        providerOrSigner
    );

    export const getMulticallContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
    new ethers.Contract(
         process.env.NEXT_PUBLIC_MULTICALL_ADDRESS || "",
         multicallAbi,
        providerOrSigner
    );
