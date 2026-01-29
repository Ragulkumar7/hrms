import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, TrendingUp, DollarSign, Briefcase, 
  Activity, Calendar, UserPlus, FileText, 
  Server, ShieldCheck, Bell, ArrowUpRight, CheckCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const stats = [
    { 
      label: 'Total Workforce', value: '124', sub: '+4 hired this month', 
      icon: <Users size={24} />, 
      color: 'blue', borderColor: '#3b82f6',
      link: '/employees' 
    },
    { 
      label: 'Attendance Today', value: '92%', sub: '14 Absent / 3 Late', 
      icon: <Calendar size={24} />, 
      color: 'orange', borderColor: '#f97316',
      link: '/attendance' 
    },
    { 
      label: 'Open Positions', value: '08', sub: 'Recruitment Active', 
      icon: <Briefcase size={24} />, 
      color: 'purple', borderColor: '#a855f7',
      link: '/recruitment' 
    },
    { 
      label: 'Monthly Revenue', value: '₹4.2M', sub: '+12% vs last mo', 
      icon: <DollarSign size={24} />, 
      color: 'green', borderColor: '#22c55e',
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
      
      <style>
        {`
          /* --- REFINED PERUSAA THEME --- */
          
          /* 1. Header Card */
          .dash-header-card {
            background: linear-gradient(135deg, #ffffff 0%, #fff7ed 100%);
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 35px; /* More padding */
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          }

          .header-text h1 { 
            margin: 0 0 8px 0; 
            font-size: 28px; /* Bigger Title */
            color: #1e293b; 
            font-weight: 800; 
            letter-spacing: -0.5px;
          }
          .header-text p { margin: 0; color: #64748b; font-size: 15px; font-weight: 500; }

          /* NEW: Date Widget (Calendar Style) */
          .date-widget {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 10px 20px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.04);
            min-width: 140px;
          }
          .dw-month { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #f97316; letter-spacing: 1px; }
          .dw-day { font-size: 26px; font-weight: 800; color: #1e293b; line-height: 1.1; margin: 2px 0; }
          .dw-year { font-size: 12px; color: #94a3b8; font-weight: 600; }

          /* 2. Stats Grid */
          .dash-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin-bottom: 30px;
          }

          .dash-stat-card {
            background: white; border: 1px solid #e2e8f0; border-radius: 16px;
            padding: 24px; position: relative; cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex; gap: 18px; align-items: flex-start;
            border-top: 4px solid transparent; /* Accent placeholder */
          }

          .dash-stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          }

          .stat-icon-wrapper {
            width: 56px; height: 56px; border-radius: 14px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          }
          /* Icon Colors */
          .stat-icon-wrapper.blue { background: #eff6ff; color: #2563eb; }
          .stat-icon-wrapper.orange { background: #fff7ed; color: #ea580c; }
          .stat-icon-wrapper.purple { background: #faf5ff; color: #9333ea; }
          .stat-icon-wrapper.green { background: #f0fdf4; color: #16a34a; }

          .stat-info .label { font-size: 14px; font-weight: 600; color: #64748b; margin-bottom: 4px; }
          .stat-info h3 { font-size: 28px; font-weight: 800; color: #1e293b; margin: 0; }
          .stat-info .sub-text { font-size: 12px; color: #10b981; font-weight: 700; background: #ecfdf5; padding: 2px 8px; border-radius: 20px; margin-top: 6px; display: inline-block;}

          .hover-arrow {
            position: absolute; top: 20px; right: 20px; color: #cbd5e1;
          }
          .dash-stat-card:hover .hover-arrow { color: #ff9b44; }

          /* 3. Layout */
          .dash-split-layout {
            display: grid; grid-template-columns: 2fr 1fr; gap: 28px;
          }
          @media (max-width: 1024px) { .dash-split-layout { grid-template-columns: 1fr; } }

          .dash-col-left, .dash-col-right { display: flex; flex-direction: column; gap: 28px; }

          /* 4. Section Cards */
          .dash-section-card {
            background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.01);
          }
          .dash-section-card.h-full { height: 100%; }

          .section-title {
            margin: 0 0 24px 0; font-size: 18px; font-weight: 800; color: #1e293b;
            display: flex; align-items: center; gap: 10px;
          }

          .card-header-row {
            display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
          }

          .link-text {
            background: none; border: none; color: #2563eb; font-size: 14px; font-weight: 600; cursor: pointer;
          }

          /* Quick Actions */
          .quick-actions-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
          }

          .action-btn {
            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px;
            padding: 20px; cursor: pointer; transition: all 0.2s;
            display: flex; flex-direction: column; align-items: center; gap: 12px;
          }
          .action-btn:hover { background: white; border-color: #ff9b44; box-shadow: 0 8px 20px rgba(0,0,0,0.05); transform: translateY(-2px); }

          .icon-circle {
            width: 48px; height: 48px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          }
          .icon-circle.blue { background: #dbeafe; color: #2563eb; }
          .icon-circle.purple { background: #f3e8ff; color: #9333ea; }
          .icon-circle.green { background: #dcfce7; color: #16a34a; }
          .icon-circle.orange { background: #ffedd5; color: #ea580c; }

          .action-btn span { font-size: 13px; font-weight: 700; color: #334155; }

          /* Table */
          .dash-table { width: 100%; border-collapse: separate; border-spacing: 0; }
          .dash-table th { 
            text-align: left; color: #64748b; font-weight: 700; padding: 12px 0; 
            font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;
            border-bottom: 2px solid #f1f5f9; 
          }
          .dash-table td { 
            padding: 16px 0; border-bottom: 1px solid #f1f5f9; 
            color: #1e293b; font-weight: 600; font-size: 14px; 
          }
          .dash-table tr:last-child td { border-bottom: none; }

          .progress-wrapper {
            width: 100%; height: 8px; background: #f1f5f9; border-radius: 10px; overflow: hidden; display: inline-block; width: 100px; vertical-align: middle; margin-right: 12px;
          }
          .progress-fill { height: 100%; border-radius: 10px; }
          .progress-fill.green { background: #10b981; }
          .progress-fill.orange { background: #f59e0b; }
          .progress-fill.blue { background: #3b82f6; }
          .prog-text { font-size: 12px; font-weight: 700; color: #475569; }

          /* Activity Feed */
          .activity-list { display: flex; flex-direction: column; gap: 0; }
          .activity-item {
            display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px dashed #e2e8f0; align-items: flex-start;
          }
          .activity-item:last-child { border: none; }

          .activity-dot {
            width: 12px; height: 12px; border-radius: 50%; margin-top: 5px; flex-shrink: 0;
          }
          .activity-dot.recruitment { background: #3b82f6; box-shadow: 0 0 0 3px #eff6ff; }
          .activity-dot.finance { background: #10b981; box-shadow: 0 0 0 3px #ecfdf5; }
          .activity-dot.system { background: #f59e0b; box-shadow: 0 0 0 3px #fff7ed; }
          .activity-dot.hr { background: #8b5cf6; box-shadow: 0 0 0 3px #f3e8ff; }

          .activity-content p { margin: 0; font-size: 14px; color: #1e293b; line-height: 1.5; font-weight: 500; }
          .activity-content span { font-size: 12px; color: #94a3b8; display: block; margin-top: 4px; font-weight: 500; }

          .view-all-btn {
            width: 100%; padding: 12px; margin-top: 20px; background: #f8fafc;
            border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13px; font-weight: 700; color: #475569; cursor: pointer;
          }
          .view-all-btn:hover { background: #f1f5f9; color: #1e293b; border-color: #cbd5e1; }

          /* System Health */
          .system-row {
            display: flex; justify-content: space-between; align-items: center;
            padding: 14px 0; border-bottom: 1px solid #f1f5f9;
          }
          .system-row:last-child { border: none; }
          .sys-label { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; color: #475569; }
          .sys-val { font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 6px; }
          .sys-val.green { background: #ecfdf5; color: #047857; }
          .sys-val.blue { background: #eff6ff; color: #1d4ed8; }
          .sys-val.orange { background: #fffbeb; color: #b45309; }
        `}
      </style>

      {/* 1. WELCOME HEADER */}
      <div className="dash-header-card">
        <div className="header-text">
          <h1>Welcome back, {user.name} 👋</h1>
          <p>Here’s what’s happening in your organization today.</p>
        </div>
        {/* NEW DATE WIDGET */}
        <div className="date-widget">
          <div className="dw-month">{new Date().toLocaleDateString('en-GB', { month: 'long' })}</div>
          <div className="dw-day">{new Date().getDate()}</div>
          <div className="dw-year">{new Date().getFullYear()}</div>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="dash-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="dash-stat-card" 
               style={{ borderTopColor: stat.borderColor }} 
               onClick={() => navigate(stat.link)}>
            <div className={`stat-icon-wrapper ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="label">{stat.label}</span>
              <h3>{stat.value}</h3>
              <span className="sub-text">{stat.sub}</span>
            </div>
            <div className="hover-arrow">
              <ArrowUpRight size={20} />
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
                <div className="icon-circle blue"><UserPlus size={22}/></div>
                <span>Add Employee</span>
              </button>
              <button onClick={() => navigate('/recruitment')} className="action-btn">
                <div className="icon-circle purple"><Briefcase size={22}/></div>
                <span>Post Job</span>
              </button>
              <button onClick={() => navigate('/payroll')} className="action-btn">
                <div className="icon-circle green"><DollarSign size={22}/></div>
                <span>Run Payroll</span>
              </button>
              <button onClick={() => navigate('/reports')} className="action-btn">
                <div className="icon-circle orange"><FileText size={22}/></div>
                <span>Reports</span>
              </button>
            </div>
          </div>

          {/* Department Performance */}
          <div className="dash-section-card">
            <div className="card-header-row">
              <h3 className="section-title"><TrendingUp size={20}/> Department Efficiency</h3>
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
            <h3 className="section-title"><Activity size={20}/> Recent Activity</h3>
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
            <h3 className="section-title"><Server size={20}/> System Status</h3>
            <div className="system-row">
              <span className="sys-label"><ShieldCheck size={16} color="#10b981"/> Security</span>
              <span className="sys-val green">Optimal</span>
            </div>
            <div className="system-row">
              <span className="sys-label"><Activity size={16} color="#3b82f6"/> Server Load</span>
              <span className="sys-val blue">24%</span>
            </div>
            <div className="system-row">
              <span className="sys-label"><Bell size={16} color="#f59e0b"/> Alerts</span>
              <span className="sys-val orange">0 Active</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;