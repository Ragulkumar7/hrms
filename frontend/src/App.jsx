import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Accounts from './components/Accounts';
import ITOperations from './components/ITOperations';
import { Bell, Search, User } from 'lucide-react';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* The Sidebar now manages navigation via Link components */}
        <Sidebar />

        <main className="main-content">
          {/* Top Navigation Bar with Search and Profile */}
          <header className="top-bar">
            <div className="search-box">
              <Search size={18} color="#888" />
              <input type="text" placeholder="Search operations..." />
            </div>
            <div className="user-nav">
              <Bell size={20} className="icon-btn" style={{ cursor: 'pointer' }} />
              <div className="profile-pill">
                <div className="avatar-small">AD</div>
                <span>Admin</span>
              </div>
            </div>
          </header>

          <div className="content-area">
            <Routes>
              {/* Main Landing / Dashboard */}
              <Route path="/" element={
                <div className="glass-card">
                  <h3 className="main-title">Admin Dashboard Overview</h3>
                  <p className="sub-title" style={{ marginTop: '10px' }}>
                    Welcome to the Core HRMS Enterprise Portal. 
                    Use the light-themed sidebar to navigate between sectors.
                  </p>
                </div>
              } />

              {/* Section 5: Payroll & Accounts */}
              <Route path="/payroll" element={<Accounts />} />

              {/* Section 6: IT & Operations */}
              <Route path="/it" element={<ITOperations />} />

              {/* Fallback route to redirect unknown paths to Dashboard */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;