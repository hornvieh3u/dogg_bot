import React from "react";

const Header_components = ({ header, minimum, maximum, reward, width }) => {
  return (
    <div className=" text-xs rounded-xl w-full bg-[#1c1c1e] p-3">
      <p style={{ width: "32ch" }} className="mb-2 font-light text-sm ">
        {header}
      </p>

      <div
        style={{ height: "4px" }}
        className="w-full bg-[#FBFCFD] rounded-lg  mt-3"
      >
        <div
          style={{ height: "4px", width }}
          className="w-full bg-[#ff5a50] rounded-lg"
        ></div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex ">
          <div className=" text-sm text-red-500 mr-1  opacity-85 font-light">
            {minimum}
          </div>
          <div className=" text-sm opacity-85 font-light">
            / {maximum} $MOGG
          </div>
        </div>
        <div className="text-xs font-bold pl-2 pr-2 pb-1.5 pt-1.5 bg-white text-black  rounded-2xl">
          {reward}
        </div>
      </div>
    </div>
  );
};

export default Header_components;
