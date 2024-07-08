"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  TableCaption,
  Flex,
} from '@chakra-ui/react';
import { BsCoin } from 'react-icons/bs';
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';
import { GiLaurelsTrophy } from 'react-icons/gi';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import usePlayLottery from '@/hooks/usePlayLottery';
import { ethers } from 'ethers';
import useDrawWinners from '@/hooks/useDrawWinners';
import useAnnounce from '@/hooks/useAnnounce';

type Lottery = {
  id: number;
  manager: string;
  players: string[];
  winners: { winner: string, amount: number }[];
  endTime: number;
  balance: number;
  isActive: boolean;
};

export default function Pot({ lottery }: { lottery: Lottery }) {
  const { address } = useWeb3ModalAccount();
  const play = usePlayLottery(lottery.id);
  const [drawWinners, stat] = useDrawWinners(lottery.id);
  const announce = useAnnounce(lottery.id);
  const [showAnnounceButton, setShowAnnounceButton] = useState(false);
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    if (stat) {
      const timer = setTimeout(() => {
        setShowAnnounceButton(true);
        setStatus(false);
      }, 50000); // 50 seconds
      return () => clearTimeout(timer);
    }
  }, [stat]);

  console.log(lottery);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20 text-gray-200">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Win Big with Our Lottery!</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Participate in rounds with 0.000015 ETH for a chance to win the grand prize.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Purchase Ticket</h2>
            <div className="border-gray-800 bg-gray-800 border-[4px] rounded-[2.5rem] mb-2 w-fit">
              <div className="rounded-[2rem] border-2 border-gray-950">
                <Countdown date={(lottery.endTime * 1000)} className='p-4' />
              </div>
            </div>
            <Button onClick={play} type="submit" className="w-full" rightIcon={<BsCoin className='text-orange-600 text-2xl font-bold' />}>
              Purchase Tickets
            </Button>
            {lottery.manager === address && (
              <div className='flex justify-between items-center gap-4'>
                <Button
                  type="submit"
                  onClick={drawWinners}
                  className="w-full"
                  marginTop={"16px"}
                  isLoading={stat && status}
                  loadingText='Drawing'
                >
                  Make Draw
                </Button>
                {showAnnounceButton && (
                  <Button
                    type="submit"
                    onClick={announce}
                    className="w-full"
                    marginTop={"16px"}
                    rightIcon={<GiLaurelsTrophy className='text-emerald-300 text-2xl font-bold' />}
                  >
                    Announce Winner(s)
                  </Button>
                )}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Current Participants</h2>
            <div className="border rounded-lg overflow-hidden">
              {lottery.players.length === 0 ? (
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Ticket #</Th>
                        <Th>Address</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>000</Td>
                        <Td>0x00..000</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Ticket #</Th>
                        <Th>Address</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {lottery.players.map((player, index) => (
                        <Tr key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{player?.slice(0, 6)}...{player?.slice(-4)}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </div>
            <div className="mt-4 text-right">
              <p className="text-lg font-medium">
                Total Prize: <span className="bg-gradient-to-l from-sky-400 to-emerald-400 text-transparent bg-clip-text">
                  {ethers.formatEther(lottery.balance)} ETH!
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="border rounded-lg mt-32">
          <Flex align="center" justify="center" fontSize="2xl" fontWeight="bold">
            Lottery Winners
            <GiLaurelsTrophy className='text-emerald-300 ml-2' />
          </Flex>
          <TableContainer>
            <Table>
              <TableCaption>
                <Flex align="center" justify="center" fontSize="2xl" fontWeight="bold">
                  Lottery Winners
                  <GiLaurelsTrophy className='text-emerald-300 ml-2' />
                </Flex>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Winners</Th>
                  <Th>Address</Th>
                  <Th>Prizes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {lottery.winners.length === 0 ? (
                  <Tr>
                    <Td>000</Td>
                    <Td>0x00..000</Td>
                    <Td className="bg-gradient-to-l from-sky-400 to-emerald-400 text-transparent bg-clip-text">0 ETH</Td>
                  </Tr>
                ) : (
                  lottery.winners.map((winner, index) => (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{winner.winner?.slice(0, 6)}...{winner.winner?.slice(-4)}</Td>
                      <Td className="bg-gradient-to-l from-sky-400 to-emerald-400 text-transparent bg-clip-text">{ethers.formatEther(winner.amount)} ETH</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
