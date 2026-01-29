import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, TrendingUp, DollarSign, Briefcase, 
  Activity, Calendar, UserPlus, FileText, 
  Server, ShieldCheck, Bell, ArrowUpRight 
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const stats = [
    { 
      label: 'Total Workforce', 
      value: '124', 
      sub: '+4 hired this month', 
      icon: <Users size={24} />, 
      color: 'blue', 
      link: '/employees' 
    },
    { 
      label: 'Attendance Today', 
      value: '92%', 
      sub: '14 Absent / 3 Late', 
      icon: <Calendar size={24} />, 
      color: 'orange', 
      link: '/attendance' 
    },
    { 
      label: 'Open Positions', 
      value: '08', 
      sub: 'Recruitment Active', 
      icon: <Briefcase size={24} />, 
      color: 'purple', 
      link: '/recruitment' 
    },
    { 
      label: 'Monthly Revenue', 
      value: '₹4.2M', 
      sub: '+12% vs last mo', 
      icon: <DollarSign size={24} />, 
      color: 'green', 
      link: '/sales' 
    },
  ];

  const activities = [
    { text: "Sarah Connor applied for 'Senior React Dev'", time: "2 hrs ago", type: "recruitment" },
    { text: "Tech Solutions UAE invoice #INV-001 paid", time: "4 hrs ago", type: "finance" },
    { text: "Server Maintenance Scheduled for 11 PM", time: "6 hrs ago", type: "system" },
    { text: "New Policy: 'Work From Home' updated", time: "Yesterday", type: "hr" },
  ];

  return (
    <div className="fade-in">
      
      {/* 1. WELCOME HEADER */}
      <div className="dash-header-card">
        <div className="header-text">
          <h1>Welcome back, {user.name} 👋</h1>
          <p>Here’s what’s happening in your organization today.</p>
        </div>
        <div className="header-meta">
          <div className="date-badge">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="dash-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="dash-stat-card" onClick={() => navigate(stat.link)}>
            <div className={`stat-icon-wrapper ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="label">{stat.label}</span>
              <h3>{stat.value}</h3>
              <span className="sub-text">{stat.sub}</span>
            </div>
            <div className="hover-arrow">
              <ArrowUpRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* 3. SPLIT LAYOUT */}
      <div className="dash-split-layout">
        
        {/* LEFT COLUMN */}
        <div className="dash-col-left">
          
          {/* Quick Actions */}
          <div className="dash-section-card">
            <h3 className="section-title">Quick Actions</h3>
            <div className="quick-actions-grid">
              <button onClick={() => navigate('/employees')} className="action-btn">
                <div className="icon-circle blue"><UserPlus size={18}/></div>
                <span>Add Employee</span>
              </button>
              <button onClick={() => navigate('/recruitment')} className="action-btn">
                <div className="icon-circle purple"><Briefcase size={18}/></div>
                <span>Post Job</span>
              </button>
              <button onClick={() => navigate('/payroll')} className="action-btn">
                <div className="icon-circle green"><DollarSign size={18}/></div>
                <span>Run Payroll</span>
              </button>
              <button onClick={() => navigate('/reports')} className="action-btn">
                <div className="icon-circle orange"><FileText size={18}/></div>
                <span>Generate Report</span>
              </button>
            </div>
          </div>

          {/* Department Performance */}
          <div className="dash-section-card">
            <div className="card-header-row">
              <h3 className="section-title"><TrendingUp size={18}/> Department Efficiency</h3>
              <button className="link-text" onClick={() => navigate('/manager')}>View Details</button>
            </div>
            <table className="dash-table">
              <thead>
                <tr><th>Department</th><th>Headcount</th><th>Productivity</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Engineering</td>
                  <td>42</td>
                  <td>
                    <div className="progress-wrapper">
                      <div className="progress-fill green" style={{width: '92%'}}></div>
                    </div>
                    <span className="prog-text">92%</span>
                  </td>
                </tr>
                <tr>
                  <td>Sales & Marketing</td>
                  <td>18</td>
                  <td>
                    <div className="progress-wrapper">
                      <div className="progress-fill orange" style={{width: '78%'}}></div>
                    </div>
                    <span className="prog-text">78%</span>
                  </td>
                </tr>
                <tr>
                  <td>Customer Support</td>
                  <td>24</td>
                  <td>
                    <div className="progress-wrapper">
                      <div className="progress-fill blue" style={{width: '85%'}}></div>
                    </div>
                    <span className="prog-text">85%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="dash-col-right">
          
          {/* Activity Feed */}
          <div className="dash-section-card h-full">
            <h3 className="section-title"><Activity size={18}/> Recent Activity</h3>
            <div className="activity-list">
              {activities.map((act, i) => (
                <div key={i} className="activity-item">
                  <div className={`activity-dot ${act.type}`}></div>
                  <div className="activity-content">
                    <p>{act.text}</p>
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-btn">View Full Log</button>
          </div>

          {/* System Health (Mini) */}
          <div className="dash-section-card system-card">
            <h3 className="section-title"><Server size={18}/> System Status</h3>
            <div className="system-row">
              <span className="sys-label"><ShieldCheck size={14} color="#10b981"/> Security</span>
              <span className="sys-val green">Optimal</span>
            </div>
            <div className="system-row">
              <span className="sys-label"><Activity size={14} color="#3b82f6"/> Server Load</span>
              <span className="sys-val blue">24%</span>
            </div>
            <div className="system-row">
              <span className="sys-label"><Bell size={14} color="#f59e0b"/> Alerts</span>
              <span className="sys-val orange">0 Active</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;