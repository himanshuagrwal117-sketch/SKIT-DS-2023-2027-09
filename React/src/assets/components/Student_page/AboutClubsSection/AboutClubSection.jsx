import React, { useState } from 'react'

import ClubDetailData from '../../Storage/ClubDetailedInfo'
import ClubsAllInfoCards from './ClubsAllInfoCards'




const AboutClubSection = ({aboutEventRef}) => {
  const [Category, setCategory] = useState("Tech")
  
   
  return (
    <div ref={aboutEventRef} className='w-full flex flex-col justify-between items-center mt-3'>
      <h1 className='text-[50px] font-medium text-white mb-5'>All Clubs Information</h1>
      <div  className=" w-full flex flex-col gap-3">
        <div className='flex justify-start items-center gap-5 mb-2'>
          <button onClick={()=>{setCategory("Tech")}} className={`club-btn pr-4 pl-4 pb-1 pt-1 rounded-md cursor-pointer outline-1 outline-[#ffffff] transition-all ease-in-out duration-300 ${Category==="Tech" ? "bg-[#942A25] text-[#ffffff]":"bg-[#ffffff] text-[#000000]"} `}>Technical Clubs</button>
          <button  onClick={()=>{setCategory("Cultural")}} className={`club-btn pr-4 pl-4 pb-1 pt-1 rounded-md cursor-pointer outline-1 outline-[#ffffff] transition-all ease-in-out duration-300 ${Category==="Cultural" ? "bg-[#942A25] text-[#ffffff]":"bg-[#ffffff] text-[#000000]"} `}>Cultural Clubs</button>
          <button onClick={()=>{setCategory("Social")}} className={`club-btn pr-4 pl-4 pb-1 pt-1 rounded-md cursor-pointer outline-1 outline-[#ffffff] transition-all ease-in-out duration-300 ${Category==="Social" ? "bg-[#942A25] text-[#ffffff]":"bg-[#ffffff] text-[#000000]"} `}>Social Clubs</button>
          <button  onClick={()=>{setCategory("Literary")}} className={`club-btn pr-4 pl-4 pb-1 pt-1 rounded-md cursor-pointer outline-1 outline-[#ffffff] transition-all ease-in-out duration-300 ${Category==="Literary" ? "bg-[#942A25] text-[#ffffff]":"bg-[#ffffff] text-[#000000]"} `}>Literary Clubs</button>
          <button  onClick={()=>{setCategory("Artistic")}} className={`club-btn pr-4 pl-4 pb-1 pt-1 rounded-md cursor-pointer outline-1 outline-[#ffffff] transition-all ease-in-out duration-300 ${Category==="Artistic" ? "bg-[#942A25] text-[#ffffff]":"bg-[#ffffff] text-[#000000]"} `}>Aritistic Clubs</button>
        </div>
        <div className='w-full bg-white rounded-2xl p-7 flex flex-col justify-between items-center gap-10'>
          {ClubDetailData
           .filter((club) => club.cat ===Category)
              .map((club, index) => (
                <ClubsAllInfoCards
                
                  id={club.id}
                  clubname={club.name}
                  memebers={club.memebers}
                  events={club.events}
                  volunteers={club.volunteers}
                  cat={club.cat}
                  stars={club.stars}
                  about={club.info}
                  faculty={club.faculty}
                  student={club.student}
                  url={club.url}
                  Joined={club.Joined}
                  Volunteer={club.Volunteer}
                  />
            ))}
        </div>
    </div>
    </div>
    
  )
}

export default AboutClubSection