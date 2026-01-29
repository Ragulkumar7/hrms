import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";

// --- COMPONENT IMPORTS ---
import Sidebar from "./components/Sidebar";
import Accounts from "./components/Accounts";
import AdminDashboard from "./components/AdminDashboard";
import Attendance from "./components/Attendance";
import ITOperations from "./components/ITOperations";
import Employees from "./components/Employees";
import ManagerDashboard from "./components/ManagerDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import TaskManagement from "./components/TaskManagement";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import Sales from "./components/Sales";
import Recruitment from "./components/Recruitment";
import HRManagement from "./components/hrManagement";
import TeamLeadDashboard from "./components/TeamLead";
import SelfAssignedTask from "./components/SelfAssignedTask"; 
import Logout from './components/Logout';

import { Bell, Search, ChevronDown } from "lucide-react"; // Added ChevronDown for premium feel
import "./App.css";

// --- HEADER PROFILE (Updated Structure) ---
const HeaderProfile = () => {
  const { user } = useUser();
  return (
    <div className="profile-pill">
      <div className="avatar-gradient">
        {user.name.charAt(0)}
      </div>
      <div className="profile-text">
        <span className="p-name">{user.name}</span>
        <span className="p-role">{user.role}</span>
      </div>
      <ChevronDown size={14} className="p-chevron" />
    </div>
  );
};

// --- ROLE SWITCHER ---
const RoleSwitcher = () => {
  const { user, login } = useUser();
  return (
    <div
      style={{
        position: "fixed", bottom: "20px", right: "20px",
        background: "white", padding: "12px", borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)", border: "1px solid #E9D5FF", zIndex: 9999,
      }}
    >
      <p style={{ fontSize: "10px", fontWeight: "800", marginBottom: "8px", color: "#6D28D9", textTransform: "uppercase" }}>
        Current: {user.role}
      </p>
      <div style={{ display: "flex", gap: "6px" }}>
        {['Manager', 'TL', 'Employee'].map((role) => (
          <button
            key={role}
            onClick={() => login(role === 'TL' ? 'TL' : role, role === 'TL' ? 'TL-01' : undefined)}
            style={{
              fontSize: "10px", padding: "5px 10px", cursor: "pointer",
              border: "1px solid #DDD6FE", background: user.role === role ? "#6D28D9" : "#F5F3FF",
              color: user.role === role ? "white" : "#6D28D9", borderRadius: "6px", fontWeight: "700"
            }}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const { user } = useUser();
  if (user.role === "Employee") return <EmployeeDashboard />;
  if (user.role === "TL") return <TeamLeadDashboard allTasks={[]} setAllTasks={() => {}} addNewTask={() => {}} />;
  return <AdminDashboard />;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-wrapper">
          <Sidebar />

          <main className="main-content">
            
            {/* --- FIXED PREMIUM HEADER CSS --- */}
            <style>
              {`
                :root {
                  --header-height: 85px;
                  --accent-purple: #7C3AED;
                  --glass-border: rgba(124, 58, 237, 0.1);
                }

                /* Layout */
                .top-bar {
                  height: var(--header-height);
                  /* Premium Gradient Fade */
                  background: linear-gradient(to bottom, #ffffff, #fafafa);
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 0 40px;
                  position: sticky;
                  top: 0;
                  z-index: 40;
                  border-bottom: 1px solid #F3F4F6;
                }

                /* --- 1. SEARCH BOX FIX --- */
                .search-container { flex: 1; }
                
                .search-wrapper {
                  position: relative;
                  width: 380px;
                }

                .search-box {
                  display: flex;
                  align-items: center; /* Crucial for vertical center */
                  height: 46px;        /* Fixed height prevents jumping */
                  background: #ffffff;
                  border: 1px solid #E5E7EB;
                  border-radius: 12px;
                  padding: 0 16px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.02); /* Soft shadow */
                  transition: all 0.3s ease;
                  gap: 12px;
                }

                /* Hover/Focus State */
                .search-box:focus-within {
                  border-color: var(--accent-purple);
                  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.15); /* Purple Glow */
                  transform: translateY(-1px);
                }

                .search-icon {
                  color: #9CA3AF;
                  min-width: 20px;
                }
                .search-box:focus-within .search-icon { color: var(--accent-purple); }

                .search-box input {
                  border: none;
                  background: transparent;
                  outline: none;
                  font-size: 14px;
                  color: #1F2937;
                  font-weight: 500;
                  width: 100%;
                  height: 100%; /* Fills the flex container */
                  padding: 0;
                  margin: 0;
                }
                .search-box input::placeholder { color: #9CA3AF; font-weight: 400; }

                /* --- 2. PROFILE & ICONS FIX --- */
                .user-nav { display: flex; align-items: center; gap: 24px; }

                /* Notification Bell */
                .notif-btn {
                  position: relative;
                  width: 44px; height: 44px;
                  border-radius: 12px;
                  background: #ffffff;
                  border: 1px solid #F3F4F6;
                  display: flex; align-items: center; justify-content: center;
                  color: #6B7280;
                  cursor: pointer;
                  transition: all 0.2s;
                }
                .notif-btn:hover {
                  background: #F5F3FF;
                  color: var(--accent-purple);
                  border-color: #DDD6FE;
                }
                .dot {
                  position: absolute; top: 11px; right: 12px;
                  width: 8px; height: 8px;
                  background: #EF4444; border: 2px solid #fff; border-radius: 50%;
                }

                /* Profile Pill */
                .profile-pill {
                  display: flex; align-items: center; gap: 12px;
                  padding: 6px 8px 6px 6px;
                  background: #ffffff;
                  border: 1px solid #F3F4F6;
                  border-radius: 40px;
                  cursor: pointer;
                  transition: all 0.2s;
                  padding-right: 16px;
                }
                .profile-pill:hover {
                  border-color: #DDD6FE;
                  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.08);
                }

                .avatar-gradient {
                  width: 38px; height: 38px;
                  background: linear-gradient(135deg, #8B5CF6, #6D28D9);
                  color: white;
                  border-radius: 50%;
                  display: flex; align-items: center; justify-content: center;
                  font-weight: 700; font-size: 15px;
                  box-shadow: 0 4px 10px rgba(109, 40, 217, 0.2);
                }

                .profile-text { display: flex; flex-direction: column; line-height: 1.3; }
                .p-name { font-size: 14px; font-weight: 700; color: #1F2937; }
                .p-role { font-size: 11px; font-weight: 600; color: var(--accent-purple); text-transform: uppercase; }
                
                .p-chevron { color: #9CA3AF; margin-left: 4px; }
              `}
            </style>

            <header className="top-bar">
              {/* Fixed Search */}
              <div className="search-container">
                <div className="search-wrapper">
                  <div className="search-box">
                    <input type="text" placeholder="Search for employees, tasks, or reports..." />
                  </div>
                </div>
              </div>

              {/* Fixed Profile Area */}
              <div className="user-nav">
                <div className="notif-btn">
                  <Bell size={20} />
                  <span className="dot"></span>
                </div>
                <HeaderProfile />
              </div>
            </header>

            <div className="content-area">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/hrManagement" element={<HRManagement />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/manager" element={<ManagerDashboard />} />
                <Route path="/payroll" element={<Accounts />} />
                <Route path="/it" element={<ITOperations />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/tasks" element={<TaskManagement />} />
                <Route path="/self-task" element={<SelfAssignedTask />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/TeamLead" element={<TeamLeadDashboard allTasks={[]} setAllTasks={() => {}} addNewTask={() => {}} />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </main>

          <RoleSwitcher />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;