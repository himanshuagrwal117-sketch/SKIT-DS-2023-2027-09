import React, { useState } from 'react'
import ImagesGallery from './ImagesGallery'
import VideoGallery from './videoGallery'
import AllContentGallery from './allContentGallery'
import {Video, Images,GalleryVerticalEnd} from 'lucide-react'

const Gallery = () => {
  const [galleryOption, setgalleryOption] = useState('all content')
    
  return (
    <div className='bg-white h-full w-full gap-6 flex flex-col'>
        <div className='flex justify-start items-center gap-4'>

            <button onClick={()=> setgalleryOption('all content')} className={`group outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#8e2020] ${galleryOption==='all content'? "text-[#ffffff] bg-[#8e2020]" : "text-[#000000] bg-[#ffffff]"} transition-all hover:cursor-pointer duration-100s ease-in hover:text-[#ffffff] flex justify-center items-center gap-2`}><GalleryVerticalEnd size={17}  className={`group-hover:text-[#ffffff] transition-all duration-100 ease-in ${galleryOption==='all content'? "text-[#ffffff]" : "text-[#8e2020]"}`}/>Event Wise</button>
            <button onClick={()=> setgalleryOption('images')}  className={`group outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#8e2020] ${galleryOption==='images'? "text-[#ffffff] bg-[#8e2020]" : "text-[#000000] bg-[#ffffff]"} transition-all hover:cursor-pointer duration-100s ease-in hover:text-[#ffffff] flex justify-center items-center gap-2`}><Images size={17}  className={`group-hover:text-[#ffffff] transition-all duration-100 ease-in ${galleryOption==='images'? "text-[#ffffff]" : "text-[#8e2020]"}`}/>Images</button>
            <button onClick={()=> setgalleryOption('videos')}  className={`group outline text-[15px] outline-[#8e2020] py-2 px-4 rounded-md hover:bg-[#8e2020] ${galleryOption==='videos'? "text-[#ffffff] bg-[#8e2020]" : "text-[#000000] bg-[#ffffff]"} transition-all hover:cursor-pointer duration-100s ease-in hover:text-[#ffffff] flex justify-center items-center gap-2`}><Video size={17} className={`group-hover:text-[#ffffff] transition-all duration-100 ease-in ${galleryOption==='videos'? "text-[#ffffff]" : "text-[#8e2020]"}`}/>Videos</button>
            
        </div>
        <div className='w-full h-full '>
          { galleryOption==='all content' && <AllContentGallery/> }
          { galleryOption==='images' && <ImagesGallery/> }
          { galleryOption==='videos' && <VideoGallery/> } 
        </div>
        
    </div>
  )
}

export default Gallery