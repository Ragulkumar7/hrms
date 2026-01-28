import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext'; 

// --- COMPONENT IMPORTS ---
import Sidebar from './components/Sidebar';
import Accounts from './components/Accounts';
import Attendance from './components/Attendance';
import ITOperations from './components/ITOperations';
import Employees from './components/Employees';
import ManagerDashboard from './components/ManagerDashboard';
import TaskManagement from './components/TaskManagement';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Sales from './components/Sales';
import Recruitment from './components/Recruitment';
import ThemeCustomizer from './components/ThemeCustomizer'; // Import Theme Customizer

import { Bell, Search } from 'lucide-react';
import './App.css';

// --- INTERNAL COMPONENT: Dynamic Header Profile ---
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
    <UserProvider>
      <Router>
        <div className="app-wrapper">
          
          {/* 1. Sidebar Navigation */}
          <Sidebar />

          {/* 2. Main Content Area */}
          <main className="main-content">
            
            {/* Top Header */}
            <header className="top-bar">
              <div className="search-box">
                <Search size={18} color="#888" />
                <input type="text" placeholder="Search operations..." />
              </div>
              <div className="user-nav">
                <Bell size={20} className="icon-btn" style={{ cursor: 'pointer' }} />
                <HeaderProfile />
              </div>
            </header>

            {/* Page Content Routes */}
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

                {/* Modules */}
                <Route path="/employees" element={<Employees />} />
                <Route path="/manager" element={<ManagerDashboard />} />
                <Route path="/payroll" element={<Accounts />} />
                <Route path="/it" element={<ITOperations />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/tasks" element={<TaskManagement />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/recruitment" element={<Recruitment />} />

                {/* Fallback Route (Must be last) */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>

          {/* 3. Floating Tools */}
          <ThemeCustomizer />
          <RoleSwitcher />
          
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;