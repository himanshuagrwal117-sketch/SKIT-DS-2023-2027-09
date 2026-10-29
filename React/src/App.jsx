import React, { useEffect, useState } from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =====================================================
// EXISTING PAGE IMPORTS
// =====================================================

import LaunchPage from "./assets/components/LaunchPage";

import { StudentPage } from "./assets/components/StudentPage";

import AboutUsJoinSphere from "./assets/components/Student_page/AboutUsPage/AboutUsPage";

import AboutUsHome from "./assets/components/AboutUsHome/AboutUsHome";

import StartNewClub from "./assets/components/Student_page/StartNewClub/StartNewClub";

import HelpPage from "./assets/components/Student_page/HelpPage/HelpPage";

import ClubDashboardPage from "./assets/components/ClubDashboard/ClubDashboardPage";

import StudentProfileDashboard from "./assets/components/Student_page/StudentProfileDashboard/StudentProfileDashboard";

// =====================================================
// ECA ADMIN IMPORTS
// =====================================================

import ECALogin from "./assets/components/ECADashboardPage/ECALogin";

import ECADashboardPage from "./assets/components/ECADashboardPage/ECADashboardPage";

// =====================================================
// API CONFIGURATION
// =====================================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

// =====================================================
// LOADING SCREEN
// =====================================================

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">

        <div className="w-10 h-10 border-4 border-[#900505] border-t-transparent rounded-full animate-spin" />

        <p className="text-gray-600 text-sm">
          Verifying your Orbix session...
        </p>

      </div>
    </div>
  );
};

// =====================================================
// PROTECTED ROUTE
// STUDENT / CLUB / ECA ADMIN
// =====================================================

const ProtectedRoute = ({ children, allowedRole }) => {
  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);

  const [role, setRole] = useState(null);

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      try {
        // ============================================
        // SELECT AUTHENTICATION ENDPOINT
        // ============================================

        let endpoint = "/auth/me";

        if (allowedRole === "club") {
          endpoint = "/auth/club/me";
        } else if (allowedRole === "eca_admin") {
          endpoint = "/auth/eca/me";
        }

        // ============================================
        // VERIFY USER SESSION
        // ============================================

        const response = await fetch(
          `${API_URL}${endpoint}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Session verification failed");
        }

        const data = await response.json();

        if (!active) return;

        setAuthenticated(data.authenticated === true);

        setRole(data.role || null);

      } catch (error) {
        if (!active) return;

        console.error(
          "Orbix session verification failed:",
          error
        );

        setAuthenticated(false);

        setRole(null);

      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    verifySession();

    return () => {
      active = false;
    };

  }, [allowedRole]);

  // ============================================
  // SHOW LOADING SCREEN
  // ============================================

  if (loading) {
    return <LoadingScreen />;
  }

  // ============================================
  // UNAUTHENTICATED USER
  // ============================================

  if (!authenticated) {
    if (allowedRole === "eca_admin") {
      return (
        <Navigate
          to="/eca/login"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ============================================
  // INCORRECT USER ROLE
  // ============================================

  if (role !== allowedRole) {

    if (role === "eca_admin") {
      return (
        <Navigate
          to="/eca/dashboard"
          replace
        />
      );
    }

    if (role === "club") {
      return (
        <Navigate
          to="/ClubDashboard"
          replace
        />
      );
    }

    if (role === "student") {
      return (
        <Navigate
          to="/studentpage"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ============================================
  // AUTHORIZED USER
  // ============================================

  return children;
};

// =====================================================
// MAIN APP
// =====================================================

const App = () => {
  return (
    <div className="min-h-screen">

      <Routes>

        {/* ============================================
            HOME / LAUNCH PAGE
        ============================================ */}

        <Route
          path="/"
          element={<LaunchPage />}
        />

        {/* ============================================
            STUDENT PAGE
        ============================================ */}

        <Route
          path="/studentpage"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentPage />
            </ProtectedRoute>
          }
        />

        {/* ============================================
            STUDENT PROFILE DASHBOARD
        ============================================ */}

        <Route
          path="/student-profile"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentProfileDashboard />
            </ProtectedRoute>
          }
        />

        {/* ============================================
            ABOUT US
        ============================================ */}

        <Route
          path="/aboutus"
          element={<AboutUsHome />}
        />

        {/* ============================================
            START NEW CLUB
        ============================================ */}

        <Route
          path="/start-club"
          element={<StartNewClub />}
        />

        {/* ============================================
            HELP PAGE
        ============================================ */}

        <Route
          path="/help"
          element={<HelpPage />}
        />

        {/* ============================================
            CLUB DASHBOARD
        ============================================ */}

        <Route
          path="/ClubDashboard"
          element={
            <ProtectedRoute allowedRole="club">
              <ClubDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ============================================
            JOINSPHERE ABOUT PAGE
        ============================================ */}

        <Route
          path="/aboutusJoinSphere"
          element={<AboutUsJoinSphere />}
        />

        {/* ============================================
            ECA ADMIN LOGIN
            PRIVATE URL - NOT SHOWN ON LAUNCH PAGE
        ============================================ */}

        <Route
          path="/eca/login"
          element={<ECALogin />}
        />

        {/* ============================================
            ECA ADMIN DASHBOARD
            PROTECTED - ECA ADMIN ONLY
        ============================================ */}

        <Route
          path="/eca/dashboard"
          element={
            <ProtectedRoute allowedRole="eca_admin">
              <ECADashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ============================================
            FALLBACK ROUTE
        ============================================ */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </div>
  );
};

export default App;