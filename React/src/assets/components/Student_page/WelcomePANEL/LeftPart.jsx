import {Users,User,CalendarCheck} from 'lucide-react'


const LeftPart = () => {
  return (
    <div className='h-full w-[47%] p-10 overflow-auto space-y-0'>
                  <p className='text-black font-semibold text-[40px] leading-tight' >Welcome to Joinshphere,</p>
                  <p className='text-[#983530] font-semibold text-[40px] leading-tight'>Himanshu</p>
                  <p className='text-black font-medium text-[15px] leading-tight'>b230765@skit.ac.in</p>
                  <p className='text-black w-[94%] mt-8 mb-13 font-normal text-[15px] text-justify '>JoinSphere is your central hub for discovering and engaging with all student clubs at SKIT Jaipur. Explore club activities, coordinators, achievements, and upcoming events all in one place. Whether you want to join a club or volunteer, JoinSphere makes campus involvement simple and accessible.</p>
                  <div className='w-full flex gap-5 '>
                    <button class="bg-[#983530] flex gap-4 items-center border-2 border-solid border-[#983530] rounded-sm text-white pt-1.5 pl-2.5 pr-2.5 pb-1.5 mt-4 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all"><User size={19} />Join a Club as a Member</button>
                  <button class="bg-[#983530] flex gap-4 items-center border-2 border-solid border-[#983530] rounded-sm text-white pt-1.5 pl-2.5 pr-2.5 pb-1.5 mt-4 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all"><Users size={19} />Apply as a Volunteer in a Club</button>
                  </div>
                  <div className='w-[90%] flex items-center justify-center'>
                    <button class="bg-[#ffffff]  flex items-center gap-4 border-2 border-solid border-[#983530] rounded-sm font-bold text-[#983530] pt-1.5 pl-10 pr-10 pb-1.5 mt-4 hover:bg-[#983530] hover:text-white hover:cursor-pointer ease-linear duration-200 transition-all"><CalendarCheck size={19}/>Today's Events</button>  
                  </div>      
    </div>
  )
}

export default LeftPart