import React from 'react'
import Logo from "./Logo"
import Notifi from "./NotificationProfile"
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div class=" w-full flex h-24 absolute justify-between items-center p-2 z-2">
        <Logo/>
        <div class=" flex h-1/3 w-[35%] justify-between items-center text-amber-50 z-1 text-[13px] font-bold mr-5 ">
            <button onClick={() => window.location.href = "https://www.skit.ac.in/"} class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">SKIT Page</button>
            <Link to='/aboutus'><button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">About us</button></Link>

            <button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">Contact Us</button>

            <button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">Help</button>

        </div>
        <Notifi />
    
    </div>
  )
}

export default Header