import React from 'react'
import {Users, SquarePlus, DoorOpen, ArrowDown01,ChevronDown,Coins} from 'lucide-react'

const VolunteersInfoDashboard = () => {
  return (
    <div className='w-full h-full flex flex-col justify-start gap-10'>

      <div className='w-full flex justify-between '>

        <div className='flex justify-start gap-4'>
          <button className='bg-white outline text-[15px] flex gap-2 items-center outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#983530] transition-all hover:cursor-pointer duration-300s ease-in hover:text-[#ffffff]'><Users size={20} className='text-[#983530]' />All Volunteers<span className='text-[#000000] font-bold pl-2'>23</span> </button>
          <button className='bg-white outline text-[15px] flex gap-2 items-center outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#983530] transition-all hover:cursor-pointer duration-300s ease-in hover:text-[#ffffff]'><SquarePlus size={20} className='text-[#983530]' />Recently Joined<span className='text-[#19ad09] font-bold pl-2'>+14</span></button>
          <button className='bg-white outline text-[15px] flex gap-2 items-center outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#983530] transition-all hover:cursor-pointer duration-300s ease-in hover:text-[#ffffff]'><DoorOpen size={20} className='text-[#983530]' />Leaved<span className='text-[#ed2424] font-bold pl-2'>-3</span></button>
        </div>
        
        <div>
          <button className='bg-white outline text-[15px] flex gap-2 items-center outline-[#b3b3b3] py-2 px-4 rounded-md hover:bg-[#983530] transition-all hover:cursor-pointer duration-300s ease-in hover:text-[#ffffff]'><ArrowDown01 size={20} className='text-[#983530]' />Sort <span className='pl-2'><ChevronDown size={20} className='text-[#a2a0a0]' /></span></button>
        </div>

      </div>



      <div className='w-full h-full flex flex-wrap overflow-y-scroll p-1 justify-start gap-4'>


            <div className='w-full h-[7vh] flex rounded-lg outline outline-[#a4a4a4] justify-between items-center p-4'>
              <div className='font-semibold text-[14px] text-[#983530] flex gap-3 justify-start items-center'>Himanshu Agrawal
                <div className='text-[12px] text-[#000000] pl-3'>23ESKCX043</div>
                <div className=' ml-1 bg-cyan-400 px-3 py-1 text-[12px] text-[#000000] rounded-2xl'>Graphic Deisgner</div>
                <div className=' ml-1 bg-amber-300 px-3 py-1 text-[12px] text-[#000000] rounded-2xl flex items-center justify-start gap-2'><Coins size={15} className='text-[#000000]' />5</div>
              </div>
              
              <div className=' flex gap-6 justify-end items-center'>
                  <div className='font-medium text-[14px]'>Branch</div>
                  <div className='font-medium text-[14px]'>year</div>
                  <div className='text-[12px]'>12th March,2024</div>
              </div>
              
            </div>
        </div>

    </div>
  )
}

export default VolunteersInfoDashboard