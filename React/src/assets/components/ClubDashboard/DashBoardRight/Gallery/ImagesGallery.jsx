import React,{ useState } from 'react'
import {EllipsisVertical,FolderPen, Trash  } from 'lucide-react'

const ImagesGallery = () => {
  const [mouseEnter, setmouseEnter] = useState(false)
  const [menuStatus, setmenuStatus] = useState(false)
  return (
    <div className='w-full h-full p-4 flex flex-nowrap overflow-y-auto justify-start gap-x-6 items-start'>
      <div className='h-[32vh] w-[14%] flex flex-col gap-2 p-1 overflow-visible'>
            <div className={`w-full h-[21vh] bg-[#ffffff] rounded-lg mb-1 flex items-center justify-center outline-2 outline-[#ffffff] overflow-visible px-2 transition-all duration-600 ease-int ${(!menuStatus && !mouseEnter) && "hover:cursor-pointer hover:bg-[#eeeeee] hover:outline-[#c2c2c2]"} relative`}>
                <div className='bg-amber-700 w-full h-[8vh] rounded-sm'></div>
                <span onMouseEnter={()=>setmouseEnter(true)}  onMouseLeave={()=>setmouseEnter(false)} onClick={()=>setmenuStatus(!menuStatus)} className='absolute -top-2 -right-2 rounded-full bg-white outline outline-[#000000] p-1 hover:cursor-pointer hover:scale-[1.11] transition-all duration-300 ease-in '><EllipsisVertical size={17}/></span>
                { menuStatus && <span  className='bg-white outline outline-[#a0a0a0] text-[13px] p-1 rounded-md w-[60%] flex-col gap-1 justify-start items-center absolute -right-4 top-6 flex '>
                    <div className='flex gap-1 items-center justify-center w-full p-1 rounded-sm hover:bg-gray-300 hover:cursor-pointer'>Delete</div>
                    <div className='flex gap-1 items-center justify-center w-full p-1 rounded-sm hover:bg-gray-300 hover:cursor-pointer '>Rename</div>
                </span>}

            </div>
            <div className='w-full h-[10vh] bg-white p-1 text-center leading-tight text-[13px]'>File Name file name file name file name </div>
      </div>

      <div className='h-[32vh] w-[14%] flex flex-col gap-2 p-1 overflow-visible'>
            <div className={`w-full h-[21vh] bg-[#ffffff] rounded-lg mb-1 flex items-center justify-center outline-2 outline-[#ffffff] overflow-visible px-3 py-4 transition-all duration-600 ease-int ${(!menuStatus && !mouseEnter) && "hover:cursor-pointer hover:bg-[#eeeeee] hover:outline-[#c2c2c2]"} relative`}>
                <div className='bg-amber-700 w-full h-full rounded-sm'></div>
                <span onMouseEnter={()=>setmouseEnter(true)}  onMouseLeave={()=>setmouseEnter(false)} onClick={()=>setmenuStatus(!menuStatus)} className='absolute -top-2 -right-2 rounded-full bg-white outline outline-[#000000] p-1 hover:cursor-pointer hover:scale-[1.11] transition-all duration-300 ease-in '><EllipsisVertical size={17}/></span>
                { menuStatus && <span  className='bg-white outline outline-[#a0a0a0] text-[13px] p-1 rounded-md w-[60%] flex-col gap-1 justify-start items-center absolute -right-4 top-6 flex '>
                    <div className='flex gap-1 items-center justify-center w-full p-1 rounded-sm hover:bg-gray-300 hover:cursor-pointer'>Delete</div>
                    <div className='flex gap-1 items-center justify-center w-full p-1 rounded-sm hover:bg-gray-300 hover:cursor-pointer '>Rename</div>
                </span>}

            </div>
            <div className='w-full h-[10vh] bg-white p-1 text-center leading-tight text-[13px]'>File Name file name file name file name </div>
      </div>

      <div className='h-[32vh] w-[14%] flex flex-col gap-2 p-1 overflow-visible'>
            <div className={`w-full h-[21vh] bg-[#ffffff] rounded-lg mb-1 flex items-center justify-center outline-2 outline-[#ffffff] overflow-visible px-3 py-4 transition-all duration-600 ease-int ${(!menuStatus && !mouseEnter) && "hover:cursor-pointer hover:bg-[#eeeeee] hover:outline-[#c2c2c2]"} relative`}>
                <div className='bg-amber-700 w-full h-[10vh] rounded-sm'></div>
                <span onMouseEnter={()=>setmouseEnter(true)}  onMouseLeave={()=>setmouseEnter(false)} onClick={()=>setmenuStatus(!menuStatus)} className='absolute -top-2 -right-2 rounded-full bg-white outline outline-[#000000] p-1 hover:cursor-pointer hover:scale-[1.11] transition-all duration-300 ease-in '><EllipsisVertical size={17}/></span>
                { menuStatus && <span  className='bg-white outline outline-[#a0a0a0] text-[13px] p-1 rounded-md w-[60%] flex-col gap-1 justify-start items-center absolute -right-4 top-6 flex '>
                    <div className='flex gap-1 items-center justify-center w-full p-1 rounded-sm hover:bg-gray-300 hover:cursor-pointer'>Delete</div>
                    <div className='flex gap-1 items-center justify-center w-full p-1 rounded-sm hover:bg-gray-300 hover:cursor-pointer '>Rename</div>
                </span>}

            </div>
            <div className='w-full h-[10vh] bg-white p-1 text-center leading-tight text-[13px]'>File Name file name file name file name </div>
      </div>

    </div>
  )
}

export default ImagesGallery