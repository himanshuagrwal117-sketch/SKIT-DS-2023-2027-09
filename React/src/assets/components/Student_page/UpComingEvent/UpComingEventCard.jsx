import {Phone} from 'lucide-react'


const UpCmingEventCard = () => {
  return (
    <div className='h-full min-w-[49%] rounded-2xl outline-1 shadow-sm  outline-[#d3d3d3] bg-white flex gap-4 p-3 '>
      <div className='bg-amber-200 rounded-2xl w-[47%] h-full overflow-hidden'><img  className='h-full w-full object-cover' src='./images/try.jpg'/></div>
      <div className='w-full flex flex-col h-full m-0'>
        <div className='w-full flex mb-2 flex-col'>
          <p className='text-[31px] font-semibold text-[#9b1e1e] leading-tight'>Event name</p>
          <p className='text-[11px] font-medium text-[#000000] leading-tight'>by CodeFiesta</p>
        </div>
        <div className='text-[11px] w-full flex items-center justify-start mb-5'>
          <div className='bg-[#efefef] outline-1 outline-[#000000]  rounded-2xl h-[3vh] pb-1 pt-1 pl-3 pr-3 font-normal text-[#000000]'> Certificates to All</div>
          <div className='ml-2 bg-[#efefef] outline-1 outline-[#000000] rounded-2xl h-[3vh] pb-1 pt-1 pl-3 pr-3 font-normal text-[#000000]'>Trophies to Winners</div>
          <div className='ml-2  outline-1 outline-[#000000]  bg-amber-300 rounded-2xl h-[3vh] pb-1 pt-1 pl-3 pr-3 font-normal text-[#000000]'>+5 Points</div>
          <div className='ml-2 bg-[#4bf0f6] outline-1 outline-[#000000]  rounded-2xl h-[3vh] pb-1 pt-1 pl-3 pr-3 font-normal text-[#000000]'>Technical</div></div>
        <div className='text-[13px] mb-1'>
          <p className='font-bold text-[#9b1e1e]'>Venue:&nbsp;&nbsp;<span className='font-normal text-[#000000]'>Civil Front</span></p>
          <p className='font-bold text-[#9b1e1e]'>Date:&nbsp;&nbsp;<span className='font-normal text-[#000000]'>9th Feb 2026</span></p>
          <p className=' font-bold mb-3 text-[#9b1e1e]'>Time:&nbsp;&nbsp;<span className='font-normal text-[#000000]'>11:00 am onwards</span></p>
        </div>
        
        
        <p className='text-[13px] font-bold text-[#9b1e1e] mb-1'>Corrdinator info: </p>
        <div className='w-full flex items-start h-full text-[12px]'>

          <div className='w-full'> 
            <p className='font-semibold'>Faculty Coordinator:<br/></p>
            <div className='w-full flex items-center gap-3 mt-1'><button className='bg-[#212121] rounded-full text-[#ffffff] p-1 hover:scale-[1.05] cursor-pointer'><Phone size={10} /></button><span className='font-normal'>xyz</span><br/></div>
                        <div className='w-full flex items-center gap-3 mt-1'><button className='bg-[#212121] rounded-full text-[#ffffff] p-1 hover:scale-[1.05] cursor-pointer'><Phone size={10} /></button><span className='font-normal'>xyz</span><br/></div>

          </div>

          <div className='w-full h-full'> 
            <p className='font-semibold'>Student Coordinators: <br/></p>
            <div className='w-full flex items-center gap-3 mt-1'><button className='bg-[#212121] rounded-full text-[#ffffff] p-1 hover:scale-[1.05] cursor-pointer'><Phone size={10} /></button><span className='font-normal'>Himanshu Agrawal</span><br/></div>
            <div className='w-full flex items-center gap-3 mt-1'><button className='bg-[#212121] rounded-full text-[#ffffff] p-1 hover:scale-[1.05] cursor-pointer'><Phone size={10} /></button><span className='font-normal'>Himanshu Agrawal</span><br/></div>
            <div className='w-full flex items-center gap-3 mt-1'><button className='bg-[#212121] rounded-full text-[#ffffff] p-1 hover:scale-[1.05] cursor-pointer'><Phone size={10} /></button><span className='font-normal'>Himanshu Agrawal</span><br/></div>
            <div className='w-full flex items-center gap-3 mt-1'><button className='bg-[#212121] rounded-full text-[#ffffff] p-1 hover:scale-[1.05] cursor-pointer'><Phone size={10} /></button><span className='font-normal'>Himanshu Agrawal</span><br/></div>
          </div>

        
          
        </div>
          <div className='w-full flex items-center justify-center'><button className='bg-[#9b1e1e] w-full text-[13px] text-[#ffffff] rounded-2xl pl-5 pr-5 pt-2 pb-2 cursor-pointer ease-in-out duration-300 transition-all hover:scale-[1.02]'>Register</button></div>



      </div>
    </div> 
  )
}

export default UpCmingEventCard