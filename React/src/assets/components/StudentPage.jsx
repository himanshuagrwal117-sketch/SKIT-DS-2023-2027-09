
import MainPanel1 from './Student_page/WelcomePANEL/WelcomePanel'

import Header2 from './Header2/Header2'
import StudentSection from './Student_page/StudentSection/StudentSection'
import UpComingEventSection from './Student_page/UpComingEvent/UpComingEventSection'
import AboutClubSection from './Student_page/AboutClubsSection/AboutClubSection'
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';



export const StudentPage = () => {
  const aboutEventRef = useRef(null);
  const upcomingEventsRef = useRef(null);
  const location = useLocation();


  const scrollToUpcomingEvents = () => {
  const yOffset = -100; // header height
  const y = upcomingEventsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

  const scrollToAboutEvents = () => {
  const yOffset = -100; // header height
  const y = aboutEventRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

  useEffect(() => {
    if (location.hash === '#upcoming-events' && upcomingEventsRef.current) {
      scrollToUpcomingEvents();
    }

    if (location.hash === '#about-clubs' && aboutEventRef.current) {
      scrollToAboutEvents();
    }
  }, [location]);

  return (
    <div>
        <Header2 scrollToAboutEvents={scrollToAboutEvents} scrollToUpcomingEvents={scrollToUpcomingEvents}/>
        <div className='flex flex-col pl-13 pr-13 pt-25 gap-10 items-center'>
            <MainPanel1/>
            <h1 className='text-[50px] font-medium mt-8 text-white '>Your Information and Activity in Clubs</h1>
            <StudentSection/>
            
            <UpComingEventSection upcomingEventsRef={upcomingEventsRef}/>
        </div>
        <div className='flex flex-col pl-5 pr-5 pt-5 mt-4 gap-10 items-center'>
          <AboutClubSection aboutEventRef={aboutEventRef}/>
        </div>
        
        
        
        
    </div>
  )
}
