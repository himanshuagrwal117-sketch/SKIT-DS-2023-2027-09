import React from 'react'
import Header2 from '../../Header2/Header2'
import NewClubInfoForm from './NewClubInfoForm'


const StartNewClub = () => {
  return (
    <div>
      <Header2/>


      <div className='h-[80vh] w-full p-5 flex flex-col justify-start items-center gap-4 absolute mt-23'>
        <div className=' w-[85%] h-[10vh] flex justify-center gap-14 align-middle mb-3'>

          <div className='h-full w-[21%] bg-white rounded-full flex gap-3 p-2'>
            <div className='w-[27%] overflow-hidden border-[#983530] border-2 rounded-full '><img className='w-full h-full object-cover' src='../images/p1.png'/></div>
            <div className='text-[14px] w-[69%] h-full flex items-center text-[#983530] font-semibold leading-tight'>Club Information</div>
          </div>
          
           <div className='h-full outline outline-[#ffffff] w-[21%] rounded-full flex gap-3 p-2'>
            <div className='w-[27%] overflow-hidden border-[#983530] border-2 rounded-full '><img className='w-full h-full object-cover' src='../images/p2.png'/></div>
            <div className='text-[14px] w-[69%] h-full flex items-center text-[#ffffff] font-semibold leading-tight'>Student Coordinators Information</div>
          </div>
           <div className='h-full outline outline-[#ffffff] w-[21%] rounded-full flex gap-3 p-2'>
            <div className='w-[27%] overflow-hidden border-[#983530] border-2 rounded-full '><img className='w-full h-full object-cover' src='../images/p3.png'/></div>
            <div className='text-[14px] w-[69%] h-full flex items-center text-[#ffffff] font-semibold leading-tight'>Faculty Coordinators Information</div>
          </div>

        </div>
        <NewClubInfoForm/>
      </div>






    </div>
  )
}

export default StartNewClub