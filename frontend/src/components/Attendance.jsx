import React, { useState } from 'react';
import { 
  CalendarCheck, Clock, UserX, AlertCircle, 
  ChevronLeft, ChevronRight, Save, MapPin 
} from 'lucide-react';

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock Data: In a real app, this loads based on the selected date
  const [attendance, setAttendance] = useState([
    { id: 'EMP001', name: 'Varshith', role: 'Sr. Developer', status: 'Present', checkIn: '09:30', checkOut: '18:30', leaveType: '' },
    { id: 'EMP002', name: 'Aditi Rao', role: 'UI/UX Designer', status: 'Leave', checkIn: '--:--', checkOut: '--:--', leaveType: 'Casual' },
    { id: 'EMP003', name: 'Sanjay Kumar', role: 'DevOps Engineer', status: 'Absent', checkIn: '--:--', checkOut: '--:--', leaveType: '' },
  ]);

  // Handle Date Navigation
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Handle Status Change
  const handleStatusChange = (id, newStatus) => {
    setAttendance(attendance.map(emp => {
      if (emp.id === id) {
        return { 
          ...emp, 
          status: newStatus,
          // Reset times if Absent/Leave, set defaults if Present
          checkIn: newStatus === 'Present' ? '09:00' : '--:--',
          checkOut: newStatus === 'Present' ? '18:00' : '--:--',
          leaveType: newStatus === 'Leave' ? 'Casual' : '' 
        };
      }
      return emp;
    }));
  };

  // Handle Leave Type Change
  const handleLeaveType = (id, type) => {
    setAttendance(attendance.map(emp => 
      emp.id === id ? { ...emp, leaveType: type } : emp
    ));
  };

  // Statistics Calculation
  const stats = {
    present: attendance.filter(a => a.status === 'Present').length,
    leave: attendance.filter(a => a.status === 'Leave').length,
    absent: attendance.filter(a => a.status === 'Absent').length,
  };

  return (
    <div>
      {/* Header & Date Controls */}
      <div className="page-header">
        <div>
          <h2 className="main-title">Daily Attendance</h2>
          <p className="sub-title">Track Check-ins, Absentees, and Leaves</p>
        </div>
        
        {/* Date Navigator */}
        <div className="glass-card" style={{margin:0, padding:'8px 16px', display:'flex', alignItems:'center', gap:'15px'}}>
          <button className="icon-btn-check" onClick={() => changeDate(-1)}><ChevronLeft size={20}/></button>
          <div style={{textAlign:'center'}}>
            <span style={{fontSize:'14px', fontWeight:'600', color:'#1e293b'}}>
              {currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <div style={{fontSize:'11px', color:'#64748b'}}>
              {currentDate.toLocaleDateString('en-GB', { weekday: 'long' })}
            </div>
          </div>
          <button className="icon-btn-check" onClick={() => changeDate(1)}><ChevronRight size={20}/></button>
        </div>
      </div>

      {/* Daily Stats */}
      <div className="stats-grid">
        <div className="glass-card stat-item">
          <div className="icon-box green"><CalendarCheck size={20} /></div>
          <div><p className="stat-label">Present Today</p><h3 className="stat-value">{stats.present}</h3></div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box orange"><UserX size={20} /></div>
          <div><p className="stat-label">On Leave</p><h3 className="stat-value">{stats.leave}</h3></div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box blue"><Clock size={20} /></div>
          <div><p className="stat-label">Unmarked/Absent</p><h3 className="stat-value">{stats.absent}</h3></div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="glass-card">
        <div className="section-header">
          <h4><Clock size={18} /> Employee Log</h4>
          <button className="btn-action" style={{fontSize:'13px', padding:'8px 15px'}}>
            <Save size={14} style={{marginRight:'5px'}}/> Save Today's Log
          </button>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Remarks / Leave Type</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <div style={{fontWeight:'600', color:'#1e293b'}}>{emp.name}</div>
                  <div style={{fontSize:'11px', color:'#94a3b8'}}>{emp.role}</div>
                </td>
                
                {/* Status Toggles */}
                <td>
                  <div style={{display:'flex', gap:'5px', background:'#f1f5f9', padding:'4px', borderRadius:'8px', width:'fit-content'}}>
                    {['Present', 'Leave', 'Absent'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(emp.id, status)}
                        style={{
                          border:'none', 
                          background: emp.status === status ? '#fff' : 'transparent',
                          color: emp.status === status ? (status === 'Present' ? '#166534' : status === 'Leave' ? '#ca8a04' : '#dc2626') : '#94a3b8',
                          padding:'4px 10px',
                          borderRadius:'6px',
                          fontSize:'12px',
                          fontWeight:'600',
                          cursor:'pointer',
                          boxShadow: emp.status === status ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        {status.charAt(0)}
                      </button>
                    ))}
                  </div>
                </td>

                {/* Time Inputs */}
                <td>
                  <input type="time" disabled={emp.status !== 'Present'} 
                    value={emp.checkIn} className="admin-input small" style={{width:'85px'}} />
                </td>
                <td>
                  <input type="time" disabled={emp.status !== 'Present'} 
                    value={emp.checkOut} className="admin-input small" style={{width:'85px'}} />
                </td>

                {/* Dynamic Logic: If Leave -> Show Dropdown, Else Show "-" */}
                <td>
                  {emp.status === 'Leave' ? (
                    <select 
                      className="admin-input" 
                      style={{width:'100%', fontSize:'12px', borderColor:'#fbbf24'}}
                      value={emp.leaveType}
                      onChange={(e) => handleLeaveType(emp.id, e.target.value)}
                    >
                      <option value="Casual">Casual (Paid)</option>
                      <option value="Medical">Medical</option>
                      <option value="Emergency">Emergency</option>
                      <option value="LOP">Loss of Pay</option>
                    </select>
                  ) : (
                    <span style={{color:'#cbd5e1'}}>--</span>
                  )}
                </td>

                <td>
                  <div style={{display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'#64748b'}}>
                    <MapPin size={12}/> Office
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;