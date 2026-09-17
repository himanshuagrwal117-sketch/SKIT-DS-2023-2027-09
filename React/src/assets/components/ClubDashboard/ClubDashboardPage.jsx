import React, { useState } from 'react'
import DashboardLeftSection from './DashboardLeft/DashboardLeftSection'
import DashBoardRightSection from './DashBoardRight/DashBoardRightSection'
import Gallery from './DashBoardRight/Gallery/Gallery'

const ClubDashboardPage = () => {
  const [ActiveState, setActiveState] = useState('dashboard')
  return (
    <div className='px-15 py-8 h-screen w-full gap-5 flex flex-col justify-start'>
        <div className=' text-[30px] h-[8vh] w-full flex gap-4 text-[#ffffff]'>
            
            <div className='h-full w-full rounded-full justify-center flex flex-col'>Welcome to the ClubName Dashboard</div>
            <div className='h-full w-[5%] rounded-full overflow-hidden'><img src='./images/bd.webp' className='h-full w-full object-cover'/></div>

        </div>
        <div className='w-full h-[80vh] bg-white rounded-2xl gap-7 flex p-5'>
            <DashboardLeftSection setActiveState={setActiveState} ActiveState={ActiveState}/>
            <DashBoardRightSection ActiveState={ActiveState}/>
        </div>
    </div>
  )
}

export default ClubDashboardPage