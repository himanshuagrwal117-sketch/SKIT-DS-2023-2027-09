import {Link} from 'react-router-dom'

const MiddleButtons = ({scrollToAboutEvents,scrollToUpcomingEvents}) => {
  return (
    <div class=" flex h-full w-[62%]  items-center gap-4 justify-center text-white z-1 text-[13px] font-bold ">
            <Link to = '/studentpage' > <button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">Home</button></Link>

            <button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">SKIT Page</button>

            <Link to='/startnewclub'><button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">Start a New Club</button></Link>
             <Link to='/studentpage#about-clubs'>
              <button
                onClick={scrollToAboutEvents}
                class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all"
              >
                About Clubs
              </button>
             </Link>

            <Link to='/studentpage#upcoming-events'>
              <button
                onClick={scrollToUpcomingEvents}
                class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">
                Up Coming Events
              </button>
            </Link> 

            <Link to = '/aboutusJoinSphere' ><button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">About us</button></Link>

            <Link to='/help' ><button class="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all">Help</button></Link>

        </div>
  )
}

export default MiddleButtons