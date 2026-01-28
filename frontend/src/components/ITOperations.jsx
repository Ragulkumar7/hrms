import React, { useState } from 'react';
import { 
  Home, Truck, Shield, Box, Activity, CheckCircle2, 
  AlertCircle, XCircle, Trash2, Clock 
} from 'lucide-react';

const ITOperations = () => {
  // Main State for all Operational Tasks
  const [tasks, setTasks] = useState([
    { id: 1, sector: 'Internal', item: "Housekeeping", work: "Deep Cleaning - Floor 2", expense: 1200, status: "Pending", date: '2026-01-27' },
    { id: 2, sector: 'Internal', item: "Stationaries", work: "A4 Paper Bundle (10)", expense: 4500, status: "Approved", date: '2026-01-26' },
    { id: 3, sector: 'External', item: "Security Guard", work: "Night Shift Rotation", expense: 15000, status: "Approved", date: '2026-01-25' },
    { id: 4, sector: 'External', item: "Cab Service", work: "Airport Drop - Client", expense: 800, status: "Rejected", date: '2026-01-27' }
  ]);

  // Form & UI States
  const [newRequest, setNewRequest] = useState({ sector: 'Internal', item: 'Housekeeping', work: '', expense: '' });
  const [notification, setNotification] = useState({ message: "", type: "" }); // Replaces alert()

  // Logic: Professional Notification Trigger
  const showNotification = (msg, type) => {
    setNotification({ message: msg, type: type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  // Logic: Handle Action (Approve/Reject/Delete)
  const handleAction = (id, newStatus) => {
    if (newStatus === 'Delete') {
      setTasks(tasks.filter(t => t.id !== id));
      showNotification("Record deleted from ledger.", "error");
    } else {
      setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
      showNotification(`Task marked as ${newStatus}.`, "success");
    }
  };

  // Logic: Add New Request with Strict Validation
  const handleAddRequest = () => {
    if (newRequest.work.trim().length < 5) {
      showNotification("Work description must be at least 5 characters.", "error");
      return;
    }

    if (!newRequest.expense || parseFloat(newRequest.expense) <= 0) {
      showNotification("Please enter a valid expense amount.", "error");
      return;
    }

    const taskObj = {
      id: Date.now(),
      sector: newRequest.sector,
      item: newRequest.item,
      work: newRequest.work,
      expense: parseFloat(newRequest.expense),
      status: "Pending",
      date: new Date().toISOString().split('T')[0]
    };

    setTasks([taskObj, ...tasks]);
    showNotification("Purchase Order (PO) generated and sent to CFO.", "success");
    setNewRequest({ ...newRequest, work: '', expense: '' });
  };

  // Stats Calculation (Only Approved Expenses)
  const getSectorTotal = (sector) => 
    tasks.filter(t => t.sector === sector && t.status === 'Approved')
         .reduce((acc, curr) => acc + curr.expense, 0);

  return (
    <div className="it-view-container">
      {/* PROFESSIONAL UI NOTIFICATION (No more browser alerts) */}
      {notification.message && (
        <div className={`error-msg notification-toast ${notification.type === 'success' ? 'success-toast' : ''}`}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {notification.message}
        </div>
      )}

      <div className="page-header">
        <div>
          <h2 className="main-title">IT & Operations Control Center</h2>
          <p className="sub-title">Internal Sector: Housekeeping | External: Security & Cabs</p>
        </div>
        <button className="btn-action" style={{ background: '#dc3545' }} onClick={() => showNotification("Emergency Fund Request Sent to CFO", "success")}>
          <Activity size={18} /> Medical Emergency Fund
        </button>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-item">
          <div className="icon-box orange"><Box size={24} /></div>
          <div>
            <p className="stat-label">Internal Sector Cost (Approved)</p>
            <h3 className="stat-value">₹{getSectorTotal('Internal').toLocaleString()}</h3>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box blue"><Truck size={24} /></div>
          <div>
            <p className="stat-label">External Sector Cost (Approved)</p>
            <h3 className="stat-value">₹{getSectorTotal('External').toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '30px' }}>
        <div className="section-header">
           <h4>Generate New Operational Requisition</h4>
        </div>
        <div className="form-grid">
          <select value={newRequest.sector} onChange={(e) => setNewRequest({...newRequest, sector: e.target.value, item: e.target.value === 'Internal' ? 'Housekeeping' : 'Security Guard'})}>
            <option value="Internal">Internal Sector</option>
            <option value="External">External Sector</option>
          </select>
          <select value={newRequest.item} onChange={(e) => setNewRequest({...newRequest, item: e.target.value})}>
            {newRequest.sector === 'Internal' ? (
              <><option value="Housekeeping">Housekeeping</option><option value="Stationaries">Stationaries</option></>
            ) : (
              <><option value="Security Guard">Security Guard</option><option value="Cab Service">Cab Service</option></>
            )}
          </select>
          <input type="text" placeholder="Work Description..." value={newRequest.work} onChange={(e) => setNewRequest({...newRequest, work: e.target.value})} />
          <input type="number" placeholder="Cost (₹)" value={newRequest.expense} onChange={(e) => setNewRequest({...newRequest, expense: e.target.value})} />
          <button className="btn-action" onClick={handleAddRequest}>Generate PO</button>
        </div>
      </div>

      <div className="dual-grid">
        {['Internal', 'External'].map(sector => (
          <div className="glass-card" key={sector}>
            <div className="section-header">
              <h4>{sector === 'Internal' ? <Home size={18} /> : <Shield size={18} />} {sector} Team Ledger</h4>
            </div>
            <table className="custom-table">
              <thead>
                <tr><th>Work/Item</th><th>Cost</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {tasks.filter(t => t.sector === sector).map(t => (
                  <tr key={t.id}>
                    <td>
                      <div style={{fontWeight: '600'}}>{t.item}</div>
                      <div style={{fontSize: '12px', color: '#64748b'}}>{t.work}</div>
                    </td>
                    <td>₹{t.expense.toLocaleString()}</td>
                    <td>
                      <span className={`status-pill ${t.status.toLowerCase()}`}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{display: 'flex', gap: '8px'}}>
                      {t.status === 'Pending' && (
                        <>
                          <button onClick={() => handleAction(t.id, 'Approved')} className="icon-btn-check"><CheckCircle2 size={16} /></button>
                          <button onClick={() => handleAction(t.id, 'Rejected')} className="icon-btn-x"><XCircle size={16} /></button>
                        </>
                      )}
                      <button onClick={() => handleAction(t.id, 'Delete')} className="icon-btn-del"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ITOperations;