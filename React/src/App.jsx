import React from "react";
import { Routes, Route } from "react-router-dom";

import LaunchPage from "./assets/components/LaunchPage";
import { StudentPage } from "./assets/components/StudentPage";

import AboutUsJoinSphere from "./assets/components/Student_page/AboutUsPage/AboutUsPage";
import AboutUsHome from "./assets/components/AboutUsHome/AboutUsHome";

import StartNewClub from "./assets/components/Student_page/StartNewClub/StartNewClub";
import HelpPage from "./assets/components/Student_page/HelpPage/HelpPage";

import ClubDashboardPage from "./assets/components/ClubDashboard/ClubDashboardPage";
import StudentProfileDashboard from "./assets/components/Student_page/StudentProfileDashboard/StudentProfileDashboard";

const App = () => {
  return (
<<<<<<< HEAD
    <div>
      <div class="100vh">
      
       <Routes>
        <Route path='/'element={<LaunchPage/>}/>
        <Route path='/studentpage' element={<StudentPage/>}/>
        <Route path='/aboutus' element={<AboutUsHome/>}/>
        <Route path='/startnewclub' element={<StartNewClub/>}/>
        
        <Route path='/ClubDashboard' element={<ClubDashboardPage/>}/>
<Route path="/help" element={<HelpPage />} />
       
        <Route path='/aboutusJoinSphere' element={<AboutUsJoinSphere/>}/>
       </Routes>
  
      </div>
      
=======
    <div className="min-h-screen">
      <Routes>

        {/* ================= HOME / LAUNCH ================= */}
        <Route
          path="/"
          element={<LaunchPage />}
        />

        {/* ================= STUDENT PAGE ================= */}
        <Route
          path="/studentpage"
          element={<StudentPage />}
        />

        <Route
          path="/student-profile"
          element={<StudentProfileDashboard />}
        />

        {/* ================= ABOUT US ================= */}
        <Route
          path="/aboutus"
          element={<AboutUsHome />}
        />

        {/* ================= START NEW CLUB ================= */}
        <Route
          path="/start-club"
          element={<StartNewClub />}
        />

        {/* ================= HELP ================= */}
        <Route
          path="/help"
          element={<HelpPage />}
        />

        {/* ================= CLUB DASHBOARD ================= */}
        <Route
          path="/ClubDashboard"
          element={<ClubDashboardPage />}
        />

        {/* ================= JOINSPHERE ABOUT ================= */}
        <Route
          path="/aboutusJoinSphere"
          element={<AboutUsJoinSphere />}
        />

      </Routes>
>>>>>>> origin
    </div>
  );
};

export default App;