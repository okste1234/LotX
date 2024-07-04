"use client"
import { useEffect, useState, useCallback } from "react";
import { SiStreamrunners } from "react-icons/si";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { LuLogIn } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import { Link as Spy } from 'react-scroll';
import { useWalletInfo, useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { NavLinks } from "../cms/NavLinks";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { WalletConnected } from "@/utils/WalletConnected";
import MaxWrapper from "./MaxWrapper";
 
const NavBar = () => {
    const { open } = useWeb3Modal()
    const { address, isConnected } = useWeb3ModalAccount()
    const { walletInfo } = useWalletInfo()

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const handleToggle = () => {
        setOpenMenu(!openMenu);
    }

    useEffect(() => {
        const toggleScroll = () => {
            document.body.style.overflow = openMenu ? 'hidden' : 'auto';
        };
        toggleScroll();

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [openMenu]);


    const router = useRouter();

    const change = useCallback(async () => {
        if (isConnected) {
            router.push("/signup");
        }
    }, [isConnected, router]);

    useEffect(() => {
        change();
    }, [change, isConnected]);

    return (
       <header className="w-full bg-gray-950 flex justify-between items-center py-6 md:px-8 px-3 overflow-hidden">
            <Link href='/' className="flex items-center bg-gradient-to-r from-sky-400 to-emerald-400 text-transparent bg-clip-text gap-1">
                <TicketIcon className="md:text-4xl text-3xl text-sky-500" />
                <span className=" font-belanosima md:text-3xl text-xl">LotX</span>
            </Link>

            <ul className="lg:flex hidden items-center gap-10">
                {
                    NavLinks.map(({ name, path }, index) => (
                        <li className="block list-none group" key={index}>
                            <Spy to={path} smooth={true} spy={true} activeClass="before:w-2 before:h-2" duration={500} className={`text-base relative font-barlow text-gray-200 before:absolute before:bottom-1 before:-left-2.5 before:bg-gradient-to-tr before:from-sky-400 before:to-emerald-400 before:rounded-full before:transition-all before:duration-300 hover:before:w-2 hover:before:h-2`} >{name}</Spy>
                        </li>
                    ))
                }
            </ul>

            <aside className="flex items-center lg:gap-6 gap-2">
                <select className="border-none hidden md:inline-block text-sm outline-none bg-transparent text-gray-200 font-barlow">
                    <option value="EN" selected>EN</option>
                    <option value="ITA">ITA</option>
                    <option value="FRA">FRA</option>
                </select>

                <button onClick={() => open()} className="text-gray-200 text-sm font-barlow px-4 py-2 flex justify-center items-center gap-1 bg-sky-600 hover:bg-emerald-500 font-grotesk">
                    {
                        isConnected ? <WalletConnected address={address} icon={walletInfo?.icon} /> : <>
                            <span>Connect Wallet</span>
                            <LuLogIn className="text-lg hidden md:flex" />
                        </>
                    }
                </button>

                <button onClick={handleToggle} className="lg:hidden flex text-2xl border border-sky-400 px-2 text-sky-400 hover:text-emerald-400 hover:border-emerald-400" type="button">
                    <HiOutlineMenuAlt3 />
                </button>
            </aside>

            {/* Mobile */}
            <div className={`fixed top-0 z-[999] w-full h-screen bg-gray-950/70 transition-all duration-[500ms] ease-[cubic-bezier(0.86,0,0.07,1)] lg:hidden flex justify-end ${openMenu ? "left-0" : "left-[100%]"}`}>
                <div className={`w-[80%] h-full bg-gray-950 border-l-2 border-emerald-400/80 flex flex-col gap-10 transition-all duration-[500ms] ease-[cubic-bezier(0.86,0,0.07,1)] px-6 py-8 delay-300 ${openMenu ? "translate-x-0" : "translate-x-full"}`}>
                    <header className="flex justify-between items-center w-full">
                        <Link href='/' className="flex items-center bg-gradient-to-r from-sky-400 to-emerald-400 text-transparent bg-clip-text gap-1">
                            <TicketIcon className="md:text-4xl text-3xl text-sky-400" />
                            <span className=" font-belanosima md:text-xl text-lg">LotX</span>
                        </Link>
                        <div className="flex gap-4 items-center">
                            <select className="border-none text-sm outline-none bg-transparent text-gray-200 font-barlow">
                                <option value="EN" selected>EN</option>
                                <option value="ITA">ITA</option>
                                <option value="FRA">FRA</option>
                            </select>
                            <button type="button" onClick={handleToggle} className="lg:hidden flex text-2xl border border-sky-400 px-2 text-sky-400 hover:text-emerald-400 hover:border-emerald-400">
                                <IoCloseOutline />
                            </button>
                        </div>
                    </header>


                    <ul className="flex flex-col lg:hidden mt-6 items-start gap-6">
                        {
                            NavLinks.map(({ name, path }, index) => (
                                <li className="block relative list-none group" key={index}>
                                    <Spy to={path} smooth={true} spy={true} activeClass="before:w-2 before:h-2" duration={500} onClick={handleToggle} className={`text-base relative font-barlow text-gray-200 before:absolute before:bottom-1 before:-left-2.5 before:bg-gradient-to-tr before:from-sky-400 before:to-emerald-400 before:rounded-full before:transition-all before:duration-300 hover:before:w-2 hover:before:h-2`}>{name}</Spy>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default NavBar



function TicketIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}