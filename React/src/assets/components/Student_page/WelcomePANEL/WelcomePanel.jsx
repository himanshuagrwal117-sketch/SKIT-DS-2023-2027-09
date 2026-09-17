import React from 'react'
import LeftPart from './LeftPart'
import RightPart from './RightPart'

const MainPanel1 = () => {
  return (
    <div className='w-full bg-white h-[80vh] mt-5 rounded-2xl overflow-hidden relative z-0'>

      <img src="./images/bg3.png" className='h-full w-full opacity-9 absolute object-cover z-1'/>

      <div className='w-full bg-transparent h-full flex justify-around rounded-2xl absolute overflow-hidden z-10'>
        <LeftPart/>
        <RightPart/>
      </div>
      
    </div>
  )
}

export default MainPanel1