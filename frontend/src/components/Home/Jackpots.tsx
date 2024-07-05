"use client"
import { Button } from "@chakra-ui/react"
import { useState } from "react"
import { CiEdit } from "react-icons/ci"
import { LuSettings2 } from "react-icons/lu"
import { RxUpdate } from "react-icons/rx"
import { SlPower, SlSettings, SlUserFollowing } from "react-icons/sl"


const Jackpots = () => {
    const [status, setstatus] = useState(false)
    const steps: { caption: string, text: string, icon: JSX.Element }[] = [
        {
            caption: "D and D Arena",
            text: "Upto 600 ETH for grab",
            icon: <SlUserFollowing />,
        }, {
            caption: "BetWays",
            text: "Upto 80eth for grab",
            icon: <SlSettings />,
        }, {
            caption: "Customize Your Stream",
            text: "Upto 80eth for grab.",
            icon: <CiEdit />,
        }, {
            caption: "Activate Your Stream",
            text: "Once you've configured y",
            icon: <SlPower />,
        }, {
            caption: "Manage Your Stream",
            text: "Monitor and manage y",
            icon: <LuSettings2 />,
        }, {
            caption: "Enjoy Seamless Automation",
            text: "With TRiver, you can enjoy",
            icon: <RxUpdate />,
        }
    ]
    return (
        <main className='w-full flex flex-col items-center md:my-24 my-20 lg:px-20 md:px-16 px-4'>
            <h1 className="text-4xl text-gray-200 font-belanosima">Lottery Jackpots</h1>
            <p className="text-gray-400 font-barlow text-center md:w-[50%]">Browse through available jackpots for a chance to win big</p>
            <div className="w-full  grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-12 mb-12">
                {
                    steps.map(({ caption, text, icon }, index) => (
                        <div className={`flex flex-col bg-gray-900 px-3 py-2 items-center gap-4 overflow-hidden relative cursor-pointer`} key={index}>
                            <div className="  absolute -top-10 -left-7 w-[70px] h-[100px] bg-gray-300 rotate-45 flex justify-end items-center pr-4">
                                <h1 className="-rotate-45 text-2xl text-gray-900 font-barlow">{index + 1}</h1>
                            </div>
                            <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-sky-600 to-emerald-400 flex justify-center items-center text-3xl ">
                                {icon}
                            </div>
                            <h3 className="text-xl text-gray-200 font-belanosima">{caption}</h3>
                            <p className="text-gray-400 font-barlow">{text}</p>
                            {!status? 
                                <Button>
                                    Play Now
                                </Button>
                                :
                                <Button colorScheme='teal' variant='outline' disabled cursor={"none"}>
                                    Ended
                                </Button>}
                        </div>
                    ))
                }
            </div>
        </main >
    )
}

export default Jackpots