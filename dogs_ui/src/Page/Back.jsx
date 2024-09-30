import React, { useState, useEffect } from "react";
import "./Task.css";
import { FaWallet } from "react-icons/fa6";
import { IoTimer } from "react-icons/io5";
import dogsboy from "../assets/dogsboy.svg";
import Task_components from "./Task_components";
import Header_components from "./Header_components";
import { useReferral } from "./ReferralContext";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import { toNano } from "@ton/ton";
import { beginCell, Address } from "@ton/ton";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const httpApiUrl = "https://toncenter.com/api/v2/jsonRPC";
const provider = new TonWeb.HttpProvider(httpApiUrl, { apiKey: "" });
const tonweb = new TonWeb(provider);


const myTransaction = {
  validUntil: Math.floor(Date.now() / 1000) + 360, // Valid for 6 minutes from now
  messages: [
      {
          address: "destinationAddressHere", // Replace with actual destination address
          amount: "20000000", // Amount in nanoton
          payload: Buffer.from("comment or data", "utf-8").toString("base64") // Replace with actual payload
      }
  ]
};

function Homeboy() {
  // const { initDataRaw, initData } = useLaunchParams(); // Only one call to useLaunchParams

  const initDataRaw = "user=%7B%22id%22%3A6310943109%2C%22first_name%22%3A%22Customer%22%2C%22last_name%22%3A%22Care%22%2C%22username%22%3A%22app_customer_support%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=1790007795136372431&chat_type=private&auth_date=1725614331&hash=f96f57b9d2875bcc16171f4d023a06326be1e670609ccd9bef0773a9e3d43cb1"
  const { userData, setUserData, loading, error } = useReferral();
  const [balance, setBalance] = useState(null);
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [timeRemaining, setTimeRemaining] = useState(null);
  let [isOpen, setIsOpen] = useState(true);
  const [totalRewards, setTotalRewards] = useState(0); // Track total rewards

  // Start timer
  const TimerStart = async () => {
    const token = `tma ${initDataRaw}`;

    fetch("http://localhost:3700/check_wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({}), // Pass an empty object as the body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTimeRemaining(data.message); // Move this inside the .then block
      })
      .catch((error) => console.error("Error:", error));
  };

  // check $DOGS BALNACE

  const dogs_checker = async () => {
    const jettonMasterAddress =
      "EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS";
    const ownerWalletAddress =
      "UQABYs_ompoLs-WzlE9QlzUiTvKzO8CHpL0tmcuBYBX3DtDE";
    const token = `tma ${initDataRaw}`;

    fetch(
      `http://localhost:3700/dogs_balance?jettonMasterAddress=${jettonMasterAddress}&ownerWalletAddress=${ownerWalletAddress}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        // body: JSON.stringify({}), // Pass an empty object as the body
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (walletAddress) {
      fetchTonBalance(walletAddress);
      dogs_checker();
    }
    TimerStart();
  }, [walletAddress]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup the interval when the component unmounts or the timer finishes
      return () => clearInterval(intervalId);
    } else if (timeRemaining === 0) {
      console.log("Timer finished!");
    }
  }, [timeRemaining]);

  const calculateTotalRewards = (data, walletAddress) => {
    let total = 0;
    
    if (data.twitter_task === 1) total += 1500;
    if (data.telegram_task === 1) total += 2000;
    if (data.whatsapp_task === 1) total += 2000;
    if (data.numer_of_refer > 2) total += 6000;
    if (walletAddress) total += 2500;  // Add 2500 if walletAddress is present
    
    return total;
  };
  


  useEffect(() => {
    if (userData) {
      const rewardTotal = calculateTotalRewards(userData, walletAddress); // Calculate total rewards from tasks
      setTotalRewards(rewardTotal);
    }
  }, [userData, walletAddress]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const fetchTonBalance = async (address) => {
    try {
      const balance = await tonweb.provider.getBalance(address);
      setBalance(balance / 1e9);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  if (!userData || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;



 

  

  // Rest of the code...

  const getTaskProgress = (task) => (task === 1 ? 100 : 0); // 100% if done

  const handleRewardClaim = (progress, reward) => {
    if (progress < 100) {
      console.log("Task not complete! Cannot claim reward yet.");
      return;
    } else {
      console.log("Reward claimed:", reward);
      setTotalRewards((prev) => prev + reward); // Update total rewards
    }
  };

  const handleTaskClick = (platform, taskProgress, rewardAmount) => {
    handleRewardClaim(taskProgress, rewardAmount);
    navigator.clipboard.writeText("Check out this awesome app!");

    let url;
    if (platform === "twitter") {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        "Check out this awesome app!"
      )}`;
    } else if (platform === "whatsapp") {
      url = `https://wa.me/?text=${encodeURIComponent("Check out this awesome app!")}`;
    } else if (platform === "telegram") {
      url = `https://t.me/share/url?url=${encodeURIComponent("Check out this awesome app!")}`;
    }

    window.open(url, "_blank");

    const token = `tma ${initDataRaw}`;
    setTimeout(() => {
      fetch(`http://localhost:3700/post_task?taskType=${platform}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }, 1000);
  };

  const handleConnectWallet = async () => {
    try {
      await tonConnectUI.connectWallet();
      alert("Wallet connected successfully!");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet.");
    }
  };

  const fetchBalance = async (address) => {
    try {
      const balance = await tonweb.provider.getBalance(address);
      setBalance(balance / 1e9); // Convert to TON (from nanoton)
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };


  const handleSendTransaction = async () => {
    const body = beginCell()
      .storeUint(0, 32)
      .storeStringTail("Hello Bitch")
      .endCell();

    const myTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360, // Valid for 6 minutes from now
      messages: [
        {
          address: "UQA7Ku_Diu-c9wwlg70Vbe-mwlKfzgiiFdZuu5eenLgeHdkq", // Replace with actual destination address
          amount: toNano("0.05").toString(), // Amount in nanoton
          payload: body.toBoc().toString('base64'), // Correct payload encoding
        },
      ],
    };

    try {
      await tonConnectUI.sendTransaction(myTransaction);
      alert('Transaction sent successfully!');
    } catch (error) {
      console.error('Failed to send transaction:', error);
      alert('Failed to send transaction.');
    }
  };

 
  const handleSendJetton = async () => {
    // Jetton transfer payload creation (TEP-74 standard)
    const body = beginCell()
      .storeUint(0xf8a7ea5, 32)  // Jetton transfer operation code
      .storeUint(0, 64)          // query_id: For idempotency (set to 0 if not used)
      .storeCoins(toNano("11.001"))  // amount: The amount of Jettons to transfer (converted to nano units, decimals = 9 for TON, may vary for other tokens like USDT)
      .storeAddress(Address.parse("EQA84GJk8ZBBuTp9H2UQ3xDH5lPLp4GMFukhBmIQ7b9z1XoK"))  // destination:MsgAddress (Jetton wallet of the recipient)
      .storeAddress(Address.parse("EQA84GJk8ZBBuTp9H2UQ3xDH5lPLp4GMFukhBmIQ7b9z1XoK"))     // response_destination:MsgAddress (Jetton wallet of the sender, for notifications)
      .storeUint(0, 1)           // custom_payload: Optional payload for the transfer (set to 0 for no payload)
      .storeCoins(toNano("0.01")) // forward_ton_amount: Forward TON amount to notify the recipient (optional, used for messaging)
      .storeUint(0, 1)           // forward_payload: Set to 0 if no custom payload is needed for forwarding
      .endCell();                // Finalize the Jetton transfer message body
  
    // Transaction details for TON Connect
    const myTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,  // Transaction is valid for 6 minutes (360 seconds)
      messages: [
        {
          address: "EQA7Ku_Diu-c9wwlg70Vbe-mwlKfzgiiFdZuu5eenLgeHYTv",  // Sender's Jetton wallet contract address
          amount: toNano("0.01").toString(),  // Fee in TON for the transaction (will be returned if not fully used)
          payload: body.toBoc().toString('base64'),  // Encode the Jetton transfer body into base64
        },
      ],
    };
  
    try {
      // Use TonConnectUI to send the transaction
      await tonConnectUI.sendTransaction(myTransaction);
      alert('Jetton transfer successful!');
    } catch (error) {
      console.error('Failed to send Jetton transaction:', error);
      alert('Failed to send Jetton transaction.');
    }
  };

  


  const get_reward = (totalRewards) =>{

    if(totalRewards >= 4000){
      console.log('Reward given')
      handleSendJetton()
     

      console.log(totalRewards)
    }

    console.log('Reward not given')
  }



  

  return (
    <div className="p-4  text-white flex flex-col min-h-screen overflow-y-auto pb-20 bg-black">
      <div className="w-full bg-white flex items-center justify-center flex-col p-4 rounded-md">
        {!walletAddress ? (
          <div
            className="flex bg-black pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer"
            onClick={handleConnectWallet}
          >
            <div className="mr-1">
              <FaWallet />
            </div>
            <div className="text-sm">Connect Wallet</div>
          </div>
        ) : (
          <div>
            {/* Your component JSX here */}
            <div className=" text-black text-sm">
              {timeRemaining !== null ? (
                <p>
                  Time Left to finish task:{" "}
                  {timeRemaining > 0
                    ? `${formatTime(timeRemaining)}`
                    : "Time’s up!"}
                </p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-4">
          <img src={dogsboy} width={130} height={130} />
        </div>

        <div className="text-black font-bold mt-2 text-base">
          Connect Wallet to start the process
        </div>
      </div>

      <p className="text-base font-bold mb-2 mt-4">#FMEMEFI CAMPAIGN</p>

      <Header_components
        header="Complete task before deadline and earn more $DOGS."
        minimum={totalRewards}
        maximum="14,000"
        reward="Get Reward"
        width={`${(totalRewards / 14000) * 100}%`}
        onRewardClick={() => get_reward(totalRewards)}  // Pass totalRewards when the button is clicked
      />
      <p className="text-base font-bold mt-4">Task</p>

      <Task_components
        title="Connect Wallet"
        buttonText={walletAddress ? "Done" : "Check"}
        amount="+2500"
        bgColor={userData.twitter_task === 1 ? "bg-white" : "bg-gray-500"}
        walletAddress={walletAddress}
      />

      <Task_components
        title="Twitter Task"
        buttonText={userData.twitter_task === 1 ? "Done" : "Check"}
        amount="+1500"
        bgColor={userData.twitter_task === 1 ? "bg-white" : "bg-gray-500"}
        handleClick={() => handleTaskClick("twitter", getTaskProgress(userData.twitter_task), 1500)}
        walletAddress={walletAddress}
      />

      <Task_components
        title="Telegram Task"
        buttonText={userData.telegram_task === 1 ? "Done" : "Check"}
        amount="+2000"
        bgColor={userData.telegram_task === 1 ? "bg-white" : "bg-gray-500"}
        handleClick={() => handleTaskClick("telegram", getTaskProgress(userData.telegram_task), 2000)}
        walletAddress={walletAddress}
      />

      <Task_components
        title="Whatsapp Task"
        buttonText={userData.whatsapp_task === 1 ? "Done" : "Check"}
        amount="+2000"
        bgColor={userData.whatsapp_task === 1 ? "bg-white" : "bg-gray-500"}
        handleClick={() => handleTaskClick("whatsapp", getTaskProgress(userData.whatsapp_task), 2000)}
        walletAddress={walletAddress}
      />

      <Task_components
        title="Refer 2 $DOGS holders"
        buttonText={userData.numer_of_refer > 2 ? "Done" : "Pending"}
        amount="+6000"
        bgColor={userData.numer_of_refer > 2 ? "bg-white" : "bg-gray-500"}
        walletAddress={walletAddress}
      />
    

      <div className=" mt-4">Rules</div>

      <div className=" flex items-center justify-start mt-2">
        <IoTimer className="mr-2" />

        <p style={{ width: "50ch" }} className=" text-xs opacity-70">
          You must have at least $DOGS to qualify for the airdrop. The reward is
          esxlusively for $DOGS holders
        </p>
      </div>

      <div className=" flex items-center justify-start mt-2">
        <IoTimer className="mr-2" />

        <p style={{ width: "50ch" }} className=" text-xs opacity-70">
          Finish the Task before the timer runs out
        </p>
      </div>


     
    </div>
  );
}

export default Homeboy;
