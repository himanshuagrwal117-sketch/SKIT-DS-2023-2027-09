import React from 'react'
import { Mail } from "lucide-react";

const StudentInfo = () => {
  return (
    <div className='w-full h-full border-[#bbbbbb] rounded-2xl bg-[#f4f4f4] border-2 flex flex-col items-center text-center p-4'>
       <div className=' w-[43%] h-[17vh] rounded-full overflow-hidden' ><img className='h-full w-full object-cover'src="./images/bd.webp" alt="profile"/></div> 
       
       <h3 className='text-[20px] font-semibold mt-3 mb-3.5 '>Himanshu Agrawal</h3>
       <h3 className='text-[13px] font-medium mb-1'><span className='font-bold text-[#983530]'>Email: </span>b230765@skit.ac.in</h3>
       <h3 className='text-[13px] font-medium mb-1'><span className='font-bold text-[#983530]'>RTU Roll No.: </span>23ESKCX043</h3>
       <h3 className='text-[13px] font-medium mb-1'><span className='font-bold text-[#983530]'>College id: </span>B230765</h3>

       <h3 className='text-[13px] font-bold text-[#983530] mb-1 mt-6'>Acadmics Information:</h3>
       <h3 className='text-[13px] font-medium mb-1'>2nd Year | 6th sem | Data Science</h3>
        
    </div>
  )
}

export default StudentInfo