import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Core Components
import Sidebar from './components/Sidebar';
import Accounts from './components/Accounts';
import ITOperations from './components/ITOperations';

// Task Management Components
import EmployeeDashboard from "./components/EmployeeDashboard.jsx";
import TeamLeadDashboard from "./components/TeamLeadDashboard.jsx";

// Icons & Styling
import { Bell, Search, User } from 'lucide-react';
import './App.css';

function App() {
  // --- Task Management State Logic ---
  const [allTasks, setAllTasks] = useState([
    {
      id: 1,
      title: "Database Schema Design",
      empName: "Arun",
      priority: "High",
      status: "Pending",
      type: "Manager",
      file: null,
    },
    {
      id: 2,
      title: "Weekly Report Submission",
      empName: "Arun",
      priority: "Medium",
      status: "Working",
      type: "Manager",
      file: null,
    },
  ]);

  // Shared function for adding tasks across dashboards
  const addNewTask = (title, empName) => {
    const newTask = {
      id: Date.now(),
      title,
      empName,
      priority: "High",
      status: "Pending",
      type: "Manager",
      file: null,
    };
    setAllTasks((prev) => [...prev, newTask]); // safer update using callback
  };

  return (
    <Router>
      <div className="app-wrapper">
        {/* Consistent Enterprise Sidebar */}
        <Sidebar />

        <main className="main-content">
          {/* Professional Top Bar with Corrected Alignment */}
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
              {/* Main Admin Overview Page */}
              <Route path="/" element={
                <div className="glass-card">
                  <h3 className="main-title">Admin Dashboard Overview</h3>
                  <p className="sub-title" style={{ marginTop: '10px' }}>
                    Welcome to the Core HRMS Enterprise Portal. 
                    Manage your payroll, IT logistics, and team tasks from this central hub.
                  </p>
                </div>
              } />

              {/* Section 5: Payroll & Accounts */}
              <Route path="/payroll" element={<Accounts />} />

              {/* Section 6: IT & Operations */}
              <Route path="/it" element={<ITOperations />} />

              {/* Section 4: Task Management - Employee View */}
              <Route
                path="/tasks"
                element={
                  <EmployeeDashboard
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    addNewTask={addNewTask}
                  />
                }
              />

              {/* Section 4: Task Management - Team Lead View */}
              <Route
                path="/team-lead"
                element={
                  <TeamLeadDashboard
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    addNewTask={addNewTask}
                  />
                }
              />

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