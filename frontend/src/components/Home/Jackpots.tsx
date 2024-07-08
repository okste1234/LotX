"use client";
import useLotteryInfo from "@/hooks/useLotteryInfo";
import { Button, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import Link from "next/link";
import { FaCircleDollarToSlot } from "react-icons/fa6";

const Jackpots = () => {
  const { listing: lotteries, loading, error } = useLotteryInfo();
  
  if (loading) return <Text fontSize='20px' color='teal'>Loading...</Text>;
  // if (error) return <Text fontSize='2px' color='teal'>Error: {error.message}</Text>;

  return (
    <main className="w-full flex flex-col items-center md:my-24 my-20 lg:px-20 md:px-16 px-4">
      <h1 className="text-4xl text-gray-200 font-belanosima">Lottery Jackpots</h1>
      <p className="text-gray-400 font-barlow text-center md:w-[50%]">
        Browse through available jackpots for a chance to win big
      </p>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-12 mb-12">
        {lotteries.slice().reverse().map((pot:any, index) => (
         <Link href={`/pots/${lotteries.length - index}`}
            className="flex flex-col bg-gray-900 px-3 py-3 items-center gap-4 overflow-hidden relative cursor-pointer"
            id="pots"
            key={pot.id}
          >
            <div className="absolute -top-10 -left-7 w-[70px] h-[100px] bg-gray-300 rotate-45 flex justify-end items-center pr-4">
              <h1 className="-rotate-45 text-2xl text-gray-900 font-barlow">
                {index + 1}
              </h1>
            </div>
            <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-sky-600 to-emerald-400 flex justify-center items-center text-3xl">
              <FaCircleDollarToSlot />
            </div>
            <h3 className="text-xl text-gray-200 font-belanosima">
              LotX Arena - {pot.id}
            </h3>
            <p className="text-gray-400 font-barlow">Upto {ethers.formatEther(pot.balance)}Eth for grab</p>
            {pot.isActive ? (
                <Button>Play Now</Button>
            ) : (
                <Button colorScheme="teal" variant="outline" disabled cursor={"none"}>
                  Ended
                </Button>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Jackpots;
