import React, { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut, FileText, Upload } from 'lucide-react';

const EmployeeAttendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [time, setTime] = useState(new Date());

  // Real-time clock logic
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="attendance-container fade-in">
      {/* Header Section */}
      <div className="att-page-header">
        <div>
          <h1 className="main-title">Attendance & Leave</h1>
          <p className="sub-title">Track your daily work hours and manage leaves.</p>
        </div>
        <div className="att-time-display">
          <p className="current-time">
            {time.toLocaleTimeString()}
          </p>
          <p className="current-date">
            {time.toLocaleDateString('en-GB', { dateStyle: 'full' })}
          </p>
        </div>
      </div>

      <div className="att-grid">
        
        {/* Left Side: Check-in/Out Card */}
        <div className="att-card checkin-section">
          <div className={`clock-circle ${isCheckedIn ? 'active' : 'inactive'}`}>
            <Clock size={48} />
          </div>

          <h2 className="checkin-title">
            {isCheckedIn ? 'Working Since 09:00 AM' : 'Ready to Start?'}
          </h2>
          <p className="checkin-subtitle">
            Your attendance will be logged for today.
          </p>
          
          <button 
            onClick={() => setIsCheckedIn(!isCheckedIn)}
            className={`punch-btn ${isCheckedIn ? 'punch-out' : 'punch-in'}`}
          >
            {isCheckedIn ? <><LogOut size={20} /> Punch Out</> : <><LogIn size={20} /> Punch In</>}
          </button>
        </div>

        {/* Right Side: Leave Application */}
        <div className="att-card leave-section">
          <h3 className="section-title">
            <FileText size={20} className="icon-orange" /> Apply for Leave
          </h3>
          
          <form className="leave-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label>LEAVE TYPE</label>
                <select className="standard-input">
                  <option>Casual Leave</option>
                  <option>Medical Leave</option>
                  <option>Privilege Leave</option>
                </select>
              </div>
              <div className="form-group">
                <label>DATE</label>
                <input type="date" className="standard-input" />
              </div>
            </div>

            {/* Upload Section */}
            <div className="form-group">
              <label>SUPPORT DOCUMENTS</label>
              <div className="upload-box">
                <Upload size={24} style={{marginBottom: '8px', color: '#94a3b8'}}/>
                <p>Drag & drop or <span>Browse</span></p>
                <small>PDF, JPG or PNG (Max 5MB)</small>
              </div>
            </div>

            <button className="submit-btn">
              Submit Request
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default EmployeeAttendance;