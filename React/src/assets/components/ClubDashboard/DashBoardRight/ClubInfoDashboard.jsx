import React from 'react'

const ClubInfoDashboard = () => {
  return (
    <div className='h-full w-full flex flex-col '>
      <div className='font-normal h-[7vh] w-full text-[25px] text-[#983530] mt-2 flex gap-4 justify-start items-center'><span className='text-[#000000] font-semibold'>
        Hello, </span>
        CodeFiesta Club SKIT
        <div className='w-[6%] h-full rounded-full bg-amber-300 overflow-hidden'><img className='w-full h-full object-cover' src='./images/bd.webp'/></div>
      </div>
    </div>
  )
}

export default ClubInfoDashboard