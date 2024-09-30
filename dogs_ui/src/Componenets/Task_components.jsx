import React from "react";
import { FaLock } from "react-icons/fa"; // Import the lock icon

const Task_components = ({ title, buttonText, amount, bgColor, walletAddress }) => {
  return (
    <div className="flex flex-col text-sm bg-[#1c1c1e] rounded-xl pt-3 pb-3 pr-3 pl-3 mt-2">
      <div className="flex w-full justify-between">
        <div>{title}</div>
        <div
          className={`text-xs font-bold text-black pr-2 pl-2 pb-1 pt-1 rounded-2xl ${bgColor} ${!walletAddress ? 'opacity-50 cursor-not-allowed' : ''}`}
          
        >
          {walletAddress ? buttonText : <FaLock />} {/* Show lock icon if wallet not connected */}
        </div>
      </div>
      <div className="text-sm opacity-55 font-light"> {amount}</div>
    </div>
  );
};

export default Task_components;
