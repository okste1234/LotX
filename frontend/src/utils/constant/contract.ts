import { ethers } from "ethers";
import Abi from "./abi.json";



export const getContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
    new ethers.Contract(
        process.env.NEXT_PUBLIC_rpc_url || "",
        Abi,
        providerOrSigner
    );
