import React, { useState } from 'react'
import {Book, File, Plus,Upload } from 'lucide-react'
import ImportantDocuments from './ImportantDocuments'
import EventWiseDocuments from './EventWiseDocuments'

const DocumenetsDashboard = () => {
  const [button, setbutton] = useState('important-doc')
  return (
    <div className='h-full w-full flex flex-col gap-3 justify-start'>
      <div className='flex justify-between items-center gap-4'>
            <div className='h-full flex gap-4'><button onClick={()=>setbutton('important-doc')} className={`group flex items-center gap-2 outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#983530] hover:text-[#ffffff] ${button==='important-doc'? "bg-[#983530] text-[#ffffff]" : "bg-[#ffffff] text-[#000000]"} transition-all hover:cursor-pointer duration-100 ease-in`}><File size={18} className={`group-hover:text-white ${button==='important-doc'? "text-[#ffffff]" : "text-[#983530]"}`}/>Important Documenets</button>

            <button onClick={()=>setbutton('event-wise')} className={`group flex items-center gap-2 outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#983530] hover:text-[#ffffff] ${button==='event-wise'? "bg-[#983530] text-[#ffffff]" : "bg-[#ffffff] text-[#000000]"} transition-all hover:cursor-pointer duration-100 ease-in`}><Book size={18} className={`group-hover:text-white ${button==='event-wise'? "text-[#ffffff]" : "text-[#983530]"}`}/>Event Wise Folders</button>
            </div>

            
            <div className='flex h-full gap-3 justify-end'>
               {button==='important-doc' && <button onClick={()=>setbutton('upload')} className={`group flex text-[#ffffff] bg-[#1a3891] items-center justify-start gap-2 outline text-[15px] outline-[#1a3891] py-2 px-4 rounded-2xl hover:bg-[#ffffff] hover:text-[#1a3891] transition-all hover:cursor-pointer duration-100 ease-in`}><Upload size={18} className={`group-hover:text-[#1a3891] text-[#ffffff]`}/>Upload</button>}
              <button onClick={()=>setbutton('upload')} className={`group flex text-[#ffffff] bg-[#1a3891] items-center gap-2 outline text-[15px] outline-[#1a3891] py-2 px-4 rounded-md hover:bg-[#ffffff] hover:text-[#1a3891] transition-all hover:cursor-pointer duration-100 ease-in`}><Plus size={18} className={`group-hover:text-[#1a3891] text-[#ffffff] `}/>Create Folder</button>
            </div>
            
            
      </div>
      <div className='h-full w-full mt-3'>
        {button==='important-doc' && <ImportantDocuments/>}
        {button==='event-wise' && <EventWiseDocuments/>}
      </div>      
    </div>
  )
}

export default DocumenetsDashboard