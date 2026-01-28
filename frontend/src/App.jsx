import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext'; // 1. Import Context

// Components
import Sidebar from './components/Sidebar';
import Accounts from './components/Accounts';
import Attendance from './components/Attendance';
import ITOperations from './components/ITOperations';
import Employees from './components/Employees';           // New Import
import ManagerDashboard from './components/ManagerDashboard'; // New Import
import TaskManagement from './components/TaskManagement';
import Reports from './components/Reports';

import { Bell, Search } from 'lucide-react';
import './App.css';

// --- INTERNAL COMPONENT: Dynamic Header Profile ---
// This ensures the top right corner updates when you switch roles
const HeaderProfile = () => {
  const { user } = useUser();
  return (
    <div className="profile-pill">
      <div className="avatar-small" style={{background: '#e2e8f0', color:'#475569'}}>
        {user.role.substring(0, 2).toUpperCase()}
      </div>
      <span>{user.name}</span>
    </div>
  );
};

// --- DEV TOOL: Floating Button to Switch Roles ---
const RoleSwitcher = () => {
  const { user, login } = useUser();
  return (
    <div style={{
      position: 'fixed', bottom: '20px', right: '20px', 
      background: 'white', padding: '15px', borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)', border: '1px solid #e2e8f0', zIndex: 9999
    }}>
      <p style={{fontSize:'12px', fontWeight:'bold', marginBottom:'5px', color:'#64748b'}}>
        Current Role: <span style={{color:'#2563eb'}}>{user.role}</span>
      </p>
      <div style={{display:'flex', gap:'5px'}}>
        <button onClick={() => login('Manager')} style={{fontSize:'10px', padding:'5px', cursor:'pointer', border:'1px solid #ccc', borderRadius:'4px'}}>Manager</button>
        <button onClick={() => login('TL', 'TL-01')} style={{fontSize:'10px', padding:'5px', cursor:'pointer', border:'1px solid #ccc', borderRadius:'4px'}}>TL</button>
        <button onClick={() => login('Employee')} style={{fontSize:'10px', padding:'5px', cursor:'pointer', border:'1px solid #ccc', borderRadius:'4px'}}>Employee</button>
      </div>
    </div>
  );
};

function App() {
  return (
    // 2. Wrap EVERYTHING in UserProvider
    <UserProvider>
      <Router>
        <div className="app-wrapper">
          
          <Sidebar />

          <main className="main-content">
            {/* Top Navigation Bar */}
            <header className="top-bar">
              <div className="search-box">
                <Search size={18} color="#888" />
                <input type="text" placeholder="Search operations..." />
              </div>
              <div className="user-nav">
                <Bell size={20} className="icon-btn" style={{ cursor: 'pointer' }} />
                
                {/* 3. Use the dynamic profile component */}
                <HeaderProfile />
              </div>
            </header>

            <div className="content-area">
              <Routes>
                {/* Main Dashboard */}
                <Route path="/" element={
                  <div className="glass-card">
                    <h3 className="main-title">Admin Dashboard Overview</h3>
                    <p className="sub-title" style={{ marginTop: '10px' }}>
                      Welcome to the Core HRMS Enterprise Portal. 
                      Use the sidebar to navigate based on your role.
                    </p>
                  </div>
                } />

                {/* --- MODULES --- */}
                
                {/* 1. Employees (Hiring) */}
                <Route path="/employees" element={<Employees />} />

                {/* 2. Manager Portal (Hierarchy & Shuffling) */}
                <Route path="/manager" element={<ManagerDashboard />} />

                {/* 3. Payroll (Accounts) */}
                <Route path="/payroll" element={<Accounts />} />

                {/* 4. IT Operations */}
                <Route path="/it" element={<ITOperations />} />

                {/* 5. Attendance */}
                <Route path="/attendance" element={<Attendance />} />

                <Route path="/tasks" element={<TaskManagement />} />

                <Route path="/reports" element={<Reports />} />

                {/* --- FALLBACK --- */}
                {/* The wildcard must always be LAST */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>

          {/* 4. Add the Role Switcher for testing */}
          <RoleSwitcher />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;