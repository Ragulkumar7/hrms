import React, { useState } from 'react';
import { 
  Home, Shield, User, MapPin, Clock, PlusCircle 
} from 'lucide-react';

const ITOperations = () => {
  // 1. REGISTRY: This stores the "Official" person for each slot
  const [registry, setRegistry] = useState({
    Internal: {
      Housekeeping: "Rahul Kumar",
      Electrician: "Suresh Raina",
      Stationaries: "Vikas Khanna"
    },
    External: {
      "Security Guard": "Amit Singh",
      "Cab Service": "Rajesh Driver"
    }
  });

  const [activeTab, setActiveTab] = useState('Internal');
  const [ledgerItemFilter, setLedgerItemFilter] = useState('Housekeeping');
  const [newEmployee, setNewEmployee] = useState({ sector: 'Internal', role: '', name: '' });

  // 2. TASKS: Stores historical assignments
  const [tasks, setTasks] = useState([
    { id: 1, sector: 'Internal', item: "Housekeeping", name: "Rahul Kumar", area: "Floor 2 - Pantry", time: "09:00 AM", expense: 1200 }
  ]);

  const [newRequest, setNewRequest] = useState({ 
    sector: 'Internal', item: 'Housekeeping', name: "", 
    area: '', time: '', expense: '' 
  });
  
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleRegisterEmployee = () => {
    if (!newEmployee.role || !newEmployee.name) {
      showNotification("Enter both Category and Name", "error");
      return;
    }
    setRegistry(prev => ({
      ...prev,
      [newEmployee.sector]: { ...prev[newEmployee.sector], [newEmployee.role]: newEmployee.name }
    }));
    showNotification(`Registered ${newEmployee.name} as ${newEmployee.role}`, "success");
    setNewEmployee({ ...newEmployee, role: '', name: '' });
  };

  const handleTabChange = (sector) => {
    setActiveTab(sector);
    const roles = Object.keys(registry[sector]);
    setLedgerItemFilter(roles[0]); 
    setNewRequest({ ...newRequest, sector, item: roles[0], name: "", area: '', time: '', expense: '' });
  };

  const showNotification = (msg, type) => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleAddRequest = () => {
    if (!newRequest.name || !newRequest.area || !newRequest.time || !newRequest.expense) {
      showNotification("Please fill all fields", "error");
      return;
    }
    const taskObj = { id: Date.now(), ...newRequest, expense: parseFloat(newRequest.expense) || 0 };
    setTasks([taskObj, ...tasks]);
    showNotification("Task assigned", "success");
    setNewRequest({ ...newRequest, name: '', area: '', time: '', expense: '' });
  };

  // 3. UPDATED LEDGER TABLE LOGIC
  const LedgerTable = ({ sectorName, icon: Icon, sectorType }) => {
    const roles = Object.keys(registry[sectorType]);
    
    // Get the name of the person registered for the current filter (e.g., Electrician)
    const registeredName = registry[sectorType][ledgerItemFilter];

    // Get historical tasks for this category
    const filteredTasks = tasks.filter(t => t.sector === sectorType && t.item === ledgerItemFilter);

    return (
      <div className="glass-card" style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0 }}><Icon size={18} /> {sectorName} Ledger</h4>
          <select value={ledgerItemFilter} onChange={(e) => setLedgerItemFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            {roles.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8fafc', textAlign: 'left' }}>
            <tr>
              <th style={thStyle}>Worker & Area</th>
              <th style={thStyle}>Work Type</th>
              <th style={thStyle}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {/* ROW 1: ALWAYS SHOW THE REGISTERED MEMBER */}
            {registeredName && (
              <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#f0f9ff' }}>
                <td style={tdStyle}>
                  <div style={{ fontWeight: 'bold', color: '#1e40af' }}>{registeredName} (Registered)</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Primary Member</div>
                </td>
                <td style={tdStyle}>
                  <div>{ledgerItemFilter}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Active</div>
                </td>
                <td style={tdStyle}>--</td>
              </tr>
            )}

            {/* SUBSEQUENT ROWS: SHOW ASSIGNED TASKS */}
            {filteredTasks.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={tdStyle}>
                  <div style={{ fontWeight: '600' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}><MapPin size={10} /> {t.area}</div>
                </td>
                <td style={tdStyle}>
                  <div>{t.item}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}><Clock size={10} /> {t.time}</div>
                </td>
                <td style={tdStyle}>₹{t.expense}</td>
              </tr>
            ))}

            {/* IF NO ONE IS REGISTERED AND NO TASKS */}
            {!registeredName && filteredTasks.length === 0 && (
               <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>No data found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="it-view-container" style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {notification.message && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', padding: '12px 24px', borderRadius: '8px', backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444', color: 'white', zIndex: 9999 }}>
          {notification.message}
        </div>
      )}

      {/* REGISTER SECTION */}
      <div style={{ marginBottom: '25px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: 'white' }}>
        <h4 style={{ marginTop: 0, color: '#2563eb' }}><PlusCircle size={20} /> Register New Member to Department</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '15px', alignItems: 'end' }}>
          <select value={newEmployee.sector} onChange={(e) => setNewEmployee({...newEmployee, sector: e.target.value})} style={inputStyle}>
            <option value="Internal">Internal Team</option>
            <option value="External">External Team</option>
          </select>
          <input type="text" placeholder="Category (e.g. Electrician)" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} style={inputStyle} />
          <input type="text" placeholder="Worker Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} style={inputStyle} />
          <button onClick={handleRegisterEmployee} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', height: '42px', padding: '0 25px', borderRadius: '6px', fontWeight: 'bold' }}>Register</button>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button style={activeTab === 'Internal' ? activeTabStyle : inactiveTabStyle} onClick={() => handleTabChange('Internal')}>Internal Team</button>
        <button style={activeTab === 'External' ? activeTabStyle : inactiveTabStyle} onClick={() => handleTabChange('External')}>External Team</button>
      </div>

      {/* ASSIGN TASK FORM */}
      <div style={{ marginBottom: '30px', padding: '25px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ marginTop: 0 }}>Assign {activeTab} Task</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          <select value={newRequest.item} onChange={(e) => setNewRequest({...newRequest, item: e.target.value})} style={inputStyle}>
            {Object.keys(registry[activeTab]).map(role => <option key={role} value={role}>{role}</option>)}
          </select>
          <input type="text" placeholder="Worker Name" value={newRequest.name} onChange={(e) => setNewRequest({...newRequest, name: e.target.value})} style={{ ...inputStyle, backgroundColor: '#fff' }} />
          <input type="text" placeholder="Area" value={newRequest.area} onChange={(e) => setNewRequest({ ...newRequest, area: e.target.value })} style={inputStyle} />
          <input type="text" placeholder="Time" value={newRequest.time} onChange={(e) => setNewRequest({ ...newRequest, time: e.target.value })} style={inputStyle} />
          <input type="number" placeholder="Cost" value={newRequest.expense} onChange={(e) => setNewRequest({ ...newRequest, expense: e.target.value })} style={inputStyle} />
          <button onClick={handleAddRequest} style={{ backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Assign Task</button>
        </div>
      </div>

      {/* THE UPDATED TABLE */}
      <LedgerTable sectorName={activeTab} icon={activeTab === 'Internal' ? Home : Shield} sectorType={activeTab} />
    </div>
  );
};

const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' };
const activeTabStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold', cursor: 'pointer' };
const inactiveTabStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#e2e8f0', color: '#64748b', fontWeight: 'bold', cursor: 'pointer' };
const thStyle = { padding: '12px 15px', fontSize: '13px', color: '#64748b', fontWeight: '600' };
const tdStyle = { padding: '12px 15px', fontSize: '14px' };

export default ITOperations;