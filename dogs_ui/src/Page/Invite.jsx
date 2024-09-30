import React from "react";
import boy from "../assets/sk.jpg";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

function Invite() {
  const refLink = `https://t.me/Dogs_Holders_Club_bot/dogs_holders?start`;
  const mess = `Hurry now and claim 15,000 $DOGS for all $DOGS holders ${refLink}`;

  const handleCopyLink = () => {
    if (refLink) {
      navigator.clipboard.writeText(mess);
      toast.success("Link copied", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    } else {
      toast.error("No referral link available");
    }
  };

  const shareonWhatsapp = () => {
    if (refLink) {
      const message = `Check out this awesome app! Here's my referral link: ${refLink}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    } else {
      toast.error("No referral link available");
    }
  };

  const shareOnTelegram = () => {
    if (refLink) {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
        mess
      )}`;
      window.open(telegramUrl, "_blank");
    } else {
      toast.error("No referral link available");
    }
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-center h-screen pb-20 bg-black text-white pl-4 pr-4 pt-6">
      <div className="font-bold text-3xl">Invite friends</div>
      <div className="font-bold text-3xl">and get more $DOGS</div>

      <div className="flex justify-center w-full mt-10">
        <img src={boy} width={150} height={150} />
      </div>

      <div className="text-base mt-12">Tap on the button to invite your</div>
      <div className="text-base">friends</div>

      {/* Share on Telegram */}
      <div
        className="bg-white text-black rounded-md w-full text-center py-2 mt-6 font-bold cursor-pointer"
        onClick={shareOnTelegram}
      >
        Share with friends on Telegram
      </div>

      {/* Copy Referral Link */}
      <div
        className="bg-white text-black rounded-md w-full text-center py-2 mt-2 font-bold cursor-pointer text-sm"
        onClick={handleCopyLink}
      >
        Copy link for friends
      </div>
    </div>
  );
}

export default Invite;
