import React, { useState, useMemo } from 'react';
import { 
  Users, UserPlus, FileSearch, Megaphone, 
  Calendar, Upload, Search, MoreVertical, Plus 
} from 'lucide-react';

const HRManagement = () => {
  const [activeTab, setActiveTab] = useState('directory');

  const tabs = [
    { id: 'directory', label: 'Employee Directory', icon: <Users size={18} /> },
    { id: 'hiring', label: 'Hiring & ATS', icon: <UserPlus size={18} /> },
    { id: 'attendance', label: 'Attendance Maint.', icon: <Calendar size={18} /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
  ];

  return (
    <div className="animate-in">
      {/* 1. Header Section using App.css classes */}
      <div className="page-header">
        <div>
          <h1 className="main-title">HR Management</h1>
          <p className="sub-title">Manage your workforce, hiring, and internal communications.</p>
        </div>
      </div>

      {/* 2. Tab Navigation using App.css classes */}
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Main Content Area using Glass Card styling */}
      <div className="glass-card">
        {activeTab === 'directory' && <EmployeeDirectory />}
        {activeTab === 'hiring' && <HiringATS />}
        {activeTab === 'attendance' && <AttendanceMaint />}
        {activeTab === 'announcements' && <AnnouncementsPortal />}
      </div>
    </div>
  );
};

// --- Sub-Components ---

const EmployeeDirectory = () => (
  <div className="fade-in">
    <div className="page-header" style={{ marginBottom: '20px' }}>
      <h3 className="main-title" style={{ fontSize: '18px' }}>Staff Profiles</h3>
      <button className="btn-action flex items-center gap-2">
        <Plus size={16} /> Add Employee
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: '#EMP001', name: 'John Doe', role: 'Software Engineer', status: 'Active', initials: 'JD' },
            { id: '#EMP002', name: 'Jane Smith', role: 'Product Manager', status: 'Active', initials: 'JS' },
            { id: '#EMP003', name: 'Robert Johnson', role: 'UI Designer', status: 'On Leave', initials: 'RJ' }
          ].map((emp) => (
            <tr key={emp.id}>
              <td style={{ fontWeight: '600', color: '#64748b' }}>{emp.id}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar-small" style={{ background: '#eff6ff', color: '#2563eb', fontWeight: 'bold' }}>
                    {emp.initials}
                  </div>
                  <span style={{ fontWeight: '700', color: '#1e293b' }}>{emp.name}</span>
                </div>
              </td>
              <td style={{ color: '#64748b' }}>{emp.role}</td>
              <td>
                <span className={`status-pill ${emp.status === 'Active' ? 'approved' : 'pending'}`}>
                  {emp.status}
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <MoreVertical size={16} style={{ color: '#94a3b8', cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const HiringATS = () => {
  const [keyword, setKeyword] = useState('');
  const resumes = [
    { name: 'Alex Rivers', skills: 'React, Node, Tailwind', experience: '4 Years', status: 'Screened' },
    { name: 'Sarah Connor', skills: 'UI/UX, Figma, Adobe', experience: '5 Years', status: 'Interview' },
    { name: 'Michael Scott', skills: 'Sales, Management', experience: '10 Years', status: 'Applied' },
  ];

  const filteredResumes = useMemo(() => {
    return resumes.filter(r => 
      r.skills.toLowerCase().includes(keyword.toLowerCase()) || 
      r.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword]);

  return (
    <div className="fade-in">
      <div className="stats-grid">
        <div className="glass-card stat-item">
          <div className="icon-box orange"><Users size={24} /></div>
          <div>
            <p className="nav-section-label" style={{padding:0}}>Open Positions</p>
            <h2 className="main-title">14</h2>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box blue"><FileSearch size={24} /></div>
          <div>
            <p className="nav-section-label" style={{padding:0}}>Screened</p>
            <h2 className="main-title">482</h2>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box green"><Calendar size={24} /></div>
          <div>
            <p className="nav-section-label" style={{padding:0}}>Interviews</p>
            <h2 className="main-title">28</h2>
          </div>
        </div>
      </div>

      <div className="form-grid" style={{ gridTemplateColumns: '1fr auto', marginBottom: '25px' }}>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} size={18} />
          <input 
            type="text" 
            placeholder="Search candidates or skills..." 
            className="admin-input" 
            style={{ width: '100%', paddingLeft: '40px' }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <button className="btn-action flex items-center gap-2">
          <Upload size={18} /> Bulk Upload
        </button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Matched Skills</th>
            <th>Exp</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredResumes.map((res, i) => (
            <tr key={i}>
              <td style={{ fontWeight: '700' }}>{res.name}</td>
              <td style={{ color: '#FF9B44', fontWeight: '600' }}>{res.skills}</td>
              <td>{res.experience}</td>
              <td><span className="status-pill approved" style={{ background: '#eff6ff', color: '#2563eb' }}>{res.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AttendanceMaint = () => (
  <div className="fade-in">
    <div className="page-header">
      <div className="flex gap-4">
        <select className="admin-input">
          <option>All Departments</option>
          <option>Engineering</option>
        </select>
        <div className="admin-input" style={{ background: '#f8fafc' }}>Oct 20, 2023 - Oct 27, 2023</div>
      </div>
      <button className="btn-action">+ Add Attendance</button>
    </div>
    <table className="custom-table">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Date</th>
          <th>Clock In</th>
          <th>Clock Out</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: 'John Doe', date: 'Oct 26, 2023', in: '09:02 AM', out: '06:15 PM', status: 'Present', type: 'approved' },
          { name: 'Sarah Connor', date: 'Oct 26, 2023', in: '09:45 AM', out: '06:00 PM', status: 'Late', type: 'pending' },
          { name: 'Michael Scott', date: 'Oct 26, 2023', in: '--', out: '--', status: 'Absent', type: 'rejected' }
        ].map((log, i) => (
          <tr key={i}>
            <td style={{ fontWeight: '700' }}>{log.name}</td>
            <td>{log.date}</td>
            <td>{log.in}</td>
            <td>{log.out}</td>
            <td><span className={`status-pill ${log.type}`}>{log.status}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AnnouncementsPortal = () => (
  <div className="dual-grid fade-in">
    <div className="glass-card" style={{ marginBottom: 0 }}>
      <h3 className="main-title" style={{ fontSize: '16px', marginBottom: '20px' }}>Post Announcement</h3>
      <div className="form-group">
        <label>TITLE</label>
        <input type="text" placeholder="e.g. Town Hall Meeting" className="admin-input" style={{ width: '100%' }} />
      </div>
      <div className="form-group" style={{ marginTop: '15px' }}>
        <label>MESSAGE</label>
        <textarea rows="4" className="admin-input" style={{ width: '100%', resize: 'none' }}></textarea>
      </div>
      <button className="btn-action" style={{ width: '100%', marginTop: '20px' }}>Publish Now</button>
    </div>
    <div className="glass-card" style={{ marginBottom: 0 }}>
      <h3 className="main-title" style={{ fontSize: '16px', marginBottom: '20px' }}>Recent Communications</h3>
      {[
        { title: 'New Remote Work Policy - V2.0', date: 'Oct 24, 2023', cat: 'Company Update' },
        { title: 'Annual Team Retreat 2023 Registration', date: 'Oct 20, 2023', cat: 'Event' }
      ].map((post, i) => (
        <div key={i} className="audit-item">
          <div>
            <span style={{ fontSize: '10px', color: '#FF9B44', fontWeight: '800' }}>{post.cat.toUpperCase()}</span>
            <p style={{ fontWeight: '700', margin: '4px 0' }}>{post.title}</p>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{post.date}</span>
          </div>
          <MoreVertical size={16} style={{ color: '#cbd5e1' }} />
        </div>
      ))}
    </div>
  </div>
);

export default HRManagement;