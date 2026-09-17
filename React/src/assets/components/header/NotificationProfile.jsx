import React from 'react'
import { Calendar, Bell, CircleUser } from "lucide-react";


const NotificationProfile = () => {
  return (
    <div className=" flex w-[9%]  gap-6  items-center h-full">
        <button className='rounded-full text-[#ffffff] hover:bg-white hover:text-[#aa1e1e] p-2 cursor-pointer'><Calendar size={20} strokeWidth={2.7} /></button>
        <button className='rounded-full text-[#ffffff] hover:bg-white hover:text-[#aa1e1e] p-2 cursor-pointer'><Bell size={20} strokeWidth={2.7}/></button>

    </div>
  )
}

export default NotificationProfile