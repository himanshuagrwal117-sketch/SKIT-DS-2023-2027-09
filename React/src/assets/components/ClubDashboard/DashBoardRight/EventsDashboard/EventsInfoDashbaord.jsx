import React, { useState } from 'react'
import {Video, Images,GalleryVerticalEnd} from 'lucide-react'
import AllEvents from './AllEvents'
import UpComingEvents from './UpComingEvents'
import TodayEvent from './TodayEvent'


const EventsInfoDashbaord = () => {
  const [eventoption, seteventoption] = useState('total events')
  return (
    <div className='bg-white h-full w-full gap-6 flex flex-col'>
        <div className='flex justify-start items-center gap-4'>

            <button onClick={()=> seteventoption('total events')} className={`group outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#8e2020] ${eventoption==='total events'? "text-[#ffffff] bg-[#8e2020]" : "text-[#000000] bg-[#ffffff]"} transition-all hover:cursor-pointer duration-100s ease-in hover:text-[#ffffff] flex justify-center items-center gap-2`}><GalleryVerticalEnd size={17}  className={`group-hover:text-[#ffffff] transition-all duration-100 ease-in ${eventoption==='total events'? "text-[#ffffff]" : "text-[#8e2020]"}`}/>All Events</button>
            <button onClick={()=> seteventoption('upcoming events')}  className={`group outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#8e2020] ${eventoption==='upcoming events'? "text-[#ffffff] bg-[#8e2020]" : "text-[#000000] bg-[#ffffff]"} transition-all hover:cursor-pointer duration-100s ease-in hover:text-[#ffffff] flex justify-center items-center gap-2`}><Images size={17}  className={`group-hover:text-[#ffffff] transition-all duration-100 ease-in ${eventoption==='upcoming events'? "text-[#ffffff]" : "text-[#8e2020]"}`}/>Upcoming Events</button>
            <button onClick={()=> seteventoption('todays event')}  className={`group outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#8e2020] ${eventoption==='todays event'? "text-[#ffffff] bg-[#8e2020]" : "text-[#000000] bg-[#ffffff]"} transition-all hover:cursor-pointer duration-100s ease-in hover:text-[#ffffff] flex justify-center items-center gap-2`}><Video size={17} className={`group-hover:text-[#ffffff] transition-all duration-100 ease-in ${eventoption==='todays event'? "text-[#ffffff]" : "text-[#8e2020]"}`}/>Today's Event</button>
            
        </div>
        <div className='w-full h-full overflow-y-auto'>
          { eventoption==='total events' && <AllEvents/>  }
          { eventoption==='upcoming events' &&  <UpComingEvents/>}
          { eventoption==='todays event' &&  <TodayEvent/> } 
        </div>
        
    </div>
  )
}

export default EventsInfoDashbaord