import React from 'react'
import dogsboy from "../assets/sk.jpg";

const Top_component = ({children}) => {
  return (
    <div className="w-full shadow shadow-white bg-[#1c1c1e]  flex items-center justify-center flex-col p-4 rounded-xl">
        <div className="flex">
          {children}
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
