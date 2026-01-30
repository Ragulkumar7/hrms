import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// --- FIX: Correct Import Path ---
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
import Logout from "./components/Logout";
import DigitalMarketing from "./components/DigitalMarketing"; // Added Import

// --- NEW ACCOUNTS IMPORTS ---
import Accountsteam from "./components/Accountsteam";
import InvoiceSystem from "./components/accounts/InvoiceSystem";
import SalaryProcessor from "./components/accounts/SalaryProcessor";

import { Bell, Search, ChevronDown } from "lucide-react";
import "./App.css";

// --- HEADER PROFILE (Fixed Optional Chaining) ---
const HeaderProfile = () => {
  const { user } = useUser();
  return (
    <div className="profile-pill">
      <div className="avatar-gradient">{user?.name?.charAt(0) || "U"}</div>
      <div className="profile-text">
        <span className="p-name">{user?.name || "User"}</span>
        <span className="p-role">{user?.role || "Role"}</span>
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
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "white",
        padding: "12px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        border: "1px solid #E9D5FF",
        zIndex: 9999,
      }}
    >
      <p
        style={{
          fontSize: "10px",
          fontWeight: "800",
          marginBottom: "8px",
          color: "#6D28D9",
          textTransform: "uppercase",
        }}
      >
        Current: {user?.role}
      </p>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {["Manager", "HR", "Accounts", "TL", "DM", "Employee"].map((role) => (
          <button
            key={role}
            onClick={() =>
              login(
                role === "TL" ? "TL" : role,
                role === "TL" ? "TL-01" : undefined,
              )
            }
            style={{
              fontSize: "10px",
              padding: "5px 10px",
              cursor: "pointer",
              border: "1px solid #DDD6FE",
              background: user?.role === role ? "#6D28D9" : "#F5F3FF",
              color: user?.role === role ? "white" : "#6D28D9",
              borderRadius: "6px",
              fontWeight: "700",
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
  if (user?.role === "Employee") return <EmployeeDashboard />;
  if (user?.role === "TL")
    return (
      <TeamLeadDashboard
        allTasks={[]}
        setAllTasks={() => {}}
        addNewTask={() => {}}
      />
    );
  // ADDED DM REDIRECT
  if (user?.role === "DM") return <DigitalMarketing />;

  return <AdminDashboard />;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-wrapper">
          <Sidebar />

          <main className="main-content">
            <style>
              {`
                :root {
                  --header-height: 85px;
                  --accent-purple: #7C3AED;
                }
                .top-bar {
                  height: var(--header-height);
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
                .search-container { flex: 1; }
                .search-wrapper { position: relative; width: 380px; }
                .search-box {
                  display: flex; align-items: center; height: 46px;
                  background: #ffffff; border: 1px solid #E5E7EB;
                  border-radius: 12px; padding: 0 16px;
                  transition: all 0.3s ease; gap: 12px;
                }
                .user-nav { display: flex; align-items: center; gap: 24px; }
                .profile-pill {
                  display: flex; align-items: center; gap: 12px;
                  padding: 6px 8px 6px 6px; background: #ffffff;
                  border: 1px solid #F3F4F6; border-radius: 40px;
                  cursor: pointer; padding-right: 16px;
                }
                .avatar-gradient {
                  width: 38px; height: 38px;
                  background: linear-gradient(135deg, #8B5CF6, #6D28D9);
                  color: white; border-radius: 50%;
                  display: flex; align-items: center; justify-content: center;
                  font-weight: 700;
                }
              `}
            </style>

            <header className="top-bar">
              <div className="search-container">
                <div className="search-wrapper">
                  <div className="search-box">
                    <Search size={20} color="#9CA3AF" />
                    <input type="text" placeholder="Search operations..." />
                  </div>
                </div>
              </div>
              <div className="user-nav">
                <Bell size={20} color="#6B7280" />
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

                {/* --- NEW ACCOUNTS ROUTES --- */}
                <Route path="/accountsteam" element={<Accountsteam />} />
                <Route path="/invoice" element={<InvoiceSystem />} />
                <Route path="/salary-process" element={<SalaryProcessor />} />

                <Route path="/it" element={<ITOperations />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/tasks" element={<TaskManagement />} />
                <Route path="/self-task" element={<SelfAssignedTask />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/recruitment" element={<Recruitment />} />
                {/* ADDED DM ROUTE */}
                <Route
                  path="/digital-marketing"
                  element={<DigitalMarketing />}
                />
                <Route
                  path="/TeamLead"
                  element={
                    <TeamLeadDashboard
                      allTasks={[]}
                      setAllTasks={() => {}}
                      addNewTask={() => {}}
                    />
                  }
                />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="/" />} />
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
