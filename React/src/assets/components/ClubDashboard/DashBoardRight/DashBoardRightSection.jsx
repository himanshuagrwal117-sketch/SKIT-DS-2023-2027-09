import React from 'react'
import Gallery from './Gallery/Gallery'
import Dashboard from './Dashboard'

import MemebrsInfoDashboard from './MemebrsInfoDashboard'
import VolunteersInfoDashboard from './VolunteersInfoDashboard'
import PendingEventsDashboard from './PendingEventsDashboard'
import DocumenetsDashboard from './Documents/DocumenetsDashboard'
import ClubInfoDashboard from './ClubInfoDashboard'
import AchivementsDashboard from './Achivements/AchivementsDashboard'
import EventsInfoDashbaord from './EventsDashboard/EventsInfoDashbaord'

const DashBoardRightSection = ({ActiveState}) => {
  return (
    <div className='bg-[#ffffff] outline outline-[#a4a4a4] w-[75%] p-5 flex flex-col justify-start h-full rounded-2xl overflow-hidden'>
      {ActiveState==='gallery' && <Gallery/>}
      {ActiveState==='dashboard' && <Dashboard/>}
      {ActiveState==='events' && <EventsInfoDashbaord/>}
      {ActiveState==='club information' && <ClubInfoDashboard/>}
       {ActiveState==='member info' && <MemebrsInfoDashboard/>}
        {ActiveState==='volunteer info' && <VolunteersInfoDashboard/>}
         {ActiveState==='pending event' && <PendingEventsDashboard/>}
          {ActiveState==='achivements' && <AchivementsDashboard/>}
          {ActiveState==='documents' && <DocumenetsDashboard/> }

    </div>
  )
}

export default DashBoardRightSection