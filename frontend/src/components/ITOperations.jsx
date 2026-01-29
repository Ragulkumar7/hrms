import React, { useState } from 'react';
import { 
  Home, Shield, Zap, User, MapPin, Clock 
} from 'lucide-react';

const ITOperations = () => {
  const workerRegistry = {
    Housekeeping: "Rahul Kumar",
    Electrician: "Suresh Raina",
    Stationaries: "Vikas Khanna",
    "Security Guard": "Amit Singh",
    "Cab Service": "Rajesh Driver"
  };

  const [activeTab, setActiveTab] = useState('Internal');
  
  // Ledger filter — tracks which role's details to display in the table
  const [ledgerItemFilter, setLedgerItemFilter] = useState(
    activeTab === 'Internal' ? 'Housekeeping' : 'Security Guard'
  );

  const [tasks, setTasks] = useState([
    { id: 1, sector: 'Internal', item: "Housekeeping", name: "Rahul Kumar", area: "Floor 2 - Pantry", time: "09:00 AM", expense: 1200, paymentStatus: "Paid", workStatus: "Completed" },
    { id: 2, sector: 'Internal', item: "Electrician", name: "Suresh Raina", area: "Main Server Room", time: "11:00 AM", expense: 0, paymentStatus: "Pending", workStatus: "Pending" },
    { id: 3, sector: 'Internal', item: "Stationaries", name: "Vikas Khanna", area: "Reception", time: "10:30 AM", expense: 0, paymentStatus: "Pending", workStatus: "Pending" },
    { id: 4, sector: 'External', item: "Security Guard", name: "Amit Singh", area: "Main Gate", time: "08:00 AM", expense: 0, paymentStatus: "Pending", workStatus: "In Progress" },
    { id: 5, sector: 'External', item: "Cab Service", name: "Rajesh Driver", area: "Parking Slot B", time: "06:00 PM", expense: 0, paymentStatus: "Pending", workStatus: "Pending" }
  ]);

  const [newRequest, setNewRequest] = useState({ 
    sector: 'Internal', item: 'Housekeeping', name: workerRegistry.Housekeeping, 
    area: '', time: '', expense: '', paymentStatus: 'Pending', workStatus: 'Pending' 
  });
  
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Synchronizes the tab, the form, and the ledger view
  const handleTabChange = (sector) => {
    setActiveTab(sector);
    const defaultItem = sector === 'Internal' ? 'Housekeeping' : 'Security Guard';
    setLedgerItemFilter(defaultItem); 
    setNewRequest({
      ...newRequest,
      sector,
      item: defaultItem,
      name: workerRegistry[defaultItem],
      area: '', time: '', expense: '' 
    });
  };

  // UPDATED: Selecting a role now also updates the Ledger Filter automatically
  const handleItemChange = (selectedItem) => {
    setLedgerItemFilter(selectedItem); // This ensures the table shows ONLY this person
    setNewRequest({
      ...newRequest,
      item: selectedItem,
      name: workerRegistry[selectedItem] || "" 
    });
  };

  const handleLedgerItemChange = (selectedItem) => {
    setLedgerItemFilter(selectedItem);
  };

  const showNotification = (msg, type) => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleUpdate = (id, field, value) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: value } : t));
    showNotification(`Updated ${field}`, "success");
  };

  const handleAddRequest = () => {
    if (!newRequest.name || !newRequest.area || !newRequest.time || !newRequest.expense) {
      showNotification("Please fill Name, Area, Time, and Cost", "error");
      return;
    }
    const taskObj = { 
      id: Date.now(), 
      ...newRequest, 
      expense: parseFloat(newRequest.expense) || 0, 
    };
    setTasks([taskObj, ...tasks]);
    showNotification("Task added to ledger", "success");
    setNewRequest({ ...newRequest, area: '', time: '', expense: '' });
  };

  const LedgerTable = ({ sectorName, icon: Icon, sectorType }) => {
    const availableItems = sectorType === 'Internal' 
      ? ['Housekeeping', 'Electrician', 'Stationaries']
      : ['Security Guard', 'Cab Service'];

    // Filters the table based on the item currently selected in the form
    const filteredTasks = tasks
      .filter(t => t.sector === sectorType)
      .filter(t => t.item === ledgerItemFilter); 

    return (
      <div className="glass-card" style={{ marginBottom: '30px' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4><Icon size={18} /> {sectorName} Ledger</h4>
          
          <select 
            value={ledgerItemFilter} 
            onChange={(e) => handleLedgerItemChange(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '14px', border: '1px solid #e2e8f0' }}
          >
            {availableItems.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Name & Area</th>
              <th>Item & Time</th>
              <th>Payment Status</th>
              <th>Work Progress</th>
              <th style={{ textAlign: 'center' }}>Amount Box</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(t => (
                <tr key={t.id}>
                  <td>
                    <div style={{fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <User size={14} color="#2563eb" /> {t.name}
                    </div>
                    <div style={{fontSize: '11px', color: '#64748b'}}><MapPin size={10} /> {t.area}</div>
                  </td>
                  <td>
                    <div style={{fontWeight: '500'}}>{t.item === 'Electrician' && <Zap size={12} color="#f59e0b" />} {t.item}</div>
                    <div style={{fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px'}}><Clock size={10} /> {t.time}</div>
                  </td>
                  <td>
                    <select value={t.paymentStatus} onChange={(e) => handleUpdate(t.id, 'paymentStatus', e.target.value)} style={{ ...statusSelectStyle, color: t.paymentStatus === 'Paid' ? '#16a34a' : '#dc2626' }}>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </td>
                  <td>
                    <select value={t.workStatus} onChange={(e) => handleUpdate(t.id, 'workStatus', e.target.value)} style={{ ...statusSelectStyle, color: t.workStatus === 'Completed' ? '#2563eb' : '#ea580c' }}>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ ...amountBoxStyle, backgroundColor: t.paymentStatus === 'Paid' ? '#f0fdf4' : '#fef2f2', borderColor: t.paymentStatus === 'Paid' ? '#bbf7d0' : '#fecaca' }}>
                      <span style={amountLabelStyle}>{t.paymentStatus === 'Paid' ? 'Payment Done' : 'Due Payment'}</span>
                      <span style={{ ...amountValueStyle, color: t.paymentStatus === 'Paid' ? '#15803d' : '#991b1b' }}>₹{t.expense.toLocaleString()}</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                  No tasks found for {ledgerItemFilter} in this sector.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="it-view-container">
      {notification.message && (
        <div className={`error-msg notification-toast ${notification.type === 'success' ? 'success-toast' : ''}`}>
          {notification.message}
        </div>
      )}

      <div className="page-header"><h2 className="main-title">IT & Operations Control Center</h2></div>

      <div style={tabContainerStyle}>
        <button style={activeTab === 'Internal' ? activeTabStyle : inactiveTabStyle} onClick={() => handleTabChange('Internal')}>
          <Home size={18} /> Internal Ledger
        </button>
        <button style={activeTab === 'External' ? activeTabStyle : inactiveTabStyle} onClick={() => handleTabChange('External')}>
          <Shield size={18} /> External Ledger
        </button>
      </div>

      <div className="glass-card" style={{ marginBottom: '30px' }}>
        <div className="section-header"><h4>Assign New {activeTab} Task</h4></div>
        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          
          <select value={newRequest.item} onChange={(e) => handleItemChange(e.target.value)}>
            {activeTab === 'Internal' ? (
              <>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Electrician">Electrician</option>
                <option value="Stationaries">Stationaries</option>
              </>
            ) : (
              <>
                <option value="Security Guard">Security Guard</option>
                <option value="Cab Service">Cab Service</option>
              </>
            )}
          </select>

          <input type="text" placeholder="Worker Name" value={newRequest.name} readOnly style={{ backgroundColor: '#f8fafc', cursor: 'not-allowed', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '6px' }} />
          <input type="text" placeholder="Area" value={newRequest.area} onChange={(e) => setNewRequest({...newRequest, area: e.target.value})} style={{ border: '1px solid #e2e8f0', padding: '8px', borderRadius: '6px' }} />
          <input type="text" placeholder="Time" value={newRequest.time} onChange={(e) => setNewRequest({...newRequest, time: e.target.value})} style={{ border: '1px solid #e2e8f0', padding: '8px', borderRadius: '6px' }} />
          <input type="number" placeholder="Cost (₹)" value={newRequest.expense} onChange={(e) => setNewRequest({...newRequest, expense: e.target.value})} style={{ border: '1px solid #e2e8f0', padding: '8px', borderRadius: '6px' }} />
          
          <button className="btn-action" onClick={handleAddRequest} style={{ backgroundColor: '#f97316', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Assign {activeTab}</button>
        </div>
      </div>

      {activeTab === 'Internal' ? (
        <LedgerTable sectorName="Internal Team" icon={Home} sectorType="Internal" />
      ) : (
        <LedgerTable sectorName="External Team" icon={Shield} sectorType="External" />
      )}
    </div>
  );
};

const tabContainerStyle = { display: 'flex', gap: '10px', marginBottom: '20px' };
const baseTabStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' };
const activeTabStyle = { ...baseTabStyle, backgroundColor: '#2563eb', color: 'white' };
const inactiveTabStyle = { ...baseTabStyle, backgroundColor: '#f1f5f9', color: '#64748b' };
const statusSelectStyle = { padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', outline: 'none' };
const amountBoxStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 15px', borderRadius: '10px', border: '2px solid', minWidth: '110px' };
const amountLabelStyle = { fontSize: '9px', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.6px', color: '#64748b', marginBottom: '3px' };
const amountValueStyle = { fontSize: '15px', fontWeight: '800' };

export default ITOperations;