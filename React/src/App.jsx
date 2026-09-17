import React from 'react'

import {Routes,Route} from 'react-router-dom'
import LaunchPage from './assets/components/LaunchPage';
import { StudentPage } from './assets/components/StudentPage';
import AboutUsJoinSphere from './assets/components/Student_page/AboutUsPage/AboutUsPage';
import AboutUsHome from './assets/components/AboutUsHome/AboutUsHome';
import StartNewClub from './assets/components/Student_page/StartNewClub/StartNewClub';
import HelpPage from './assets/components/Student_page/HelpPage/HelpPage';
import ClubDashboardPage from './assets/components/ClubDashboard/ClubDashboardPage';


const App = () => {
  return (
    <div>
      <div class="100vh">
      
       <Routes>
        <Route path='/'element={<LaunchPage/>}/>
        <Route path='/studentpage' element={<StudentPage/>}/>
        <Route path='/aboutus' element={<AboutUsHome/>}/>
        <Route path='/startnewclub' element={<StartNewClub/>}/>
        <Route path='/help' element={<HelpPage/>}/>
        <Route path='/ClubDashboard' element={<ClubDashboardPage/>}/>

       
        <Route path='/aboutusJoinSphere' element={<AboutUsJoinSphere/>}/>
       </Routes>
  
      </div>
      
    </div>

  )
}

export default App