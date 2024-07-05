import React from 'react'
import { GiLaurelsTrophy } from 'react-icons/gi'

const HowToPlay = () => {
    return (
        <main className='w-full flex flex-col items-start mt-24'>
            <div className="w-full grid md:grid-cols-2 gap-20 lg:px-28 px-4 mb-24">
                <div className="w-full relative before:bg-gradient-to-t before:absolute before:w-full before:h-full before:from-gray-950 before:to-gray-950/50 flex justify-between items-center">
                    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem]">
                        <div className="rounded-[2rem] overflow-hidden bg-white border-2 border-gray-950">
                            <img src={"/salary.png"} className="" alt="Lottery" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-1.5">
                    <h1 className="text-3xl text-gray-200 font-belanosima">How To Play</h1>
                    <p className="text-gray-400 font-barlow">LotX makes participating in the lottery simple and straightforward. Follow these steps to join and try your luck!</p>
                    
                    <h3 className="text-xl text-gray-200 font-belanosima mt-4">Step 1: Connect Your Wallet</h3>
                    <p className="text-gray-400 font-barlow">Click on the "Connect Wallet" button on the homepage and connect your Ethereum wallet. Ensure you have sufficient ETH to cover the entry fee.</p>
                    
                    <h3 className="text-xl text-gray-200 font-belanosima mt-4">Step 2: Enter the Lottery</h3>
                    <p className="text-gray-400 font-barlow">Once your wallet is connected, click on the "Enter Lottery" button. A transaction prompt will appear, asking you to confirm the payment of 0.000015 ETH as the entry fee.</p>
                    
                    <h3 className="text-xl text-gray-200 font-belanosima mt-4">Step 3: Wait for the Draw</h3>
                    <p className="text-gray-400 font-barlow">After successfully entering the lottery, your address will appear in the participants' list. The draw will take place at a scheduled time or when a certain number of participants have joined.</p>
                    
                    <h3 className="text-xl text-gray-200 font-belanosima mt-4">Step 4: Check the Results</h3>
                    <p className="text-gray-400 font-barlow">Once the draw is complete, the winners will be displayed on the same page along with their respective prizes. If you win, your prize will be automatically sent to your wallet.</p>
                    
                    <h3 className="text-xl text-gray-200 font-belanosima mt-4 flex items-center">Good Luck!<span className='text-emerald-300'><GiLaurelsTrophy/></span></h3>
                    <p className="text-gray-400 font-barlow">Enjoy the excitement of playing LotX and may luck be on your side!</p>
                </div>
            </div>
        </main>
    )
}

export default HowToPlay
