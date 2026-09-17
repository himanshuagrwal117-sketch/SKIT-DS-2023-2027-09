import React from 'react'
import Logo1 from './Logo1'
import MiddleButtons from './MiddleButtons'
import RightButtons from './RightButtons'


const Header2 = ({scrollToUpcomingEvents,scrollToAboutEvents}) => {
  return (
    <div class=" w-full flex h-22 items-center p-2 fixed z-50 bg-[#983530]/90 shadow-sm ">
        <Logo1 />
        <MiddleButtons scrollToAboutEvents={scrollToAboutEvents} scrollToUpcomingEvents={scrollToUpcomingEvents}/>
        <RightButtons />
    </div>
  )
}

export default Header2