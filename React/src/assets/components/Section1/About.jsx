import React from 'react'
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <div class=' h-210 w-2/3 absolute flex flex-col top-25 items-center left-60 z-0'>
        <div class="text-amber-50 text-[55px]">Orbix</div>
        <div class="text-amber-50 text-[15px] text-center mt-3">Orbix is a one-stop digital portal for all clubs at SKIT Jaipur, designed to keep students connected and engaged. The platform provides complete information about every club, including their activities, coordinators, member strength, and achievements. Students can easily explore clubs, join the ones that match their interests, and stay updated with upcoming and past events. With Orbix, discovering opportunities, connecting with peers, and being a part of vibrant campus life becomes seamless and exciting.</div>
        <div class="flex mt-5 mb-4 gap-10">
            <Link to='/studentpage'><button class= "bg-white w-45 text-[#900505] p-3 rounded-md text-[14px] font-bold hover:bg-transparent hover:text-amber-50 border-amber-50 border-solid border-2 hover:cursor-pointer ease-linear duration-200 transition-all">Login as a Student</button></Link>
            <Link to='/ClubDashboard'><button class= "bg-white w-45 text-[#900505] p-3 rounded-md text-[14px] font-bold hover:bg-transparent hover:text-amber-50 border-amber-50 border-solid border-2 hover:cursor-pointer ease-linear duration-200 transition-all">Login as a Club</button></Link>
        </div>
        <img class=" h-145 w-[82%] py-3 mr-15" src="./images/webimg.png"/>
    </div>
  )
}

export default About