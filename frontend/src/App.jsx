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
import Accounts from "./components/PayrollAccounts";
import AdminDashboard from "./components/AdminDashboard";
import Attendance from "./components/Attendance";
import EmployeeAttendance from "./components/EmployeeAttendance";
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
import DigitalMarketing from "./components/DigitalMarketing";
import TeamsChat from "./components/TeamsChat";

// --- SEPARATE DIGITAL MARKETING IMPORTS ---
import DigitalManager from "./components/DigitalManager";
import DigitalExecutive from "./components/DigitalExecutive";

// --- ACCOUNTS TEAM COMPONENT (MUKKIAM) ---
import AccountsTeam from "./components/Accountsteam"; // Invoice, Ledger, PO handle panna

// --- NEW ACCOUNTS IMPORTS ---
import purchaseorder from "./components/purchaseorder";
import InvoiceSystem from "./components/accounts/InvoiceSystem";
import ledger from "./components/accounts/ledger";

import { Bell, Search, ChevronDown } from "lucide-react";
import "./App.css";

// --- HEADER PROFILE ---
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
  if (user?.role === "DM") return <DigitalMarketing />;
  if (user?.role === "Accounts") return <AccountsTeam />;
  return <AdminDashboard />;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-wrapper">
          <Sidebar />
          <main className="main-content">
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
                <Route path="/teams" element={<TeamsChat />} />
                <Route path="/hrManagement" element={<HRManagement />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/manager" element={<ManagerDashboard />} />

                {/* --- ACCOUNTS ROUTES --- */}
                <Route path="/payroll" element={<Accounts />} />
                <Route path="/accounts-team" element={<AccountsTeam />} />

                <Route path="/purchase-order" element={<purchaseorder />} />
                <Route path="/invoice" element={<InvoiceSystem />} />
                <Route path="/ledger" element={<ledger />} />
                <Route path="/it" element={<ITOperations />} />

                {/* --- ATTENDANCE ROUTES --- */}
                {/* 1. Clicking Attendance opens EmployeeAttendance.jsx */}
                <Route
                  path="/EmployeeAttendance"
                  element={<EmployeeAttendance />}
                />

                {/* 2. Clicking Attendance History (or My History) opens Attendance.jsx */}
                <Route path="/attendance" element={<Attendance />} />

                {/* 3. Global Attendance Summary Path */}
                <Route path="/attendance-history" element={<Attendance />} />

                <Route path="/tasks" element={<TaskManagement />} />
                <Route path="/self-task" element={<SelfAssignedTask />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/recruitment" element={<Recruitment />} />

                {/* --- DIGITAL MARKETING ROUTES --- */}
                <Route
                  path="/digital-marketing"
                  element={<DigitalMarketing />}
                />
                <Route
                  path="/digital-marketing/manager"
                  element={<DigitalManager />}
                />
                <Route
                  path="/digital-marketing/executive"
                  element={<DigitalExecutive />}
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
