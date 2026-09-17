import React from 'react'

const NewClubFacultyForm = () => {
  return (
    <div>
        <div className='bg-white h-[135vh] w-full rounded-lg overflow-hidden flex gap-6 items-center p-5 '>

          <div className='w-[35%] h-full overflow-hidden rounded-2xl'>
            <img className='w-full h-full object-cover' src="./images/newclub.jpeg"/>
          </div>

          <div className='w-[65%] h-full flex flex-col items-center'>
            <div className='text-[40px] text-[#910202] font-medium mb-6'>Fill Information for the New Club</div>
            <div className='w-full outline outline-[#b6b6b6] p-4 rounded-2xl h-full'>
            
                <form class="space-y-6">

                
                  <div>
                    <label className="block text-lg font-semibold text-[#910202]">Club Name</label>
                    <input type="text" placeholder="Enter club name"
                      className="mt-1 w-full px-4 py-2 border border-[#575757] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>

                
                  <div>
                    <label  className="block text-lg font-semibold text-[#910202]">Club Category</label>
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
                    <label  className="block text-lg font-semibold text-[#910202]">Club Description</label>
                    <textarea rows="4" placeholder="Describe the purpose of the club"
                      class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                  </div>

                  <div>
                    <label  className="block text-lg font-semibold text-[#910202]">Club Main Focus</label>
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

                
                  <div class="grid md:grid-cols-2 gap-4">
                    <div>
                      <label  className="block text-lg font-semibold text-[#910202]">Student Coordinator Name</label>
                      <input type="text" placeholder="Enter name"
                        class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label  className="block text-lg font-semibold text-[#910202]">Contact Email</label>
                      <input type="email" placeholder="Enter email"
                        class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                  </div>

                
                  <div>
                    <label  className="block text-lg font-semibold text-[#910202]">Faculty Mentor Name</label>
                    <input type="text" placeholder="Enter faculty mentor name"
                      class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>

                
                  <div>
                    <label  className="block text-lg font-semibold text-[#910202]">Expected Number of Members</label>
                    <input type="number" placeholder="Enter expected members"
                      className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>

                  
                  <div>
                    <label  className="block text-lg font-semibold text-[#910202]">Upload Proposal Document</label>
                    <input type="file"
                      class="mt-1 w-full text-gray-700" />
                  </div>

                
                  <div>
                    <button type="submit"
                      class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                      Submit Club Proposal
                    </button>
                  </div>

                </form>
            
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default NewClubFacultyForm