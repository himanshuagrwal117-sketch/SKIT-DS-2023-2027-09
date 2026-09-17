import React from 'react'
import {Users, SquarePlus, DoorOpen, ArrowDown01,ChevronDown,Coins,Trophy} from 'lucide-react'

const AchivementsList = () => {
  return (
    <div className='h-full w-full p-4 flex flex-wrap overflow-y-auto '>
       <div className='w-full h-[7vh] flex rounded-lg outline outline-[#a4a4a4] justify-between items-center p-4'>
          <div className='font-semibold text-[14px] text-[#983530] flex gap-3 justify-start items-center'>Name of the achievemnt
            <div className='text-[12px] text-[#000000] pl-3'>in event name </div>
            <div className=' ml-3 bg-amber-300 px-3 py-1 text-[12px] text-[#000000] rounded-2xl flex items-center justify-start gap-2'><Trophy size={15} className='text-[#000000]' />1st</div>
          </div>
          <div className=' flex gap-7 justify-end items-center'>
            <div className='font-medium text-[14px]'>College name</div>
            <div className='font-medium text-[14px]'>link</div>
            <div className='text-[12px]'>12th March,2024</div>
          </div>
        </div>
    </div>
  )
}

export default AchivementsList