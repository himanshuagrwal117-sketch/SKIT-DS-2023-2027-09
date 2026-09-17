import React from 'react'
import {EllipsisVertical } from 'lucide-react'

const ImportantDocuments = () => {
  return (
    <div className='w-full h-full flex-wrap flex overflow-y-auto gap-x-7 gap-y-3 p-2'>
      <div className='h-[32vh] w-[14%] flex flex-col gap-2 p-1 overflow-visible'>
            <div className='w-full h-[21vh] bg-[#fbc8c6] rounded-lg mb-1 flex items-center justify-center outline-2 outline-[#df1f01] overflow-visible transition-all duration-600 ease-int hover:cursor-pointer hover:bg-[#ffffff] relative'>
                <img src='./images/57.png' className='h-full w-ful object-cover'/>
                <span className='absolute -top-2 -right-2 rounded-full bg-white outline outline-[#000000] p-1 hover:cursor-pointer hover:scale-[1.11] transition-all duration-300 ease-in'><EllipsisVertical size={17}/></span>
            </div>
            <div className='w-full h-[10vh] bg-white p-1 text-center leading-tight text-[13px]'>File Name.pdf</div>
      </div>

      <div className='h-[32vh] w-[14%] flex flex-col gap-2 p-1 overflow-visible'>
            <div className='w-full h-[21vh] bg-[#c6dafb] rounded-lg mb-1 flex items-center justify-center outline-2 outline-[#014fdf] overflow-visible transition-all duration-600 ease-int hover:cursor-pointer hover:bg-[#ffffff] relative'>
                <img src='./images/58.png' className='h-full w-ful object-cover'/>
                <span className='absolute -top-2 -right-2 rounded-full bg-white outline outline-[#000000] p-1 hover:cursor-pointer hover:scale-[1.11] transition-all duration-300 ease-in'><EllipsisVertical size={17}/></span>
            </div>
            <div className='w-full h-[10vh] bg-white p-1 text-center leading-tight text-[13px]'>File Name.word</div>
      </div>

      <div className='h-[32vh] w-[14%] flex flex-col gap-2 p-1 overflow-visible'>
            <div className='w-full h-[21vh] bg-[#fbe1c6] rounded-lg mb-1 flex items-center justify-center outline-2 outline-[#df7f01] overflow-visible transition-all duration-600 ease-int hover:cursor-pointer hover:bg-[#ffffff] relative'>
                <img src='./images/59.png' className='h-full w-ful object-cover'/>
                <span className='absolute -top-2 -right-2 rounded-full bg-white outline outline-[#000000] p-1 hover:cursor-pointer hover:scale-[1.11] transition-all duration-300 ease-in'><EllipsisVertical size={17}/></span>
            </div>
            <div className='w-full h-[10vh] bg-white p-1 text-center leading-tight text-[13px]'>File Name.png</div>
      </div>

      <div className='h-[32vh] w-[14%] flex flex-col gap-2 p-1 overflow-visible'>
            <div className='w-full h-[21vh] bg-[#c6fbca] rounded-lg mb-1 flex items-center justify-center outline-2 outline-[#028f06] overflow-visible transition-all duration-600 ease-int hover:cursor-pointer hover:bg-[#ffffff] relative'>
                <img src='./images/60.png' className='h-full w-ful object-cover'/>
                <span className='absolute -top-2 -right-2 rounded-full bg-white outline outline-[#000000] p-1 hover:cursor-pointer hover:scale-[1.11] transition-all duration-300 ease-in'><EllipsisVertical size={17}/></span>
            </div>
            <div className='w-full h-[10vh] bg-white p-1 text-center leading-tight text-[13px]'>File Name.excel</div>
      </div>


      <div className='h-[32vh] w-[14%] flex flex-col gap-2 p-1 overflow-visible'>
            <div className='w-full h-[21vh] bg-amber-200 rounded-lg mb-1 flex items-center justify-center outline-2 outline-[#dfa301] overflow-visible transition-all duration-600 ease-int hover:cursor-pointer hover:bg-[#ffffff] relative'>
                <img src='./images/folder.png' className='  h-full w-ful object-cover'/>
                <span className='absolute -top-2 -right-2 rounded-full bg-white outline outline-[#000000] p-1 hover:cursor-pointer hover:scale-[1.11] transition-all duration-300 ease-in'><EllipsisVertical size={17}/></span>
            </div>
            <div className='w-full h-[10vh] bg-white p-1 text-center leading-tight text-[13px]'>File Name</div>
      </div>
    </div>
  )
}

export default ImportantDocuments