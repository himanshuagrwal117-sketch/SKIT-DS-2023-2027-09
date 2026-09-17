import {BadgePlus,LifeBuoy, Handshake, Trophy, CalendarHeart,Layers2, HandCoins,Upload, ChevronRight, Users, FileUser} from 'lucide-react'
import ClubsJoined from './InfoBox/ClubsJoined'
import { useState } from 'react'
import AsVoluteer from './InfoBox/AsVoluteer'
import EventRegistered from './InfoBox/EventRegistered'
import EventsParticipated from './InfoBox/EventsParticipated'
import { NumberOfAchivements } from './InfoBox/NumberOfAchivements'
import NumberOfCertificates from './InfoBox/NumberOfCertificates'
import EventsOrgainizedAsCoord from './InfoBox/EventsOrgainizedAsCoord'
import EventsAsVolunteer from './InfoBox/EventsAsVolunteer'


const ActivityInfo = () => {
  const [button, setbutton] = useState('Joined Clubs')
  return (
     <div className='w-full h-full flex flex-col items-center justify-start rounded-2xl gap-3 ml-4'>


       <div className=' w-full items-center text-[23px] flex justify-between font-semibold mb-1'>
          <div className='w-[60%]'>All Joined Clubs</div>
          <div className='flex flex-wrap gap-3 w-[64%] justify-end'>

              <div className='font-medium outline outline-black text-[14px] flex items-center gap-3
                              rounded-2xl bg-amber-300 pl-5 pr-5 pt-2 pb-2 transition-all duration-200'>
                <HandCoins size={18} strokeWidth={2.25}/>
                5
              </div>

              <button className='font-medium text-white text-[14px] outline flex items-center gap-3
                            rounded-2xl bg-[#014b81] pt-2 pb-2 pl-5 pr-5
                            transition-all duration-200
                            hover:bg-white hover:text-[#014b81] hover:outline-[#014b81]'>
               <Layers2 size={18} strokeWidth={2.25}/>All Certificates</button>

               <button className='group font-medium w-[15%] hover:w-[42%]
                  text-white text-[14px] outline
                  flex items-center gap-3
                  rounded-2xl bg-[#014b81]
                  pt-2 pb-2 pl-7 pr-7
                  overflow-hidden
                  transition-all duration-200
                  hover:bg-white hover:text-[#014b81] hover:outline-[#014b81] hover:cursor-pointer'>
                    <Upload size={18} strokeWidth={2.25} className="shrink-0" />

                    <span
                      className='whitespace-nowrap opacity-0
                                group-hover:opacity-100
                                transition-opacity duration-200 delay-150'
                    >
                      Upload Certificate
                    </span>
                 </button>
              </div>
           </div>
      
      <div className='h-full flex w-full gap-5'>
        <div className='h-full w-[50%] flex flex-col text-[14px] justify-between '>

          
            <div onClick={()=>setbutton('Joined Clubs')} className={`pl-5 overflow-hidden w-full py-2 hover:bg-[#983530] hover:text-[#ffffff] outline outline-[#b0b0b0] ${button==='Joined Clubs'? "scale-[1.04] font-semibold bg-[#983530] text-[#ffffff] ":" bg-[#ffffff] scale-[1]"} transition-all duration-200 ease-in hover:cursor-pointer h-[6vh] flex rounded-md justify-between items-center`}>
              <div className='font-semibold flex justify-between items-center gap-3'><BadgePlus  size={18}/>Clubs Joined as a Member</div>
             <div className='h-full w-[23%] flex items-center justify-between'>
                <div className='h-full w-[70%] bg-amber-300 items-center flex text-[#000000] rounded-lg justify-center'>5</div>
                <div className='h-full w-[30%] items-center flex justify-center' ><ChevronRight size={15} /></div>
              </div>
            </div>

            <div  onClick={()=>setbutton('Volunteer in Clubs')} className={`pl-5 overflow-hidden w-full py-2 hover:bg-[#983530] hover:text-[#ffffff] outline outline-[#b0b0b0] ${button==='Volunteer in Clubs'? "scale-[1.04] font-semibold bg-[#983530] text-[#ffffff] ":" bg-[#ffffff] scale-[1]"} transition-all duration-200 ease-in hover:cursor-pointer h-[6vh] flex rounded-md justify-between items-center`}>
              <div className='font-semibold flex justify-between items-center gap-3'><FileUser  size={18}/>Clubs Joined As a Volunteer</div>
             <div className='h-full w-[23%] flex items-center justify-between'>
                <div className='h-full w-[70%] bg-amber-300 items-center flex text-[#000000] rounded-lg justify-center'>5</div>
                 <div className='h-full w-[30%] items-center flex justify-center'><ChevronRight size={15} /></div>
              </div>
            </div>

            <div onClick={()=>setbutton('Registered Events')} className={`pl-5 overflow-hidden w-full py-2 hover:bg-[#983530] hover:text-[#ffffff] outline outline-[#b0b0b0] ${button==='Registered Events'? "scale-[1.04] font-semibold bg-[#983530] text-[#ffffff] ":" bg-[#ffffff] scale-[1]"} transition-all duration-200 ease-in hover:cursor-pointer h-[6vh] flex rounded-md justify-between items-center`}>
              <div className='font-semibold flex justify-between items-center gap-3'><LifeBuoy size={18}/>Events you Registered</div>
              <div className='h-full w-[23%] flex items-center justify-between'>
                <div className='h-full w-[70%] bg-amber-300 items-center flex text-[#000000] rounded-lg justify-center'>5</div>
                <div className='h-full w-[30%] items-center flex justify-center'><ChevronRight size={15} /></div>
              </div>
            </div>
            <div onClick={()=>setbutton('Participated Events')} className={`pl-5 overflow-hidden w-full py-2 hover:bg-[#983530] hover:text-[#ffffff] outline outline-[#b0b0b0] ${button==='Participated Events'? "scale-[1.04] font-semibold bg-[#983530] text-[#ffffff] ":" bg-[#ffffff] scale-[1]"} transition-all duration-200 ease-in hover:cursor-pointer h-[6vh] flex rounded-md justify-between items-center`}>
                <div className='font-semibold flex justify-between items-center gap-3'><Handshake size={18}/>Events you Participated</div>
               <div className='h-full w-[23%] flex items-center justify-between'>
                <div className='h-full w-[70%] bg-amber-300 items-center flex text-[#000000] rounded-lg justify-center'>5</div>
                 <div className='h-full w-[30%] items-center flex justify-center'><ChevronRight size={15} /></div>
              </div>
            </div>
            <div onClick={()=>setbutton('All Achivements')}  className={`pl-5 overflow-hidden w-full py-2 hover:bg-[#983530] hover:text-[#ffffff] outline outline-[#b0b0b0] ${button==='All Achivements'? "scale-[1.04] font-semibold bg-[#983530] text-[#ffffff] ":" bg-[#ffffff] scale-[1]"} transition-all duration-200 ease-in hover:cursor-pointer h-[6vh] flex rounded-md justify-between items-center`}>
                <div className='font-semibold flex justify-between items-center gap-3'><Trophy size={18}/>Number of Achievments</div>
               <div className='h-full w-[23%] flex items-center justify-between'>
                <div className='h-full w-[70%] bg-amber-300 items-center flex text-[#000000] rounded-lg justify-center'>5</div>
                 <div className='h-full w-[30%] items-center flex justify-center'><ChevronRight size={15} /></div>
              </div>
            </div>
            <div onClick={()=>setbutton('About All Certificates')}  className={`pl-5 overflow-hidden w-full py-2 hover:bg-[#983530] hover:text-[#ffffff] outline outline-[#b0b0b0] ${button==='About All Certificates'? "scale-[1.04] font-semibold bg-[#983530] text-[#ffffff] ":" bg-[#ffffff] scale-[1]"} transition-all duration-200 ease-in hover:cursor-pointer h-[6vh] flex rounded-md justify-between items-center`}>
                <div className='font-semibold flex justify-between items-center gap-3'><Layers2 size={18} />Number of Certificates</div>
               <div className='h-full w-[23%] flex items-center justify-between'>
                <div className='h-full w-[70%] bg-amber-300 items-center flex text-[#000000] rounded-lg justify-center'>5</div>
                 <div className='h-full w-[30%] items-center flex justify-center'><ChevronRight size={15} /></div>
              </div>
            </div>
            <div onClick={()=>setbutton('Coordinated Events')}  className={`pl-5 overflow-hidden w-full py-2 hover:bg-[#983530] hover:text-[#ffffff] outline outline-[#b0b0b0] ${button==='Coordinated Events'? "scale-[1.04] font-semibold bg-[#983530] text-[#ffffff] ":" bg-[#ffffff] scale-[1]"} transition-all duration-200 ease-in hover:cursor-pointer h-[6vh] flex rounded-md justify-between items-center`}> 
                <div className='font-semibold flex justify-between items-center gap-3'><CalendarHeart size={18}/>Events organized as Coordinator</div>
               <div className='h-full w-[23%] flex items-center justify-between'>
                <div className='h-full w-[70%] bg-amber-300 items-center flex text-[#000000] rounded-lg justify-center'>5</div>
                 <div className='h-full w-[30%] items-center flex justify-center'><ChevronRight size={15} /></div>
              </div>
            </div>
            <div onClick={()=>setbutton('Volunteering Events')} className={`pl-5 overflow-hidden w-full py-2 hover:bg-[#983530] hover:text-[#ffffff] outline outline-[#b0b0b0] ${button==='Volunteering Events'? "scale-[1.04] font-semibold bg-[#983530] text-[#ffffff] ":" bg-[#ffffff] scale-[1]"} transition-all duration-200 ease-in hover:cursor-pointer h-[6vh] flex rounded-md justify-between items-center`}> 
                <div className='font-semibold flex justify-between items-center gap-3'><Users size={18}/>Events organized as Volunteer</div>
               <div className='h-full w-[23%] flex items-center justify-between'>
                <div className='h-full w-[70%] bg-amber-300 items-center flex text-[#000000] rounded-lg justify-center'>5</div>
                 <div className='h-full w-[30%] items-center flex justify-center'><ChevronRight size={15} /></div>
              </div>
            </div>

        </div>
        
        <div className='shadow-md outline bg-[#f4f4f4] outline-[#b0b0b0] h-full w-[50%] rounded-lg p-6 overflow-y-auto text-center flex flex-col gap-2'>
          <div className='w-full h-[4vh] font-semibold'>{button}</div>
          {button==='Joined Clubs' && <ClubsJoined/>}
          {button==='Volunteer in Clubs' && <AsVoluteer/>}
          {button==='Registered Events' && <EventRegistered/>}
          {button==='Participated Events' && <EventsParticipated/>}
          {button==='All Achivements' && <NumberOfAchivements/>}
          {button==='About All Certificates' && <NumberOfCertificates/>}
          {button==='Coordinated Events' && <EventsOrgainizedAsCoord/>}
           {button==='Volunteering Events' && <EventsAsVolunteer/>}
          
          
        </div>

      </div>
      
      </div>
  )
}

export default ActivityInfo