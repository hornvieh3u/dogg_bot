import React from 'react'
import { GoDotFill } from "react-icons/go";

const Rules_components = ({rule}) => {
  return (
    <div className=" flex items-center justify-start mt-2">
    <GoDotFill className="mr-1" size={12} />

    <p style={{ width: "50ch" }} className=" text-xs opacity-70"> {rule}
    </p>
  </div>
  )
}

export default Rules_components
