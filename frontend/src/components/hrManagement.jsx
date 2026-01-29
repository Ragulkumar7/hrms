import React, { useState, useMemo } from 'react';
import {
  Users, UserPlus, FileSearch, Megaphone,
  Calendar, Upload, Search, MoreVertical, Plus,
  X, Eye, Edit, Trash2
} from 'lucide-react';

const HRManagement = () => {
  const [activeTab, setActiveTab] = useState('directory');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const tabs = [
    { id: 'directory', label: 'Employee Directory', icon: <Users size={18} /> },
    { id: 'hiring', label: 'Hiring & ATS', icon: <UserPlus size={18} /> },
    { id: 'attendance', label: 'Attendance Maintanance', icon: <Calendar size={18} /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
  ];

  const hrStyles = `
    .animate-in { animation: fadeIn 0.6s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    .light-premium { background: linear-gradient(to bottom, #f9f7ff 0%, #f3efff 100%); min-height: 100vh; color: #1e293b; font-family: 'Inter', system-ui, sans-serif; }
    .glass-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px rgba(139,92,246,0.06); border: 1px solid rgba(139,92,246,0.12); }
    .tab-container { background: white; border-bottom: 1px solid rgba(139,92,246,0.15); border-radius: 12px 12px 0 0; padding: 8px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); overflow-x: auto; white-space: nowrap; }
    .tab-btn { color: #64748b; font-weight: 600; padding: 10px 18px; border-radius: 10px; transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 8px; }
    .tab-btn:hover { color: #7c3aed; background: rgba(139,92,246,0.07); }
    .tab-btn.active { color: #7c3aed; background: rgba(139,92,246,0.15); font-weight: 700;position: relative;}
    .tab-btn.active::after {content: position: absolute;bottom: 0;left: 0;width: 100%;height: 3px;background: transparent;   /* no visible line */}

    .btn-action { background: #632881ff; color: white; padding: 10px 20px; border-radius: 10px; font-weight: 600; border: none; transition: all 0.2s; white-space: nowrap; }
    .btn-action:hover { background: #462f55ff; transform: translateY(-1px); }

    .admin-input { background: white; border: 1px solid #d1d5db; color: #1f2937; padding: 10px 14px; border-radius: 10px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.04); transition: all 0.2s; width: 100%; box-sizing: border-box; }
    .admin-input:focus { border-color: #c084fc; box-shadow: 0 0 0 3px rgba(192,132,252,0.15); outline: none; }

    .custom-table { width: 100%; border-collapse: collapse; min-width: 900px; }
    .custom-table th { color: #475569; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; padding: 14px 12px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; text-align: left; white-space: nowrap; }
    .custom-table td { color: #1e293b; padding: 14px 12px; border-bottom: 1px solid #f3f4f6; white-space: nowrap; }
    .custom-table tr:hover { background: #f9fafb; }

    .status-pill { padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; }
    .approved  { background: #ecfdf5; color: #065f46; }
    .pending   { background: #fff7ed; color: #c2410c; }
    .rejected  { background: #fef2f2; color: #991b1b; }

    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.25); z-index: 9999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
    .modal-content { background: white; border-radius: 16px; width: 90%; max-width: 680px; max-height: 90vh; overflow-y: auto; padding: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.15); border: 1px solid rgba(139,92,246,0.15); z-index: 10000; }
    .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px 24px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group label { font-size: 12px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .close-btn { background: none; border: none; color: #9ca3af; cursor: pointer; font-size: 24px; transition: color 0.2s; }
    .close-btn:hover { color: #f97316; }

    .action-btn { background: none; border: none; cursor: pointer; color: #64748b; padding: 6px; border-radius: 6px; transition: all 0.2s; }
    .action-btn:hover { background: rgba(139,92,246,0.1); color: #7c3aed; }

    @media (max-width: 1024px) {
      .tab-container { overflow-x: auto; white-space: nowrap; padding-bottom: 12px; }
      .tab-btn { padding: 8px 14px; font-size: 13px; }
    }
    @media (max-width: 768px) {
      .page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
      .custom-table th, .custom-table td { padding: 10px 8px; font-size: 13px; }
      .glass-card { padding: 16px; }
      .btn-action { padding: 10px 16px; font-size: 14px; }
      .form-grid { grid-template-columns: 1fr; gap: 16px; }
      .modal-content { padding: 20px; }
    }
    @media (max-width: 480px) {
      h1 { font-size: 24px; }
      .modal-content { padding: 16px; }
    }
  `;

  return (
    <div className="light-premium animate-in">
      <style>{hrStyles}</style>

      <div className="page-header" style={{ marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>HR Management</h1>
          <p style={{ color: '#64748b', marginTop: '6px' }}>
            Manage your workforce, hiring, and internal communications.
          </p>
        </div>
      </div>

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

      <div className="glass-card">
        {activeTab === 'directory' && <EmployeeDirectory setShowAddEmployeeModal={setShowAddEmployeeModal} />}
        {activeTab === 'hiring' && <HiringATS />}
        {activeTab === 'attendance' && <AttendanceMaint />}
        {activeTab === 'announcements' && <AnnouncementsPortal />}
      </div>

      {showAddEmployeeModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowAddEmployeeModal(false)} />
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b' }}>Add New Employee</h2>
              <button 
                onClick={() => setShowAddEmployeeModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
              >
                <X size={24} />
              </button>
            </div>

            <form>
              <div className="form-grid">
                <div className="form-group">
                  <label>FULL NAME</label>
                  <input type="text" className="admin-input" placeholder="Enter full name" required />
                </div>
                <div className="form-group">
                  <label>EMAIL ADDRESS</label>
                  <input type="email" className="admin-input" placeholder="employee@company.com" required />
                </div>
                <div className="form-group">
                  <label>ROLE</label>
                  <select className="admin-input" required>
                    <option value="">Select Role</option>
                    <option>Employee</option>
                    <option>TL (Team Lead)</option>
                    <option>Manager</option>
                    <option>HR</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>DESIGNATION</label>
                  <input type="text" className="admin-input" placeholder="e.g. Senior Developer" required />
                </div>
                <div className="form-group">
                  <label>DEPARTMENT</label>
                  <select className="admin-input" required>
                    <option value="">Select Department</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Product</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>HR</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>JOINING DATE</label>
                  <input type="date" className="admin-input" required />
                </div>
                <div className="form-group">
                  <label>BASIC PAY (₹)</label>
                  <input type="number" className="admin-input" placeholder="Enter basic salary" min="0" required />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeModal(false)}
                  style={{
                    padding: '10px 28px',
                    background: '#f3f4f6',
                    color: '#4b5563',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                    flex: '1 1 auto',
                    minWidth: '120px'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-action"
                  style={{ padding: '10px 32px', flex: '1 1 auto', minWidth: '140px' }}
                  onClick={() => {
                    alert('New employee added! (Connect your backend / state logic here)');
                    setShowAddEmployeeModal(false);
                  }}
                >
                  Add Employee
                </button>
              </div>
            </form>
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