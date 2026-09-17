import React, { useState } from 'react'
import {Users,PartyPopper,CircleStar,Phone,Image,Linkedin,Instagram,Globe,University,Plus,UserStar,CircleCheck} from 'lucide-react'





const ClubsAllInfoCards = ({id,clubname,memebers,events,volunteers,cat,stars,about,faculty,student,url,Joined,Volunteer}) => { 
  const joinedText = Joined ? "Leave the Club" : "Join Club";
  

  const volunteering = Volunteer ? "Leave Volunteering" : "Apply as a Volunteer";
  

  return (
  <div  key={id} id="about-clubs" className='w-ull h-[44vh] flex gap-4 rounded-2xl bg-white shadow-md outline-2 outline-[#dadada] p-4'>
     <div className='h-full w-[23%] mb-4 bg-amber-950 flex flex-col justify-between rounded-2xl overflow-hidden'>
      <div className='bg-amber-200 w-full'><img className='w-full h-full object-cover' src={url} /></div>
     </div> 
     <div className=' h-full w-full ml-3 flex flex-col'>

         <div className='w-full text-[34px] font-semibold mb-1 flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
               <div className='text-[26px]'>{clubname}</div>
               {Joined && <div className='bg-lime-600 text-[#ffffff] text-[12px] font-normal pl-3 pr-3 pb-1 pt-1 flex gap-2 items-center rounded-4xl'><CircleCheck size={14} strokeWidth={2.5}/>Joined as a Memeber</div>}
               {Volunteer && <div className='bg-amber-300 text-[#000000] text-[12px] font-normal pl-3 pr-3 pb-1 pt-1 flex gap-2 items-center rounded-4xl'><CircleCheck size={14} strokeWidth={2.5}/>Joined As a Volunteer</div>}
            </div>
            
            <div className='flex w-[21%] justify-around items-center text-[20px] ml-3 gap-3'>
               <div className='bg-[#0071c7] rounded-full h-[4vh] w-[25%] flex justify-around items-center hover:scale-[1.08] hover:bg-[#0265b1] cursor-pointer'><Linkedin strokeWidth={1.5} size={17} color="#ffffff"/></div>
               <div className='bg-[#d600bd] rounded-full h-[4vh] w-[25%] flex justify-around items-center hover:scale-[1.08] hover:bg-[#b603c6] cursor-pointer'><Instagram strokeWidth={1.5} size={17} color="#ffffff"/></div>
               <div className='bg-[#454545] rounded-full h-[4vh] w-[25%] flex justify-around items-center hover:scale-[1.08] hover:bg-[#272727] cursor-pointer'><Globe strokeWidth={1.5} size={17} color="#ffffff"/></div>
               <div className='bg-[#b31111] rounded-full h-[4vh] w-[25%] flex justify-around items-center hover:scale-[1.08] hover:bg-[#8c0505] cursor-pointer'><University strokeWidth={1.5} size={17} color="#ffffff"/></div>
               <div className='bg-[#04c44a] rounded-full h-[4vh] w-[25%] flex justify-around items-center hover:scale-[1.08] hover:bg-[#00b14a] cursor-pointer'><img src='./images/whatsapp.png' className='w-[45%] h-[2vh] object-cover'/></div>
            </div>
         </div>


         <div className='w-full  flex justify-start items-center gap-3 mb-4 pt-2 pb-2'>
            <div className='pl-4 pr-4 pb-1 pt-1 text-[11px] rounded-2xl bg-[#f6f6f6] outline-1 outline-[#000000] flex items-center gap-3'><Users size={16}/>{memebers}</div>   
            <div className='pl-4 pr-4 pb-1 pt-1 text-[11px] rounded-2xl bg-[#f6f6f6] outline-1 outline-[#000000] flex items-center gap-3'><PartyPopper size={16} />{events}+ Events</div>
            <div className='pl-4 pr-4 pb-1 pt-1 text-[11px] rounded-2xl bg-[#f6f6f6] outline-1 outline-[#000000] flex items-center gap-3'><UserStar size={16}/>{volunteers}+ Volunteers</div>
            <div className='pl-4 pr-4 pb-1 pt-1 text-[11px] rounded-2xl bg-[#4bf0f6] outline-1 outline-[#000000] flex items-center gap-4'>{cat}</div>
            <div className='pl-4 pr-4 pb-1 pt-1 text-[11px] rounded-2xl bg-[#fecc36] outline-1 outline-[#000000] flex items-center gap-3'><CircleStar color="#000000" size={16}/>{stars}</div>
         </div>

         
         <div className=' h-[10vh] w-full mb-4 text-[14px]'>{about}</div>


         <div className='w-full text-[14px] font-bold flex justify-between items-center'>
              <div>
               Faculty Coordinator: <span className='text-[14px] font-normal'> {faculty}</span><br/>
               Student Coordinator: <span className='text-[14px] font-normal'>{student}</span>
              </div>
               <div className='flex justify-between items-center gap-4'>
                  <button className='rounded-md text-[#942A25] bg-[#ffffff] outline-1 font-medium outline-[#942A25] pl-4 pr-4 pt-1 pb-1 hover:bg-[#942A25] hover:text-[#ffffff] hover:font-medium cursor-pointer transition:all ease-in duration-300 flex items-center gap-3'><PartyPopper size={15} />Our Past Events</button>
                  <button className='rounded-md text-[#942A25] bg-[#ffffff] outline-1 font-medium outline-[#942A25] pl-4 pr-4 pt-1 pb-1 hover:bg-[#942A25] hover:text-[#ffffff] hover:font-medium cursor-pointer transition:all ease-in duration-300 flex items-center gap-3'><Phone size={15} />Conatct us</button>
                  <button className='rounded-md text-[#942A25] bg-[#ffffff] outline-1 font-medium outline-[#942A25] pl-4 pr-4 pt-1 pb-1 hover:bg-[#942A25] hover:text-[#ffffff] hover:font-medium cursor-pointer transition:all ease-in duration-300 flex items-center gap-3'><Image size={15}/>View Gallery</button>
              </div>
         </div>



        <div className='w-full flex justify-center items-center gap-3 mt-7'>
            <button className={`rounded-md  pl-4 pr-4 pt-1 pb-1 flex justify-around outline items-center gap-2 ${Joined? "bg-[#c6c6c6] text-[#272727] outline-[#272727] cursor-pointer hover:scale-[1.04] transition-all ease-in duration-300 ":"text-[#ffffff] bg-[#942A25] outline-[#942A25] cursor-pointer hover:scale-[1.04] transition-all ease-in duration-300" }`}>{!Joined && <Plus strokeWidth={2} size={17} color="#ffffff"/>}{joinedText}</button>
             <button className= {`rounded-md pl-4 pr-4 pt-1 pb-1 flex justify-around items-center gap-2 ${Volunteer? " bg-[#c6c6c6] text-[#272727] outline outline-[#272727] cursor-pointer hover:scale-[1.04] transition-all ease-in duration-300" : "text-[#ffffff] bg-[#114486] outline outline-[#114486] cursor-pointer hover:scale-[1.04] transition-all ease-in duration-300"} `}>{!Volunteer && <UserStar strokeWidth={1.5} size={17} color="#ffffff"/>}{volunteering}</button>  
         </div>
        
         
     </div>
      
  </div > ) }
  export default ClubsAllInfoCards;