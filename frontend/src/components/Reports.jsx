import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; 
import { 
  FileText, Download, Printer, FileSpreadsheet, 
  PieChart, TrendingUp, Calendar, Shield, CheckCircle 
} from 'lucide-react';

const Reports = () => {
  const { user } = useUser();
  const [downloading, setDownloading] = useState(null);

  // --- MOCK DATA: RECENT REPORTS ---
  const recentReports = [
    { id: 1, name: 'Monthly Payroll_Jan2026.pdf', type: 'Financial', date: '2026-02-01', size: '1.2 MB', generatedBy: 'Admin' },
    { id: 2, name: 'Team_Attendance_Feb_W1.xlsx', type: 'Attendance', date: '2026-02-07', size: '450 KB', generatedBy: 'Karthik (TL)' },
    { id: 3, name: 'Q1_Performance_Review.pdf', type: 'Performance', date: '2026-01-15', size: '2.8 MB', generatedBy: 'Admin' },
  ];

  // --- SIMULATE DOWNLOAD ---
  const handleDownload = (reportId) => {
    setDownloading(reportId);
    setTimeout(() => {
      setDownloading(null);
      alert("Report downloaded successfully!");
    }, 1500);
  };

  // --- REPORT CATEGORIES CONFIG ---
  const reportCategories = [
    {
      title: 'Attendance & Leave',
      description: 'Monthly logs, LOP summary, and absentee reports.',
      icon: <Calendar size={24} className="text-blue-600"/>,
      color: 'blue',
      allowed: ['Manager', 'TL']
    },
    {
      title: 'Payroll & Finance',
      description: 'Salary slips, Tax deductions (TDS), and bank transfer sheets.',
      icon: <FileSpreadsheet size={24} className="text-green-600"/>,
      color: 'green',
      allowed: ['Manager'] // STRICTLY MANAGER ONLY
    },
    {
      title: 'Performance Analytics',
      description: 'Efficiency trends, project completion rates, and appraisals.',
      icon: <TrendingUp size={24} className="text-purple-600"/>,
      color: 'purple',
      allowed: ['Manager', 'TL']
    },
    {
      title: 'Audit & Compliance',
      description: 'System logs, role changes, and access history.',
      icon: <Shield size={24} className="text-orange-600"/>,
      color: 'orange',
      allowed: ['Manager']
    }
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="main-title">Reports & Analytics</h2>
          <p className="sub-title">Generate and export system data.</p>
        </div>
        <div className="header-actions">
           <button className="btn-secondary" onClick={() => window.print()}>
             <Printer size={16}/> Print View
           </button>
        </div>
      </div>

      {/* --- QUICK STATS --- */}
      <div className="stats-grid">
        <div className="glass-card stat-item">
          <div className="icon-box blue"><FileText size={20} /></div>
          <div><p className="stat-label">Reports Generated</p><h3 className="stat-value">124</h3></div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box green"><PieChart size={20} /></div>
          <div><p className="stat-label">Data Usage</p><h3 className="stat-value">450 MB</h3></div>
        </div>
      </div>

      {/* --- GENERATE NEW REPORTS (GRID) --- */}
      <div className="glass-card" style={{marginBottom: '30px'}}>
        <div className="section-header">
          <h4><FileText size={18} /> Generate New Report</h4>
        </div>
        
        <div className="reports-grid">
          {reportCategories.map((cat, index) => {
            // Role Check
            if (!cat.allowed.includes(user.role)) return null;

            return (
              <div key={index} className={`report-card border-${cat.color}`}>
                <div className="rep-icon-wrapper" style={{background: `var(--bg-${cat.color})`}}>
                  {cat.icon}
                </div>
                <div className="rep-content">
                  <h5>{cat.title}</h5>
                  <p>{cat.description}</p>
                  <button className="btn-download" onClick={() => handleDownload(`cat-${index}`)}>
                    {downloading === `cat-${index}` ? 'Generating...' : 'Download CSV'}
                  </button>
                  {cat.title === 'Payroll & Finance' && (
                     <button className="btn-link">View PDF Summary</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- RECENT HISTORY TABLE --- */}
      <div className="glass-card">
        <div className="section-header">
          <h4><Download size={18} /> Download History</h4>
        </div>
        
        <table className="custom-table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Category</th>
              <th>Generated Date</th>
              <th>Size</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((rep) => {
              // Hide financial reports history from TLs
              if (user.role !== 'Manager' && rep.type === 'Financial') return null;

              return (
                <tr key={rep.id}>
                  <td style={{fontWeight: '600', color: '#334155'}}>
                    <FileText size={14} style={{marginRight:'8px', verticalAlign:'middle'}}/>
                    {rep.name}
                  </td>
                  <td>
                    <span className={`status-pill ${rep.type === 'Financial' ? 'active' : 'pending'}`}>
                      {rep.type}
                    </span>
                  </td>
                  <td style={{color: '#64748b'}}>{rep.date}</td>
                  <td style={{fontFamily: 'monospace', fontSize: '12px'}}>{rep.size}</td>
                  <td>
                    <button 
                      className="icon-btn-check" 
                      onClick={() => handleDownload(rep.id)}
                      disabled={downloading === rep.id}
                    >
                      {downloading === rep.id ? <span className="loader-spin">↻</span> : <Download size={16}/>}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;