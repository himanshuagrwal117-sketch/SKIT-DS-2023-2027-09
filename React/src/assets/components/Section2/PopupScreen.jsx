import React, { useEffect, useState } from "react";
import {X} from "lucide-react"
import ClubData from '../Storage/ClubInfoHome'
import PopBlockDivs from "./PopBlockDivs";

const PopupScreen = ({onClose,category}) => {
    
  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";

    // Enable scroll back on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex flex-col gap-2 items-center justify-center'>
        
        <div className='flex justify-end w-[70%]'><button onClick={onClose} className='hover:cursor-pointer rounded-full hover: bg-[#e2dede] hover:scale-[1.03]'><X size={40} className='bg-white p-1 rounded-full' /></button></div>
        <div className='bg-white relative p-8 rounded-2xl h-[80vh] w-[70%] flex flex-col gap-7 overflow-y-scroll'>      
            {ClubData
              .filter((club) => club.cat === category)
              .map((club, index) => (
                <PopBlockDivs
                  key={club.id}
                  serial={index + 1}
                  name={club.name}
                  info={club.info}
                  image={club.url}
                  link={club.link}
                />
            ))}

    
        </div>
    </div>
  )
}

export default PopupScreen