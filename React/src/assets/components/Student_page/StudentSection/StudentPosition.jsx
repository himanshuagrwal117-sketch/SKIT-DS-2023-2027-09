import React from 'react'

const StudentPosition = () => {
  return (
    <div className='w-full h-full flex flex-col gap-1'>

           <div className='w-full h-full bg-linear-to-tr from-[#ffc400] to-[#ffc93f] rounded-2xl py-3 px-4'>
            
               <h3 className='text-[18px] text-center text-[#303030] font-semibold'>Your Positions</h3>
               <p className='text-[16px] text-[#303030] font-bold mt-3 '>Club Coordinator of:&nbsp;&nbsp;<span className='font-normal absolute z-2'>None</span></p>
               <p className='text-[16px] text-[#303030] font-bold mt-3 '>Core Member of:&nbsp;&nbsp;<span className='font-normal absolute z-2'>None</span></p>

          </div>

         
    </div>
    
  )
}

export default StudentPosition