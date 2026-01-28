import React, { useState } from 'react';
import { 
  FileSpreadsheet, TrendingUp, ShieldCheck, Printer, 
  Landmark, Save, Calculator, History, AlertCircle
} from 'lucide-react';

const Accounts = () => {
  // Updated State: Tracking 'leaves' instead of 'attnd'
  const [employees, setEmployees] = useState([
    { id: "ACC-101", name: "Varshith", base: 85000, leaves: 1, leaveType: 'Casual', hike: 10000, lpa: 10.2 },
    { id: "ACC-102", name: "Aditi Rao", base: 55000, leaves: 4, leaveType: 'Medical', hike: 0, lpa: 6.6 },
    { id: "ACC-103", name: "Sanjay Kumar", base: 72000, leaves: 0, leaveType: 'None', hike: 5000, lpa: 8.4 },
  ]);

  const [transactions] = useState([
    { id: 1, type: 'Outcome', category: 'Payroll', amount: 125000, method: 'Account', gst: 'No GST' },
    { id: 2, type: 'Income', category: 'Client Billing', amount: 500000, method: 'Account', gst: 'GST Claimed' },
  ]);

  // Handle updates
  const handleUpdate = (id, field, value) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, [field]: value } : emp
    ));
  };

  // Professional Tax (PT) Logic
  const calculatePT = (lpa) => (lpa > 10 ? 2000 : lpa > 5 ? 1000 : 0);

  // --- NEW NET PAY CALCULATION (LOP Logic) ---
  const calculateNet = (emp) => {
    const totalDays = 30; // Standard calculation month
    const allowedCL = 2;  // Free Casual Leaves
    
    // Logic: If leaves > 2, the extra days are LOP
    const lopDays = emp.leaves > allowedCL ? (emp.leaves - allowedCL) : 0;
    const paidDays = totalDays - lopDays; // e.g., 30 - 2 LOP = 28 Paid Days

    const dailyRate = emp.base / 30;
    const gross = (dailyRate * paidDays) + parseFloat(emp.hike || 0);
    
    const deductions = calculatePT(emp.lpa) + (gross * 0.10); // PT + 10% TDS
    return Math.floor(gross - deductions);
  };

  return (
    <div className="accounts-page-container">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-title">
          <h2 className="main-title">Accounts & Financial Control</h2>
          <p className="sub-title">CFO Administrative Portal | Global Payroll Management</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => window.print()}><Printer size={16} /> Print Slips</button>
          <button className="btn-action"><FileSpreadsheet size={16} /> Export to Auditor</button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="stats-grid">
        <div className="glass-card stat-item">
          <div className="icon-box blue"><TrendingUp size={24} /></div>
          <div>
            <p className="stat-label">Projected Payroll</p>
            <h3 className="stat-value">₹{employees.reduce((acc, emp) => acc + calculateNet(emp), 0).toLocaleString()}</h3>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box green"><ShieldCheck size={24} /></div>
          <div>
            <p className="stat-label">Tax Compliance</p>
            <h3 className="stat-value">TDS/GST Active</h3>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box orange"><Landmark size={24} /></div>
          <div>
            <p className="stat-label">Organization Balance</p>
            <h3 className="stat-value">₹45,20,000</h3>
          </div>
        </div>
      </div>

      {/* Admin Management Table */}
      <div className="glass-card">
        <div className="section-header">
          <h4><Calculator size={18} /> Admin Payroll Management</h4>
          <span className="badge-cfo">Live Calculation</span>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>Base Salary (₹)</th>
              <th>Leaves Taken</th>
              <th>Leave Type</th>
              <th>LOP Status</th>
              <th>Net Payable (Auto)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => {
               // Calculate LOP just for display in the table
               const lopDays = Math.max(0, emp.leaves - 2);
               
               return (
                <tr key={emp.id}>
                  <td><strong>{emp.id}</strong></td>
                  <td>{emp.name}</td>
                  
                  {/* Base Salary Input */}
                  <td>
                    <input 
                      type="number" 
                      className="admin-input"
                      value={emp.base} 
                      onChange={(e) => handleUpdate(emp.id, 'base', parseFloat(e.target.value))}
                    />
                  </td>

                  {/* Leaves Input */}
                  <td>
                    <input 
                      type="number" 
                      className="admin-input small"
                      value={emp.leaves} 
                      onChange={(e) => handleUpdate(emp.id, 'leaves', parseFloat(e.target.value))}
                    />
                  </td>

                  {/* Leave Type Dropdown */}
                  <td>
                    <select 
                      className="admin-input" 
                      style={{width: '110px', fontSize: '13px'}}
                      value={emp.leaveType}
                      onChange={(e) => handleUpdate(emp.id, 'leaveType', e.target.value)}
                    >
                      <option value="None">None</option>
                      <option value="Casual">Casual</option>
                      <option value="Medical">Medical</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                  </td>

                  {/* LOP Indicator */}
                  <td>
                    {lopDays > 0 ? (
                      <span className="status-pill rejected" style={{display:'flex', alignItems:'center', gap:'5px', fontSize:'11px'}}>
                        <AlertCircle size={12}/> -{lopDays} Days Pay
                      </span>
                    ) : (
                      <span className="status-pill active" style={{fontSize:'11px'}}>Full Pay</span>
                    )}
                  </td>

                  <td><strong className="final-pay">₹{calculateNet(emp).toLocaleString()}</strong></td>
                  <td><button className="icon-btn-check"><Save size={18} /></button></td>
                </tr>
               );
            })}
          </tbody>
        </table>
      </div>

      {/* Audit & GST Section */}
      <div className="dual-grid">
        <div className="glass-card">
          <h4><History size={18} /> Audit Summary</h4>
          <div className="audit-item"><span>Hard Cash Reserve</span> <strong>₹25,000</strong></div>
          <div className="audit-item"><span>Bank Transfers</span> <strong>₹12,20,000</strong></div>
          <div className="audit-item"><span>GST Liability</span> <strong style={{color: 'green'}}>Cleared</strong></div>
        </div>
        <div className="glass-card">
          <h4>GST & TDS Reporting</h4>
          <p className="text-gray">Monthly GST liability and Tax Deducted at Source reports generated for the current cycle.</p>
          <button className="btn-secondary" style={{width: '100%', marginTop: '15px'}}>Generate Monthly Tax Report</button>
        </div>
      </div>
    </div>
  );
};

export default Accounts;