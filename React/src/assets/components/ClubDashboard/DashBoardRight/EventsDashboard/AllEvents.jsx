import React from 'react'

const AllEvents = () => {
  return (
    <div className='h-full w-full flex flex-wrap overflow-y-auto pb-6 py-3 px-1 justify-start gap-3 '>

      <div className='h-[26vh] w-full flex p-3 gap-3 rounded-lg outline outline-[#000000]'>
        <div className='w-[15%] rounded-md overflow-hidden'><img src='./images/DanceClub.jpeg' className='w-full h-full object-cover'/></div>
        <div className=' w-[79%] flex flex-col justify-start items-start'>
          <div className='text-[20px] font-semibold mb-1'>Club name club name</div>
          <div className=' gap-2 flex justify-start text-[9px] items-center mb-5'>
            <div className='text-[#000000] font-semibold  px-2 py-1 bg-[#e8e8e8] rounded-sm'>12th March, 2026</div>
            <div className='text-[#000000] font-semibold  px-2 py-1 bg-[#e8e8e8] rounded-sm'>12:00 pm to 3:00 pm</div>
            <div className='text-[#4e2727] font-semibold  px-2 py-1 bg-[#fcd04d] rounded-lg'>Rating</div>
          </div>
          <div className='flex gap-4 justify-start items-center text-[10px] mb-3'>
            <div className='py-1 px-2 rounded-sm bg-[#ffffff] font-semibold text-[#474747] outline  outline-[#000000]'>Registration <span className='text-[#000000] font-semibold ml-3'>+50</span></div>
            <div className='py-1 px-2 rounded-sm bg-[#ffffff] font-semibold text-[#474747] outline outline-[#000000]'>Members <span className='text-[#000000] font-semibold ml-3'>+32</span></div>
            <div className='py-1 px-2 rounded-sm bg-[#ffffff] font-semibold text-[#474747] outline outline-[#000000]'>Volunteers <span className='text-[#000000] font-semibold ml-3'>+12</span></div>
          </div>
          <div className='text-[12px] text-justify mb-2'><span className='font-semibold text-[#ad0101]'>About: </span>hiufhdgfyd uytud yttwi udhyt tudi hskud iui d h jok. kkkmm kmkm kmk mkmkmk kkmm kmkmmmkmkm kmkmk kmkmmkm kmkk kmkm</div>
          <div className='text-[12px] text-justify'><span className='font-semibold text-[#ad0101]'>Coordinators: </span>Himanshu Agrawal,Himanshu Agrawal,Himanshu Agrawal,Himanshu Agrawal</div>
        </div>
        <div className='w-[7%]'>hh</div>
      </div>

      
    </div> 
  )
}

export default AllEvents