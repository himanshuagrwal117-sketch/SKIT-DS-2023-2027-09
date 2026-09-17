import React from 'react'
import { Calendar, Bell, CircleUser, CirclePoundSterling} from "lucide-react";

const RightButtons = () => {
  return (
    <div className=" flex w-[41%] justify-end gap-3  items-center  pr-4 h-full">
       <button className="bg-amber-300 w-[35%] pl-7 pr-7 pt-2 pb-2 flex justify-center items-center gap-1 rounded-2xl font-semibold">
        <CirclePoundSterling size={20} />
        <span className='text-[15px] ml-3'>23 Points</span>
      </button>
        <button className='rounded-full text-[#ffffff] hover:bg-white hover:text-[#aa1e1e] p-2 cursor-pointer hover:cursor-pointer ease-linear duration-200 transition-all'><Calendar size={20} strokeWidth={2.7} /></button>
        <button className='rounded-full text-[#ffffff] hover:bg-white hover:text-[#aa1e1e] p-2 cursor-pointer hover:cursor-pointer ease-linear duration-200 transition-all'><Bell size={20} strokeWidth={2.7}/></button>
        <div className='rounded-full text-[#ffffff] hover:bg-white hover:text-[#aa1e1e] p-2 cursor-pointer hover:cursor-pointer ease-linear duration-200 transition-all'><CircleUser size={40} strokeWidth={1.5} /></div>
    </div>
  )
}            

export default RightButtons