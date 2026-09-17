import React, { useState } from 'react'
import {Award, Trophy} from 'lucide-react'
import AchivementsList from './AchivementsList'
import AllBadges from './AllBadges'

const AchivementsDashboard = () => {
  const [button, setbutton] = useState("all achievement")
  return (
    <div className='h-full w-full flex flex-col gap-3 justify-start'>
      <div className='flex justify-start items-center gap-4'>
            <button onClick={()=>setbutton("all achievement")} className='bg-white flex items-center gap-2 outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#983530] transition-all hover:cursor-pointer duration-300s ease-in hover:text-[#ffffff]'><Trophy size={18} className="text-[#983530]"/>All Achivements List</button>
            <button onClick={()=>setbutton("all badges")} className='bg-white flex items-center gap-2 outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#983530] transition-all hover:cursor-pointer duration-300s ease-in hover:text-[#ffffff]'><Award size={18} className="text-[#983530]"/>All Badges</button>
      </div>
      <div className='h-full w-full'>
        {button==="all badges" && <AllBadges/>}
        {button==="all achievement" && <AchivementsList/>}
      </div>      
    </div>
  )
}

export default AchivementsDashboard