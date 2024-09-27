import React from 'react'
import { FaWallet } from "react-icons/fa6";
import dogsboy from "../assets/sk.jpg";

const Top_component = ({onClick}) => {
  return (
    <div className="w-full shadow shadow-white bg-[#1c1c1e]  flex items-center justify-center flex-col p-4 rounded-xl">
        <div className="flex bg-black pl-3 pr-3 pt-1 pb-1 rounded-md cursor-pointer">
          <div className="mr-1">
            <FaWallet color="white" />
          </div>
          <div className="text-sm text-white">Connect Wallet</div>
        </div>

        <div className="mt-4">
          <img src={dogsboy} width={130} height={130} />
        </div>

        <div className="text-white font-bold mt-3 text-sm">
          Connect Wallet to start task
        </div>
      </div>
  )
}

export default Top_component
