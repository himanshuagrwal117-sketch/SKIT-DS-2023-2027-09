import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardCheck,
  CalendarDays,
  Building2,
  Users,
  CalendarRange,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

// ============================================
// ECA DASHBOARD COMPONENTS
// ============================================

import DashboardHome from "./Components/DashboardHome";
import EventApprovals from "./Components/EventApprovals";
import AllEvents from "./Components/AllEvents";
import ClubManagement from "./Components/ClubManagement";
import StudentManagement from "./Components/StudentManagement";
import EventCalendar from "./Components/EventCalendar";
import ECASettings from "./Components/ECASettings";

// ============================================
// API CONFIGURATION
// ============================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

// ============================================
// SIDEBAR OPTIONS
// ============================================

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "approvals",
    label: "Event Approvals",
    icon: ClipboardCheck,
  },
  {
    id: "events",
    label: "All Events",
    icon: CalendarDays,
  },
  {
    id: "clubs",
    label: "Club Management",
    icon: Building2,
  },
  {
    id: "students",
    label: "Student Management",
    icon: Users,
  },
  {
    id: "calendar",
    label: "Event Calendar",
    icon: CalendarRange,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

// ============================================
// MAIN ECA DASHBOARD
// ============================================

const ECADashboardPage = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // ============================================
  // HANDLE SIDEBAR NAVIGATION
  // ============================================

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setSidebarOpen(false);
  };

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      navigate("/eca/login", {
        replace: true,
      });
    } catch (error) {
      console.error("ECA logout error:", error);
      alert("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  // ============================================
  // RENDER SELECTED COMPONENT
  // ============================================

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardHome />;

      case "approvals":
        return <EventApprovals />;

      case "events":
        return <AllEvents />;

      case "clubs":
        return <ClubManagement />;

      case "students":
        return <StudentManagement />;

      case "calendar":
        return <EventCalendar />;

      case "settings":
        return <ECASettings />;

      default:
        return <DashboardHome />;
    }
  };

  const currentMenu =
    menuItems.find((item) => item.id === activeMenu) ||
    menuItems[0];

  // ============================================
  // UI
  // ============================================

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">

      {/* ============================================
          MOBILE SIDEBAR OVERLAY
      ============================================ */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ============================================
          LEFT SIDEBAR
      ============================================ */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[255px] flex-col
          border-r border-gray-200
          bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* BRANDING */}

        <div className="flex h-[85px] items-center justify-between border-b border-gray-100 px-6">

          <div>
            <h1 className="text-[27px] font-extrabold tracking-tight text-[#900505]">
              ORBIX
            </h1>

            <p className="mt-[-2px] text-[10px] font-semibold uppercase tracking-[2px] text-gray-400">
              ECA Administration
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* ADMIN BADGE */}

        <div className="mx-4 mt-5 flex items-center gap-3 rounded-xl border border-red-100 bg-[#FFF6F6] p-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#900505] text-white">
            <ShieldCheck size={21} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-gray-900">
              ECA Administrator
            </p>

            <p className="text-[11px] text-gray-500">
              Admin Access
            </p>
          </div>

        </div>

        {/* NAVIGATION */}

        <div className="mt-6 px-4">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
            Main Menu
          </p>

        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-6">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive = activeMenu === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMenuClick(item.id)}
                className={`
                  group flex w-full items-center justify-between
                  rounded-xl px-3.5 py-3
                  text-left text-[13px] font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#900505] font-semibold text-white shadow-sm"
                      : "text-gray-600 hover:bg-[#FFF3F3] hover:text-[#900505]"
                  }
                `}
              >

                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.3 : 1.9}
                  />

                  <span>{item.label}</span>
                </div>

                {isActive && (
                  <ChevronRight size={16} />
                )}

              </button>
            );
          })}

        </nav>

        {/* SIDEBAR FOOTER */}

        <div className="border-t border-gray-100 p-4">

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="
              flex w-full items-center gap-3
              rounded-xl px-3.5 py-3
              text-[13px] font-semibold
              text-red-600
              transition hover:bg-red-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <LogOut size={18} />

            {loggingOut ? "Logging out..." : "Logout"}
          </button>

          <p className="mt-3 text-center text-[10px] text-gray-400">
            Orbix © {new Date().getFullYear()} · SKIT Jaipur
          </p>

        </div>

      </aside>

      {/* ============================================
          RIGHT MAIN CONTENT
      ============================================ */}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:ml-[255px]">

        {/* TOP HEADER */}

        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-gray-200 bg-white px-5 lg:px-8">

          <div className="flex items-center gap-3">

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {currentMenu.label}
              </h2>

              <p className="mt-0.5 hidden text-[11px] text-gray-500 sm:block">
                Orbix / ECA Administration
              </p>
            </div>

          </div>

          {/* HEADER RIGHT */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-[12px] font-bold text-gray-800">
                ECA Admin
              </p>

              <p className="text-[10px] text-gray-500">
                SKIT Jaipur
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0F0] text-[#900505]">
              <ShieldCheck size={20} />
            </div>

          </div>

        </header>

        {/* DYNAMIC CONTENT AREA */}

        <main className="flex-1 p-5 lg:p-8">

          {renderContent()}

        </main>

      </div>

    </div>
  );
};

export default ECADashboardPage;