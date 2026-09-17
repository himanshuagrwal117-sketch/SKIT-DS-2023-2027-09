import React from 'react'
import UpCmingEventCard from './UpComingEventCard'

const UpComingEventSection = ({upcomingEventsRef}) => {
  return (
    <div  ref={upcomingEventsRef} className='h-[68vh] w-full flex flex-col items-center justify-between gap-1'>
      <div className='text-[50px] font-medium mt-4 text-white '>Up Coming Events</div>
      <div  className='h-[70vh] w-full bg-white rounded-2xl flex flex-nowrap overflow-x-auto mt-4 p-5 gap-6'>
        <UpCmingEventCard/>
        <UpCmingEventCard/>
        <UpCmingEventCard/>
        <UpCmingEventCard/>
      </div>
    </div>
    
  )
}

export default UpComingEventSection