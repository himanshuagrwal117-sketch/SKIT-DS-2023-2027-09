import {MoveUpRight} from 'lucide-react'

const PopBlockDivs = ({serial,key,name,info,image,link}) => {
  return (
    <div className='w-full h-[32vh] rounded-2xl outline-1 shadow-md outline-[#cfcfcf] p-3 flex gap-3 items-center'>
                <div className='text-[17px]'>{serial}</div>
                <div className='h-[26vh] w-[17%] rounded-2xl overflow-hidden '><img className='h-full w-full object-cover' src={image}/></div>
                <div className='h-full w-full justify-start flex flex-col'>
                  <div className='h-[21vh]'>
                    <h1 className='text-[25px] mb-1 font-semibold '>{name}</h1>
                    <p className='text-[13px] font-normal '>{info}</p>
                  </div>
                    
                  <div className='flex gap-2 items-center justify-center '><button onClick={() => window.open(link,"_blank")} className='pl-4 flex justify-center items-center gap-3 w-full font-bold pr-4 pt-2 pb-2 rounded-lg bg-amber-300 text-[13px] hover:cursor-pointer hover:scale-[1.01] hover:bg-amber-400 transition-all ease-out duration-300'>More Information<MoveUpRight size={17} /></button></div>
                </div>
                

    </div>
  )
}

export default PopBlockDivs