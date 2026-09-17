import React from 'react'
import {FileBadge,MoveUpRight,Upload} from 'lucide-react'

const EventsAsVolunteer = () => {
  return (
    <div className='h-full w-full gap-6 flex flex-col justify-start'>
        <div className='w-full bg-[#ffffff] outline-1 outline-[#b0b0b0] rounded-lg justify-between relative flex items-center py-4 px-4'>
            <div className='h-[5vh] w-[10%] absolute -top-5 -left-4 rounded-full bg-amber-500 overflow-hidden'><img src='./images/61.png' className='h-full w-full object-cover'/></div>
            <div className='flex w-[90%] items-center justify-start'>
                
                <div className='flex w-full flex-col items-start text-[15px] wrap-break-word'>
                    <div className='font-bold text-left leading-tight'>Event name Event name Evnnnnnnnnnnt  </div>
                    <div className='text-[12px] text-[#3f3f3f] mt-1 font-medium flex flex-col gap-3 justify-start items-start'>
                      <div className='font-bold text-[#983530] text-left leading-tight'>by club name club name club name</div>
                      <div>Volunteered on&nbsp;<span className='text-[#3ba14f] font-semibold'>12/09/26</span></div>
                      
                    </div>
                </div>
                
            </div>

            <div className='h-[5vh] w-[10%] ml-4 bg-amber-300 outline outline-[#e39103] hover:bg-amber-200 hover:cursor-pointer rounded-full flex items-center justify-center'>
              <MoveUpRight size={17} strokeWidth={3}/>
            </div>
            
        </div>

        <div className='w-full bg-[#ffffff] outline-1 outline-[#b0b0b0] rounded-lg justify-between relative flex items-center py-4 px-4'>
            <div className='h-[5vh] w-[10%] absolute -top-5 -left-4 rounded-full bg-amber-500 overflow-hidden'><img src='./images/61.png' className='h-full w-full object-cover'/></div>
            <div className='flex w-[90%] items-center justify-start'>
                
                <div className='flex w-full flex-col items-start text-[15px] wrap-break-word'>
                    <div className='font-bold text-left leading-tight'>Event name Event name Evnnnnnnnnnnt  </div>
                    <div className='text-[12px] text-[#3f3f3f] mt-1 font-medium flex flex-col gap-3 justify-start items-start'>
                      <div className='font-bold text-[#983530] text-left leading-tight'>by club name club name club name</div>
                      <div>Volunteered on&nbsp;<span className='text-[#3ba14f] font-semibold'>12/09/26</span></div>
                      
                    </div>
                </div>
                
            </div>

            <div className='h-[5vh] w-[10%] ml-4 bg-amber-300 outline outline-[#e39103] hover:bg-amber-200 hover:cursor-pointer rounded-full flex items-center justify-center'>
              <MoveUpRight size={17} strokeWidth={3}/>
            </div>
            
        </div>
    </div>
  )
}

export default EventsAsVolunteer