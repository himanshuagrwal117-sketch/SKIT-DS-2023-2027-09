import React from 'react'

const NewClubStudentForm = () => {
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


                </form>
            
            </div>
          </div>
          
        </div>
        
        </div>
  )
}

export default NewClubStudentForm