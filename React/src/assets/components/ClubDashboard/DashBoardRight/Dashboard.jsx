import React from 'react'
import {CalendarHeart,Plus, CalendarClock, Radio, ClipboardClock,Award, User, CirclePlus,DoorOpen,MoveUp,Instagram, Linkedin, Mail,Globe   } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className='h-full w-full flex flex-col '>

      <div className='font-medium h-[18vh] rounded-xl bg-linear-to-tr from-[#841818] to-[#c80909] w-full'>
        <div className='bg-[url("./images/bg14.png")] bg-cover bg-center  h-full rounded-xl overflow-hidden px-5 w-full text-[25px] text-[#ffffff] flex gap-4 justify-between items-center'>
           <div className='h-full flex items-center'><span className='text-[#ffffff] font-semibold'>Hello,&nbsp;</span> CodeFiesta Club SKIT</div>
           <div className='h-full w-[8%] overflow-hidden'><img src='./images/kki.svg' className='w-full h-full object-cover'/></div>
           <div><button className='bg-[#1a4099] outline text-[15px] outline-[#ffffff] py-2 px-4 rounded-md hover:bg-[#ffffff] transition-all hover:outline-[#1a4099] hover:cursor-pointer duration-300s ease-in hover:text-[#1a4099] flex justify-start items-center gap-2'><Plus size={17} strokeWidth={3}/>Start a New Event</button></div>
        </div>
      </div>

      <div className='flex w-full h-[14vh] mt-7 gap-5'>
        <div className='h-full w-[17%] bg-linear-to-tr from-[#102f65] to-[#094da2] outline outline-[#b7b7b7] p-3 flex flex-col justify-start rounded-lg items-start'>
          <div className='text-[15px] font-medium flex justify-start items-center gap-2 text-[#ffffff] '><span className='bg-[#ffffff] rounded-full p-1'><CalendarHeart size={15} strokeWidth={2.5} className='text-[#0647aa]'/></span>Totals Events</div>
          <div className='text-[42px] mt-1 font-medium text-[#ffffff]'>21</div>
        </div>
        <div className='h-full w-[16%] outline outline-[#b7b7b7] p-3 flex flex-col justify-start rounded-lg items-start'>
          <div className='text-[15px] font-medium flex justify-start items-center gap-2 '><span className='bg-[#079c4d] rounded-full p-1'><CalendarClock size={15} strokeWidth={2.5} className='text-[#ffffff]' /></span>Upcoming</div>
          <div className='text-[42px] mt-1 font-medium text-[#383838]'>3</div>
        </div>
        <div className='h-full w-[18%] outline outline-[#b7b7b7] p-3 flex flex-col justify-start rounded-lg items-start'>
          <div className='text-[15px] font-medium flex justify-start items-center gap-2 '><span className='bg-[#e57803] rounded-full p-1'><Radio size={15} strokeWidth={2.5} className='text-[#ffffff]' /></span>Today's Events</div>
          <div className='text-[42px] mt-1 font-medium text-[#383838]'>1</div>
        </div>
        <div className='h-full w-[25%] outline outline-[#b7b7b7] p-3 flex flex-col justify-start rounded-lg items-start'>
          <div className='text-[15px] font-medium flex justify-start items-center gap-2 '><span className='bg-[#03c7e5] rounded-full p-1'><ClipboardClock size={15} strokeWidth={2.5} className='text-[#ffffff]' /></span>Pending Events Request</div>
          <div className='text-[42px] mt-1 font-medium text-[#383838]'>0</div>
        </div>
         <div className='h-full w-[18%] outline outline-[#b7b7b7] p-3 flex justify-center gap-3 rounded-lg items-center'>
          <span className='bg-[#ff9d00] rounded-full p-2'><Award size={34} strokeWidth={2.1} className='text-[#FFFFFF]' /></span>
          <div className='text-[42px] font-medium text-[#383838]'>+2</div>
        </div>

      </div>


      <div className='flex w-full h-[35vh] mt-5 gap-5'>

        <div className='h-full w-[42%] bg-linear-to-tr from-[#841818] to-[#c80909] outline outline-[#b7b7b7] p-5 flex flex-col justify-start rounded-lg items-start'>
          <div className='text-[15px] font-medium flex justify-start items-center gap-2 text-[#ffffff] '><span className='bg-[#ffffff] rounded-full p-1'><User size={15} strokeWidth={2.6} className='text-[#c80909]'/></span>Totals Members</div>
          <div className='text-[42px] mt-1 font-medium text-[#ffffff] flex gap-1 items-center'>24<MoveUp size={27} className='text-[#ffffff]'/></div>
          <div className='flex gap-5 w-full h-full items-center justify-center mt-2'>
            <div className='h-full outline w-full bg-white outline-[#b7b7b7] p-3 flex flex-col justify-start rounded-lg items-start'>
              <div className='text-[15px] font-medium flex justify-start items-center gap-2 '><span className='bg-[#079c4d] rounded-full p-1'><CirclePlus size={15} strokeWidth={2.5} className='text-[#ffffff]' /></span>New Members </div>
              <div className='text-[42px] mt-5 font-medium text-[#079c4d]'>+3</div>
            </div>
            <div className='h-full outline w-full bg-white outline-[#b7b7b7] p-3 flex flex-col justify-start rounded-lg items-start'>
              <div className='text-[15px] font-medium flex justify-start items-center gap-2 '><span className='bg-[#c80909] rounded-full p-1'><DoorOpen size={15} strokeWidth={2.5} className='text-[#ffffff]' /></span>Members Left</div>
              <div className='text-[42px] mt-5 font-medium text-[#c80909]'>-1</div>
            </div>
          </div>

        </div>


        <div className='h-full w-[45%] bg-linear-to-tr from-[#102f65] to-[#094da2] outline outline-[#b7b7b7] p-5 flex flex-col justify-start rounded-lg items-start'>
          <div className='text-[15px] font-medium flex justify-start items-center gap-2 text-[#ffffff] '><span className='bg-[#ffffff] rounded-full p-1'><User size={15} strokeWidth={2.6} className='text-[#c80909]'/></span>Totals Volunteers</div>
          <div className='text-[42px] mt-1 font-medium text-[#ffffff] flex gap-1 items-center'>24<MoveUp size={27} className='text-[#ffffff]'/></div>
          <div className='flex gap-5 w-full h-full items-center justify-center mt-2'>
            <div className='h-full outline w-full bg-white outline-[#b7b7b7] p-3 flex flex-col justify-start rounded-lg items-start'>
              <div className='text-[15px] font-medium flex justify-start items-center gap-2 '><span className='bg-[#079c4d] rounded-full p-1'><CirclePlus size={15} strokeWidth={2.5} className='text-[#ffffff]' /></span>New Volunteers</div>
              <div className='text-[42px] mt-5 font-medium text-[#079c4d]'>+3</div>
            </div>
            <div className='h-full outline w-full bg-white outline-[#b7b7b7] p-3 flex flex-col justify-start rounded-lg items-start'>
              <div className='text-[15px] font-medium flex justify-start items-center gap-2 '><span className='bg-[#c80909] rounded-full p-1'><DoorOpen size={15} strokeWidth={2.5} className='text-[#ffffff]' /></span>Volunteers Left</div>
              <div className='text-[42px] mt-5 font-medium text-[#c80909]'>-1</div>
            </div>
          </div>

        </div>

        <div className='w-[9%] rounded-lg h-full bg-white py-3 outline outline-[#b7b7b7] flex flex-col items-center justify-between'>
          <div className='h-[5vh] w-[50%] bg-linear-to-tr from-[#a219b4] to-[#ff41d0] rounded-full p-2 hover:rotate-z-360 transition-all ease-in duration-400 hover:scale-[1.16] hover:cursor-pointer '><Instagram strokeWidth={2} className="h-full w-full object-cover text-[#ffffff]"/></div>
          <div className='h-[5vh] w-[50%] bg-linear-to-tr from-[#115783] to-[#257cff] rounded-full p-2 hover:rotate-z-360 transition-all ease-in duration-400 hover:scale-[1.16] hover:cursor-pointer '><Linkedin strokeWidth={2} className="h-full w-full object-cover text-[#ffffff]"/></div>
          <div className='h-[5vh] w-[50%] bg-linear-to-tr from-[#a81e17] to-[#ff2a2a] rounded-full p-2 hover:rotate-z-360 transition-all ease-in duration-400 hover:scale-[1.16] hover:cursor-pointer '><Mail strokeWidth={2} className="h-full w-full object-cover text-[#ffffff]"/></div>
          <div className='h-[5vh] w-[50%] bg-linear-to-tr from-[#19b42b] to-[#41ff44] rounded-full p-2 hover:rotate-z-360 transition-all ease-in duration-400 hover:scale-[1.16] hover:cursor-pointer'><img src='./images/whatsapp.png' className="h-full w-full object-cover text-[#ffffff]"/></div>
          <div className='h-[5vh] w-[50%] bg-linear-to-tr from-[#070707] to-[#5a5a5a] rounded-full p-2 hover:rotate-z-360 transition-all ease-in duration-400 hover:scale-[1.16] hover:cursor-pointer '><Globe strokeWidth={2} className="h-full w-full object-cover text-[#ffffff]"/></div>  
        </div> 
        
        
      </div>

    </div>
  )
}

export default Dashboard