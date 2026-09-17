import React, { useState } from 'react'
import PopupScreen from './PopupScreen'


const Cardblock = () => {
    const [FlagForPop, setFlagForPop] = useState(false)
    const [Category, setCategory] = useState("")
    
  return (
    
    <div class="flex flex-col justify-around h-360 mt-4 ">
        <div className="h-61 w-full flex justify-between py-2 px-6 rounded-2xl bg-linear-to-l from-[#b94c47] to-[#931913] relative overflow-visible">
            <div className="w-[27%] absolute bottom-0 left-6 h-[140%]"><img className="h-full w-full object-contain" src="./images/g1.png" /></div>

            <div className="w-[68%] h-full text-white text-left ml-[30%]">
                <h1 className="text-[60px] font-medium font-rubik">Cultural Clubs</h1>
                <p>
                Cultural Clubs celebrate diversity, traditions, and creative expression.
                They promote music, dance, drama, and cultural heritage through events and performances.
                Students get a chance to showcase talent and learn teamwork.
                These clubs create vibrant campus life and joyful memories.</p>
                 <button onClick={()=>{setFlagForPop(true); setCategory("Cultural");}} className="pl-4 pr-4 pb-1 pt-1 bg-[#ffcd42] text-black font-medium rounded-2xl mt-4 hover:cursor-pointer hover:bg-white hover:scale-[1.03] transition-all duration-300">View All Cultural Clubs</button>
            </div>
        </div>
        
       <div className="h-61 w-full flex justify-between py-2 px-6 rounded-2xl bg-linear-to-l from-[#b94c47] to-[#931913] relative overflow-visible">
            
             <div className="w-[68%] h-full text-white text-right mr-[30%]">
                <h1 class='text-[60px] font-medium font-rubik'>Technical Clubs </h1>
                <p>Technical Clubs encourage innovation, problem-solving, and hands-on learning beyond the classroom.
                   They provide a platform to explore coding, robotics, electronics, and emerging technologies.
                    Members work on real-world projects, competitions, and workshops.
                    These clubs help build strong technical skills and industry readiness.</p>
                    <button onClick={()=>{setFlagForPop(true); setCategory("Tech");}} className='pl-4 pr-4 pb-1 pt-1 bg-[#ffcd42] text-[#000000] font-medium rounded-2xl mt-4 hover:cursor-pointer hover:bg-[#fdfdfd] hover:scale-[1.03] duration-600 transition-all'>View All Technical Clubs</button>
            </div>
            <div className="w-[27%] absolute -bottom-3 right-6 h-[140%]"><img className="h-full w-full object-contain" src="./images/technical.png"/></div>
        </div>

        <div className="h-61 w-full flex justify-between py-2 px-6 rounded-2xl bg-linear-to-l from-[#b94c47] to-[#931913] relative overflow-visible">
             <div className="w-[27%] absolute -bottom-3 left-6 h-[140%]"><img className="h-full w-full object-contain" src="./images/social.png"/></div>
             <div className="w-[68%] h-full text-white text-left ml-[30%]">
                <h1 class='text-[60px] font-medium font-rubik'>Social Clubs</h1>
                <p>Social Clubs focus on community service, leadership, and social responsibility.
                    They organize awareness drives, campaigns, and outreach programs.
                    Members work together to create positive change in society.
                    These clubs develop empathy, teamwork, and leadership qualities.</p>
                <button onClick={()=>{setFlagForPop(true); setCategory("Social");}} className='pl-4 pr-4 pb-1 pt-1 bg-[#ffcd42] text-[#000000] font-medium rounded-2xl mt-4 hover:cursor-pointer hover:bg-[#fdfdfd] hover:scale-[1.03] duration-600 transition-all'>View All Social Clubs</button>
            </div>
        </div>

        <div className="h-61 w-full flex justify-between py-2 px-6 rounded-2xl bg-linear-to-l from-[#b94c47] to-[#931913] relative overflow-visible">
            
             <div className="w-[68%] h-full text-white text-right mr-[30%]">
                <h1 class='text-[60px] font-medium font-rubik'>Artistic Clubs</h1>
                <p>Artistic Clubs encourage creativity through art, design, and visual expression.
                        They provide opportunities to explore drawing, painting, crafts, and digital art.
                        Members enhance imagination and aesthetic sense.
                        These clubs turn ideas into meaningful and expressive creations.</p>
                <button onClick={()=>{setFlagForPop(true); setCategory("Artistic");}} className='pl-4 pr-4 pb-1 pt-1 bg-[#ffcd42] text-[#000000] font-medium rounded-2xl mt-4 hover:cursor-pointer hover:bg-[#fdfdfd] hover:scale-[1.03] duration-600 transition-all'>View All Artistic Clubs</button>
            </div>
             <div className="w-[27%] absolute bottom-0 right-6 h-[140%]"><img className="h-full w-full object-contain" src="./images/artistic.png"/></div>
        </div> 

          <div className="h-61 w-full flex justify-between py-2 px-6 rounded-2xl bg-linear-to-l from-[#b94c47] to-[#931913] relative overflow-visible">
             <div className="w-[27%] absolute -bottom-7 left-6 h-[140%]"><img className="h-full w-full object-contain" src="./images/literary.png"/></div>
             <div className="w-[68%] h-full text-white text-left ml-[30%]">
                <h1 class='text-[60px] font-medium font-rubik'>Literary Clubs</h1>
                <p>Literary Clubs nurture a love for language, literature, and creative writing.
                        They provide a space for debates, poetry, storytelling, and discussions.
                        Members enhance communication, critical thinking, and expression skills.
                        These clubs inspire ideas, creativity, and intellectual growth.</p>
                <button onClick={()=>{setFlagForPop(true); setCategory("Literary");}} className='pl-4 pr-4 pb-1 pt-1 bg-[#ffcd42] text-[#000000] font-medium rounded-2xl mt-4 hover:cursor-pointer hover:bg-[#fdfdfd] hover:scale-[1.03] duration-600 transition-all'>View All Literary Clubs</button>
             </div>   
        </div>
        {FlagForPop && <PopupScreen onClose={()=>setFlagForPop(false)} category={Category}/>}
    </div>
  ) 
  
}   
export   default   Cardblock;   