import React from 'react'

const NewClubInfoForm = () => {
  return (
    <div className='w-full flex items-center flex-col'>
        <div className='bg-white h-[70vh] w-[80%] rounded-lg overflow-hidden flex gap-6 items-center p-5 '>

          <div className='w-[35%] h-full overflow-hidden rounded-2xl'>
            <img className='w-full h-full object-cover' src="./images/newclub.jpeg"/>
          </div>

          <div className='w-[65%] h-full flex flex-col items-center'>
            <div className='text-[30px] text-[#910202] font-medium mb-3'>Fill Information for the New Club</div>
            <div className='w-full outline outline-[#b6b6b6] p-4 rounded-2xl h-full'>
            
                <form class="space-y-4">

                
                  <div>
                    <label className="block text-md font-semibold text-[#910202]">Club Name</label>
                    <input type="text" placeholder="Enter Club Name"
                      className="mt-1 w-full px-4 py-2 border border-[#575757] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>

                
                  <div>
                    <label  className="block text-md font-semibold text-[#910202]">Club Category</label>
                    <select class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Technical</option>
                      <option>Non-Techanicl</option>
                      <option>Cultural</option>
                      <option>Literary</option>
                      <option>Social</option>
                      <option>Artistic</option>
                    </select>
                  </div>

                
                  <div>
                    <label  className="block text-md font-semibold text-[#910202]">Club Description</label>
                    <textarea rows="4" placeholder="Describe the purpose of the club"
                      class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                  </div>

                  <div>
                    <label  className="block text-md font-semibold text-[#910202]">Club Main Focus</label>
                    <select class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Gaming</option>
                      <option>Painting & Fine Arts</option>
                      <option>Dance</option>
                      <option>Music</option>
                      <option>Photography</option>
                      <option>Graphic Designing</option>
                      <option>Coding / Programming</option>
                      <option>AI & Machine Learning</option>
                      <option>Robotics</option>
                      <option>Entrepreneurship</option>
                      <option>Social Service</option>
                      <option>Environmental Awareness</option>
                      <option>Sports & Fitness</option>
                      <option>Public Speaking</option>
                      <option>Film Making</option>
                      <option>Book Club</option>
                      <option>Anime & Manga</option>
                    </select>
                  </div>

                  

                </form>
            
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default NewClubInfoForm