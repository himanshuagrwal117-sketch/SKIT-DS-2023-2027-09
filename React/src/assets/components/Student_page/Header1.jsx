import React from 'react'
import Logo from '../header/Logo'
import Notifi from '../header/NotificationProfile'


const Header1 = () => {
  return (
    
        <div class=" w-full flex h-24 justify-between items-center p-2 z-2">
        <Logo/>
        <div class=" flex h-1/3 w-93 justify-between items-center text-amber-50 z-1 text-[13px] font-bold ">
            <button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">SKIT Page</button>

            <button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">Contact Us</button>

            <button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">Help</button>

        </div>
        <Notifi/>
        
    
    </div>
    
  )
}

export default Header1