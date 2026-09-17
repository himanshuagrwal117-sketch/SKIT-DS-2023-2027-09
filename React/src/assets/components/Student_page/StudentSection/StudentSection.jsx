
import ActivityInfo from './ActivityInfo'
import StudentInfo from './StudentInfo'
import StudentPosition from './StudentPosition'

const StudentSection = () => {
  return (
    <div className='bg-white w-full h-[80vh] rounded-2xl gap-2 flex p-10'>
        <div className='w-[28%] h-full flex flex-col gap-4'>
            <StudentInfo/>
            <StudentPosition/>
        </div>
        <div className='w-[70%] h-full '>
             <ActivityInfo/>
        </div>
        
       
        
    </div>
  )
}

export default StudentSection