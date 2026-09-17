import React from 'react'
import Header2 from '../../Header2/Header2'


const AboutUsPage = () => {
  return (
    <div>
      <Header2/>
      <div className='h-[190vh] w-full p-4'>
        <div className='bg-white h-full w-full mt-24 rounded-lg p-12 flex'>
          
          <div className='font-normal text-[16px] text-[#3b3b3b] mt-2 w-[60%] flex flex-col items-start justify-start'>
            <div className='text-[45px] font-semibold text-[#983530] mb-10'>About the JoinSphere</div>
             <div className='font-semibold text-[30px] text-[#3b3b3b] '>Who We Are</div>
              <div>JoinSphere is the unified digital platform for student clubs and campus engagement at SKIT Jaipur. It is designed to bring all student communities, club activities, and participation opportunities together in one organized and accessible space. Instead of searching across multiple sources, students can discover everything related to campus clubs through a single hub.<br/>
              <br/>
            JoinSphere acts as a bridge between students and student organizations, making it easier to explore interests, connect with teams, and take part in meaningful extracurricular activities.</div>
            <div className='font-semibold text-[30px] text-[#3b3b3b] mt-10 '>Our Purpose</div>
            <div>Our purpose is to simplify and strengthen student involvement on campus. Many students want to join clubs or contribute to events but often miss opportunities due to scattered information or unclear processes. JoinSphere solves this by centralizing club data, event updates, and participation pathways.<br/><br/>We aim to create an environment where every student can easily find where they belong and how they can contribute.</div>

            <div className='font-semibold text-[30px] text-[#3b3b3b] mt-10 '>What JoinSphere Offers</div>
            <div>
              <ul className='list-disc leading-relax'>
                Students can explore all registered student clubs at SKIT Jaipur in one place. Each club profile includes:
                <li>Club overview and mission</li>
                <li>Domains and focus areas</li>
                <li>Major achievements</li>
                <li>Past and ongoing activities</li>
                <li>Coordinator and core team details</li>
              </ul>
            </div>

            <div className='font-semibold text-[30px] text-[#3b3b3b] mt-10 '>Event & Activity Access</div>
            <div>
              <ul className='list-disc leading-relax'>
                JoinSphere provides visibility into:
                <li>Upcoming club events</li>
                <li>Workshops and competitions</li>
                <li>Technical and non-technical activities</li>
                <li>Recruitment drives</li>
                <li>Volunteer opportunities</li>
              </ul>
            </div>

            <div className='font-semibold text-[30px] text-[#3b3b3b] mt-10 '>Coordinator & Contact Transparency</div>
            <div>
              Each club section includes coordinator and leadership details so students know exactly whom to reach out to. This improves communication and reduces entry barriers for new members.
            </div>


            <div className=' w-full h-[10vh] mt-11 flex flex-col justify-around items-start'>
              <div className='text-[27px] text-[#9b1e1e] font-semibold'>Website Developer</div>
              <div className='text-[19px] text-[#000000] font-semibold'>Himanshu Agrawal</div>
              <div className='text-[11px] text-[#000000] font-medium'>+91 9887748272</div>
            </div>

          </div>
          <div className='w-[40%] h-[90vh] flex flex-col items-center justify-start gap-10'><img className='w-full h-full object-cover' src='./images/bg8.png'/>
          <img className='w-full h-full object-cover' src='./images/aboutimg2.png'/>
          </div>
          

        </div>
      </div>
    </div>
  )
}

export default AboutUsPage