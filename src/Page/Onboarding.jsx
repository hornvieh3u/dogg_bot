import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa"; // Import the lock icon
import boy from "../assets/sk.jpg";
import { TbSquareRoundedNumber1Filled } from "react-icons/tb";
import { TbSquareRoundedNumber2Filled } from "react-icons/tb";
import { TbSquareRoundedNumber3Filled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <div className="p-4 min-h-screen flex justify-center items-center bg-black ">
      <div className=" flex flex-col items-center">
        <div className="flex">
          <img src={boy} width={24} height={24} />

          <p className=" text-xl font-bold">MOGG-FARMER</p>
        </div>

        <p className=" text-sm mt-4">
          Mogg-farmer is your ultimate mogg reward machine that rewards you with
          $MOGG for being a holder
        </p>

        <div className="flex justify-start items-center mt-4 w-full">
          <div className="mr-4 p-3 flex items-center rounded-full bg-[#424241]">
            <TbSquareRoundedNumber1Filled />
          </div>
          <div>
            <div className="flex justify-start">
              <p className="text-base font-bold">Connect Wallet</p>
            </div>
            <p className="text-sm">
              Connect your wallet to confirm you are a $MOGG holder
            </p>
          </div>
        </div>

        <div className="flex justify-start items-center mt-8 w-full">
          <div className="mr-4 p-3 flex items-center rounded-full bg-[#424241]">
            <TbSquareRoundedNumber2Filled />
          </div>
          <div>
            <div className="flex justify-start">
              <p className="text-base font-bold">Perform Task</p>
            </div>
            <p className="text-sm">
              Complete simple task in minutes to be eligible
            </p>
          </div>
        </div>

        <div className="flex justify-start items-center mt-8 w-full">
          <div className="mr-4 p-3 flex items-center rounded-full bg-[#424241]">
            <TbSquareRoundedNumber3Filled />
          </div>
          <div>
            <div className="flex justify-start">
              <p className="text-base font-bold">Claim Airdrop</p>
            </div>
            <p className="text-sm">
              Recieve $MOGG to your wallet after Completing task
            </p>
          </div>
        </div>

        <div
          className="mt-8 w-full font-bold flex items-center justify-center rounded-md bg-white p-3"
          onClick={handleNavigation}
        >
          <p className="text-black opacity-80">Start Process</p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
