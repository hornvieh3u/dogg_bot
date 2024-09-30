import React from "react";
import { FaLock } from "react-icons/fa"; // Import the lock icon

function Stats() {
  return (
    <div className="p-4 min-h-screen flex justify-center items-center bg-black  ">
      <div className=" flex flex-col items-center p-8 border border-white  rounded-xl w-full">
        <p className="text-sm opacity-70 mb-2">Total $MOGG Users</p>
        <div className=" flex items-center">
          <FaLock />

          <p className="ml-2 text-xl">19,000</p>
        </div>

        <div className="flex flex-col mt-6  items-center">
          <p className=" text-sm opacity-70 mb-2">Average reward per users</p>
          <p className=" text-xl">14,000</p>
        </div>

        <div className="flex flex-col  items-center mt-6">
          <p className="text-sm opacity-70 mb-2">Reward pool</p>
          <p className=" text-xl">54,903,032</p>
        </div>

        <div className="flex flex-col mt-6  items-center">
          <p className="text-sm opacity-70 mb-2">Active users</p>
          <p className=" text-xl">7 684</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
