import React, { useState, useEffect } from "react";
import "./Task.css";

import Task_components from "../Componenets/Task_components";
import Header_components from "../Componenets/Header_components";
import Rules_components from "../Componenets/Rules_components";
import Top_component from "../Componenets/Top_component";
import Wallet_components from "../Componenets/Wallet_components";
import { useLaunchParams } from "@telegram-apps/sdk-react";

function Homeboy() {
  const { initDataRaw, initData } = useLaunchParams(); // Only one call to useLaunchParams
  // console.log("~~~~~~~~", initDataRaw)
  return (
    <div className="p-4  text-white flex flex-col min-h-screen overflow-y-auto pb-20 bg-black">
      {/* Wallet connect Componenets */}
      <Top_component>
        <Wallet_components />
      </Top_component>

      <p className="text-base font-bold mb-2 mt-4">Progress</p>

      <Header_components
        header="Complete task before deadline and earn more $MOGG."
        minimum={"7420"}
        maximum="14,000"
        reward="Get Reward"
        width={`${(7420 / 14000) * 100}%`}
        onRewardClick={() => get_reward(14000)} // Pass totalRewards when the button is clicked
      />
      <p className="text-base font-bold mt-4">Task</p>

      <Task_components
        title="Connect Wallet"
        buttonText={"Check"}
        amount="+2500"
        bgColor={"bg-gray-500"}
      />

      <Task_components
        title="Held for 9 days"
        buttonText={"Check"}
        amount="+2500"
        bgColor={"bg-gray-500"}
      />

      <Task_components
        title="Have 3000 MOGG"
        buttonText={"Check"}
        amount="+3000"
        bgColor={"bg-gray-500"}
      />

      <Task_components
        title="Share a post on X"
        buttonText={"Pending"}
        amount="+6000"
        bgColor={"bg-gray-500"}
      />

      <div className=" mt-4">Rules</div>

      <Rules_components rule="You must be a holder of $MOGG for at least 9 days" />

      <Rules_components rule="Reward depends on the amount of MOGG and how long you have held it" />

    </div>
  );
}

export default Homeboy;
