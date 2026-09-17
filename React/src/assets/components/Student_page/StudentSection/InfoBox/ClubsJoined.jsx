import React from 'react'
import {MoveUpRight} from 'lucide-react'

const ClubsJoined = () => {
  return (
    <div className='h-full w-full'>
        <div className='w-full h-[10vh] bg-[#ffffff] outline-1 outline-[#b0b0b0] rounded-lg flex items-center py-3 px-4'>
            <div className='h-full flex w-[90%] items-center gap-3 justify-start'>
                <div className='h-full w-[16%] rounded-full bg-amber-500 overflow-hidden'><img src='./images/bd.webp' className='w-full h-full object-cover'/></div>
                <div className='flex flex-col items-start text-[14px]'>
                    <div className='font-semibold'>Competitative Programming Club</div>
                    <div className='text-[12px] text-[#3f3f3f] font-medium '>Joined on 12th march, 2024</div>
                </div>
                
            </div>
            <div className='h-[5vh] w-[10%] bg-amber-300 outline outline-[#e39103] hover:bg-amber-200 hover:cursor-pointer rounded-full flex items-center justify-center'>
              <MoveUpRight size={17} strokeWidth={3}/>
            </div>

            
        </div>
    </div>
  )
}

export default ClubsJoined