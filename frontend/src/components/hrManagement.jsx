import React, { useState, useMemo } from 'react';
import {
  Users, UserPlus, FileSearch, Megaphone,
  Calendar, Upload, Search, Plus,
  X, Eye, Edit, Trash2
} from 'lucide-react';

const HRManagement = () => {
  const [activeTab, setActiveTab] = useState('directory');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const tabs = [
    { id: 'directory', label: 'Employee Directory', icon: <Users size={18} /> },
    { id: 'hiring', label: 'Hiring & ATS', icon: <UserPlus size={18} /> },
    { id: 'attendance', label: 'Attendance Maintenance', icon: <Calendar size={18} /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
  ];

  const hrStyles = `
    .animate-in { animation: fadeIn 0.6s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .light-premium {
      background: linear-gradient(to bottom, #f9f7ff 0%, #f3efff 100%);
      min-height: 100vh;
      color: #1e293b;
      font-family: 'Inter', system-ui, sans-serif;
    }

    .glass-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(139,92,246,0.06);
      border: 1px solid rgba(139,92,246,0.12);
    }

    .tab-container {
      background: white;
      border-bottom: 1px solid rgba(139,92,246,0.15);
      padding: 8px 12px;
      display: flex;
      gap: 6px;
      overflow-x: auto;
    }

    .tab-btn {
      color: #64748b;
      font-weight: 600;
      padding: 10px 18px;
      border-radius: 10px;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tab-btn.active {
      color: #7c3aed;
      background: rgba(139,92,246,0.15);
    }

    .btn-action {
      background: #632881;
      color: white;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 600;
      border: none;
      cursor: pointer;
    }

    .admin-input {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid #d1d5db;
    }

    .custom-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 900px;
    }

    .custom-table th, .custom-table td {
      padding: 14px 12px;
      border-bottom: 1px solid #e5e7eb;
      text-align: left;
    }

    .status-pill {
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
    }

    .approved { background: #ecfdf5; color: #065f46; }
    .pending { background: #fff7ed; color: #c2410c; }
    .rejected { background: #fef2f2; color: #991b1b; }

    /* ⭐ FIX 1: NO BLUR */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.35);
      z-index: 999;
    }

    /* ⭐ FIX 2: MODAL ALWAYS ABOVE */
    .modal-content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 16px;
      width: 90%;
      max-width: 680px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 24px;
      z-index: 1000;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px 24px;
    }

    @media (max-width: 768px) {
      .form-grid { grid-template-columns: 1fr; }
    }
  `;

  return (
    <div className="light-premium animate-in">
      <style>{hrStyles}</style>

      <h1 style={{ fontSize: 28, fontWeight: 700 }}>HR Management</h1>

      <div className="tab-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card">
        {activeTab === 'directory' && (
          <EmployeeDirectory setShowAddEmployeeModal={setShowAddEmployeeModal} />
        )}
        {activeTab === 'hiring' && <HiringATS />}
        {activeTab === 'attendance' && <AttendanceMaint />}
        {activeTab === 'announcements' && <AnnouncementsPortal />}
      </div>

      {showAddEmployeeModal && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setShowAddEmployeeModal(false)}
          />

          <div className="modal-content">
            <h2>Add New Employee</h2>

            <div className="form-grid">

  {/* Employee ID */}
  <div className="form-group">
    <label>EMPLOYEE ID</label>
    <input
      type="text"
      className="admin-input"
      placeholder="EMP001"
      required
    />
  </div>

  {/* Full Name */}
  <div className="form-group">
    <label>FULL NAME</label>
    <input
      type="text"
      className="admin-input"
      placeholder="Enter full name"
      required
    />
  </div>

  {/* Email ID */}
  <div className="form-group">
    <label>EMAIL ID</label>
    <input
      type="email"
      className="admin-input"
      placeholder="employee@company.com"
      required
    />
  </div>

  {/* Role – IT Sector */}
  <div className="form-group">
    <label>ROLE</label>
    <select className="admin-input" required>
      <option value="">Select Role</option>
      <option>Software Developer</option>
      <option>Frontend Developer</option>
      <option>Backend Developer</option>
      <option>Full Stack Developer</option>
      <option>QA / Tester</option>
      <option>DevOps Engineer</option>
      <option>UI / UX Designer</option>
      <option>HR</option>
      <option>System Admin</option>
    </select>
  </div>

  {/* Designation */}
  <div className="form-group">
    <label>DESIGNATION</label>
    <select className="admin-input" required>
      <option value="">Select Designation</option>
      <option>Employee</option>
      <option>Team Lead (TL)</option>
      <option>Manager</option>
      <option>Accounts</option>
      <option>Sales</option>
    </select>
  </div>

  {/* Department */}
  <div className="form-group">
    <label>DEPARTMENT</label>
    <select className="admin-input" required>
      <option value="">Select Department</option>
      <option>Engineering</option>
      <option>IT Support</option>
      <option>HR</option>
      <option>Finance</option>
      <option>Sales</option>
      <option>Operations</option>
    </select>
  </div>

  {/* Joining Date */}
  <div className="form-group">
    <label>JOINING DATE</label>
    <input type="date" className="admin-input" required />
  </div>

  {/* Salary */}
  <div className="form-group">
    <label>SALARY (₹)</label>
    <input
      type="number"
      className="admin-input"
      placeholder="Enter monthly salary"
      min="0"
      required
    />
  </div>

</div>


            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button className="btn-action" onClick={() => setShowAddEmployeeModal(false)}>
                Save Employee
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const EmployeeDirectory = ({ setShowAddEmployeeModal }) => (
  <div className="fade-in">
    <div className="page-header" style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '20px', color: '#1e293b', fontWeight: '700' }}>Staff Profiles</h3>
      <button 
        className="btn-action flex items-center gap-2" 
        onClick={() => setShowAddEmployeeModal(true)}
      >
        <Plus size={18} /> Add New Employee
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="custom-table">
        <thead>
          <tr>
            <th>EMP ID</th>
            <th>NAME</th>
            <th>ROLE</th>
            <th>DESIGNATION</th>
            <th>STATUS</th>
            <th style={{ textAlign: 'right' }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: '#EMP001', name: 'John Doe', role: 'Employee', designation: 'Software Engineer', status: 'Active', initials: 'JD' },
            { id: '#EMP002', name: 'Jane Smith', role: 'TL', designation: 'Product Manager', status: 'Active', initials: 'JS' },
            { id: '#EMP003', name: 'Robert Johnson', role: 'Manager', designation: 'UI/UX Lead', status: 'On Leave', initials: 'RJ' },
            { id: '#EMP004', name: 'Priya Sharma', role: 'HR', designation: 'HR Executive', status: 'Active', initials: 'PS' },
          ].map((emp) => (
            <tr key={emp.id}>
              <td style={{ fontWeight: '600', color: '#6b7280' }}>{emp.id}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar-small" style={{ background: '#ede9fe', color: '#7c3aed', fontWeight: 'bold' }}>
                    {emp.initials}
                  </div>
                  <span style={{ fontWeight: '700', color: '#1e293b' }}>{emp.name}</span>
                </div>
              </td>
              <td style={{ color: '#374151' }}>{emp.role}</td>
              <td style={{ color: '#374151' }}>{emp.designation}</td>
              <td>
                <span className={`status-pill ${emp.status === 'Active' ? 'approved' : 'pending'}`}>
                  {emp.status}
                </span>
              </td>
              <td style={{ textAlign: 'right', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button className="action-btn" title="View" onClick={() => alert(`Viewing ${emp.name}`)}>
                  <Eye size={18} />
                </button>
                <button className="action-btn" title="Edit" onClick={() => alert(`Editing ${emp.name}`)}>
                  <Edit size={18} />
                </button>
                <button className="action-btn" title="Delete" onClick={() => alert(`Deleting ${emp.name}`)}>
                  <Trash2 size={18} />
                </button>
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
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  const handleBulkUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    if (files.length > 0) {
      alert(`Selected ${files.length} resume(s) for bulk upload:\n${files.map(f => f.name).join('\n')}\n\n(Implement actual parsing/upload logic here)`);
      // → In real app: send files to backend via FormData
    }
  };

  return (
    <div className="fade-in">
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="stat-item">
          <div className="icon-box orange"><Users size={28} /></div>
          <div>
            <p style={{ color: '#64748b', margin: 0 }}>Open Positions</p>
            <h2 style={{ color: '#1e293b', margin: '4px 0 0' }}>14</h2>
          </div>
        </div>
        <div className="stat-item">
          <div className="icon-box blue"><FileSearch size={28} /></div>
          <div>
            <p style={{ color: '#64748b', margin: 0 }}>Screened</p>
            <h2 style={{ color: '#1e293b', margin: '4px 0 0' }}>482</h2>
          </div>
        </div>
        <div className="stat-item">
          <div className="icon-box green"><Calendar size={28} /></div>
          <div>
            <p style={{ color: '#64748b', margin: 0 }}>Interviews</p>
            <h2 style={{ color: '#1e293b', margin: '4px 0 0' }}>28</h2>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={18} />
          <input
            type="text"
            placeholder="Search candidates or skills..."
            className="admin-input"
            style={{ paddingLeft: '48px' }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            id="bulk-upload"
            onChange={handleBulkUpload}
          />
          <button
            className="btn-action flex items-center gap-2"
            onClick={() => document.getElementById('bulk-upload').click()}
          >
            <Upload size={18} /> Bulk Upload
          </button>

          {selectedFiles.length > 0 && (
            <div style={{ marginTop: '10px', fontSize: '13px', color: '#475569' }}>
              Selected: {selectedFiles.map(f => f.name).join(', ')}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="custom-table">
          <thead>
            <tr>
              <th>CANDIDATE</th>
              <th>MATCHED SKILLS</th>
              <th>EXP</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredResumes.map((res, i) => (
              <tr key={i}>
                <td style={{ fontWeight: '600', color: '#1e293b' }}>{res.name}</td>
                <td style={{ color: '#f97316', fontWeight: '600' }}>{res.skills}</td>
                <td style={{ color: '#374151' }}>{res.experience}</td>
                <td>
                  <span className="status-pill" style={{ background: '#eff6ff', color: '#2563eb' }}>
                    {res.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ... rest of your components (AttendanceMaint, AnnouncementsPortal) remain unchanged ...

const AttendanceMaint = () => {
  const [selectedMonth, setSelectedMonth] = useState('October 2023');
  const [showModal, setShowModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);

  const attendanceData = [
    { name: 'John Doe (Employee)', date: 'Oct 26, 2023', in: '09:02 AM', out: '06:15 PM', status: 'Present', type: 'approved', totalLeaves: 2, history: [{ date: 'Oct 10', reason: 'Sick Leave' }, { date: 'Oct 15', reason: 'Personal' }] },
    { name: 'Jane Smith (TL)', date: 'Oct 26, 2023', in: '09:45 AM', out: '06:00 PM', status: 'Late', type: 'pending', totalLeaves: 1, history: [{ date: 'Oct 20', reason: 'Family Function' }] },
    { name: 'Robert Johnson (Manager)', date: 'Oct 26, 2023', in: '--', out: '--', status: 'Absent', type: 'rejected', totalLeaves: 5, history: [{ date: 'Oct 5', reason: 'Medical Leave' }, { date: 'Oct 12', reason: 'Sick' }, { date: 'Oct 18', reason: 'Personal' }, { date: 'Oct 22', reason: 'Official Work' }, { date: 'Oct 25', reason: 'Leave' }] },
    { name: 'Priya Sharma (HR)', date: 'Oct 25, 2023', in: '08:55 AM', out: '05:45 PM', status: 'Present', type: 'approved', totalLeaves: 0, history: [] },
    { name: 'Arun Kumar (Employee)', date: 'Oct 24, 2023', in: '10:15 AM', out: '05:30 PM', status: 'Late', type: 'pending', totalLeaves: 3, history: [{ date: 'Oct 8', reason: 'Sick' }, { date: 'Oct 14', reason: 'Vacation' }, { date: 'Oct 21', reason: 'Personal' }] },
    { name: 'Meera Nair (TL)', date: 'Oct 23, 2023', in: '09:10 AM', out: '06:20 PM', status: 'Present', type: 'approved', totalLeaves: 1, history: [{ date: 'Oct 16', reason: 'Personal Leave' }] },
    { name: 'Vikram Singh (Employee)', date: 'Oct 22, 2023', in: '09:30 AM', out: '05:50 PM', status: 'Present', type: 'approved', totalLeaves: 2, history: [{ date: 'Oct 9', reason: 'Sick' }, { date: 'Oct 17', reason: 'Family' }] },
    { name: 'Sneha Menon (HR)', date: 'Oct 21, 2023', in: '--', out: '--', status: 'Absent', type: 'rejected', totalLeaves: 4, history: [{ date: 'Oct 7', reason: 'Medical' }, { date: 'Oct 13', reason: 'Sick' }, { date: 'Oct 19', reason: 'Personal' }, { date: 'Oct 24', reason: 'Leave' }] },
    { name: 'Karthik Raj (Employee)', date: 'Oct 20, 2023', in: '09:20 AM', out: '06:10 PM', status: 'Present', type: 'approved', totalLeaves: 0, history: [] },
    { name: 'Anjali Nair (Manager)', date: 'Oct 19, 2023', in: '08:50 AM', out: '05:40 PM', status: 'Present', type: 'approved', totalLeaves: 1, history: [{ date: 'Oct 11', reason: 'Personal' }] },
  ];

  const monthShort = selectedMonth.split(' ')[0].slice(0, 3);
  const filteredData = attendanceData.filter(log => log.date.includes(monthShort));

  // Count Present days **only in selected month**
  const presentDaysByEmployee = {};
  filteredData.forEach(log => {
    if (log.status === 'Present') {
      const employee = log.name;
      presentDaysByEmployee[employee] = (presentDaysByEmployee[employee] || 0) + 1;
    }
  });

  const viewHistory = (history) => {
    setSelectedHistory(history);
    setShowModal(true);
  };

  return (
    <div className="fade-in">
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div className="flex gap-4 flex-wrap">
          <select className="admin-input" onChange={(e) => setSelectedMonth(e.target.value)}>
            <option>October 2023</option>
            <option>September 2023</option>
            <option>August 2023</option>
          </select>
          <select className="admin-input">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>HR</option>
          </select>
          <div className="admin-input" style={{ minWidth: '160px' }}>{selectedMonth}</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="custom-table">
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>DATE</th>
              <th>CLOCK IN</th>
              <th>CLOCK OUT</th>
              <th>STATUS</th>
              <th>TOTAL LEAVES (MONTH)</th>
              <th>TOTAL DAYS PRESENT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((log, i) => (
              <tr key={i}>
                <td style={{ fontWeight: '700', color: '#1e293b' }}>{log.name}</td>
                <td style={{ color: '#374151' }}>{log.date}</td>
                <td style={{ color: '#374151' }}>{log.in}</td>
                <td style={{ color: '#374151' }}>{log.out}</td>
                <td>
                  <span className={`status-pill ${log.type}`}>{log.status}</span>
                </td>
                <td style={{ fontWeight: '600', color: log.totalLeaves > 2 ? '#ef4444' : '#10b981' }}>
                  {log.totalLeaves}
                </td>
                <td style={{ fontWeight: '600', color: '#10b981', textAlign: 'center' }}>
                  {presentDaysByEmployee[log.name] || 0}
                </td>
                <td>
                  {log.history.length > 0 ? (
                    <button
                      style={{ color: '#7c3aed', fontWeight: '500', cursor: 'pointer', background: 'none', border: 'none' }}
                      onClick={() => viewHistory(log.history)}
                    >
                      View History
                    </button>
                  ) : (
                    <span style={{ color: '#9ca3af' }}>No leaves</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowModal(false)} />
          <div className="modal-content" style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '20px', color: '#1e293b' }}>Leave History</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={22} /></button>
            </div>
            {selectedHistory.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                {selectedHistory.map((item, idx) => (
                  <li key={idx} style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <strong>{item.date}</strong>: {item.reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#6b7280', textAlign: 'center' }}>No leave records found.</p>
            )}
            <div style={{ textAlign: 'right' }}>
              <button className="btn-action" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AnnouncementsPortal = () => (
  <div className="dual-grid fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
    <div className="glass-card">
      <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>Post Announcement</h3>
      <div className="form-group">
        <label style={{ color: '#4b5563' }}>TITLE</label>
        <input type="text" className="admin-input" placeholder="e.g. Town Hall Meeting" />
      </div>
      <div className="form-group" style={{ marginTop: '16px' }}>
        <label style={{ color: '#4b5563' }}>MESSAGE</label>
        <textarea rows="5" className="admin-input" style={{ resize: 'vertical' }}></textarea>
      </div>
      <button className="btn-action" style={{ width: '100%', marginTop: '24px' }}>Publish Now</button>
    </div>

    <div className="glass-card">
      <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>Recent Communications</h3>
      {[
        { title: 'New Remote Work Policy - V2.0', date: 'Oct 24, 2023', cat: 'Company Update' },
        { title: 'Annual Team Retreat 2023 Registration', date: 'Oct 20, 2023', cat: 'Event' }
      ].map((post, i) => (
        <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid #e5e7eb' }}>
          <span style={{ fontSize: '11px', color: '#f97316', fontWeight: '800' }}>{post.cat.toUpperCase()}</span>
          <p style={{ color: '#1e293b', fontWeight: '600', margin: '6px 0' }}>{post.title}</p>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{post.date}</span>
        </div>
      ))}
    </div>
  </div>
);

export default HRManagement;