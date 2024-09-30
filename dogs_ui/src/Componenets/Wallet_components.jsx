import React, { useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { toast } from "react-toastify"
import { FaWallet } from "react-icons/fa6";

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const Wallet = () => {
    
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const getTimeStr = time => {
        const totalSeconds = parseInt(Date.now() / 1000 - time);
        const hour = parseInt(totalSeconds / 3600);
        const min = parseInt((totalSeconds % 3600) / 60);
        const sec = totalSeconds - hour * 3600 - min * 60;

        let timeStr = "";
        if (hour !== 0) timeStr += hour + "h ";
        if (min !== 0)  timeStr += min + "m ";
        if (sec !== 0)  timeStr += sec + "s";

        return timeStr;
    }

    const getTokenDuration = async address => {
        const response = await fetch(`http://localhost:3900/solana?address=${address}`);
        // const response = await fetch(`http://localhost:3900/solana?address=YubozzSnKomEnH3pkmYsdatUUwUTcm7s4mHJVmefEWj`);  // for test
        const data = await response.json();

        if (!data.result) {
            toast.error(data.message);
            return;
        }

        toast.success(`Holding tokens for ${getTimeStr(data.message)}.`);
    }

    useEffect(() => {
        if (!connection || !publicKey) {
            console.log("Wallet not connected or connection unavailable");
            return;
        }

        getTokenDuration(publicKey.toString());

    }, [connection, publicKey])
 
    return (
        <WalletModalProvider>
            <WalletMultiButton className="bg-black" endIcon={<FaWallet />} />
        </WalletModalProvider>
    );
};

export default Wallet;