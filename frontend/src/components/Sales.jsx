import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { 
  PieChart, Users, Phone, FileText, DollarSign, 
  TrendingUp, Plus, Download, Check, X 
} from 'lucide-react';

const Sales = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('pipeline');

  // Tabs Configuration
  const tabs = [
    { id: 'pipeline', label: 'Pipeline & Billing', icon: <DollarSign size={18} /> },
    { id: 'targets', label: 'Exec Targets & Clients', icon: <TrendingUp size={18} /> },
    { id: 'voice', label: 'Voice Process', icon: <Phone size={18} /> },
    { id: 'roles', label: 'Roles & Guide', icon: <FileText size={18} /> },
  ];

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="main-title">Sales & Revenue</h1>
          <p className="sub-title">Manage leads, billing, team targets, and calls.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="rec-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rec-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="glass-card" style={{minHeight: '600px'}}>
        {activeTab === 'pipeline' && <SalesBillingModule />}
        {activeTab === 'targets' && <SalesExecutiveModule />}
        {activeTab === 'voice' && <VoiceProcessModule />}
        {activeTab === 'roles' && <RolesResponsibilities />}
      </div>
    </div>
  );
};

/* --- 1. PIPELINE & BILLING MODULE (From SalesBillingModule.jsx) --- */
const SalesBillingModule = () => {
  const [leads] = useState([
    { id: 1, client: "Tech Solutions UAE", exec: "Arun", status: "Negotiation", value: 45000 },
    { id: 2, client: "Kovai Retail", exec: "Sana", status: "Analysis", value: 25000 },
    { id: 3, client: "London FinTech", exec: "Arun", status: "Closed", value: 85000 },
  ]);

  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, desc: 'Web App Development', qty: 1, rate: 50000 }
  ]);

  const weeklyTarget = 200000;
  const currentTotal = leads.reduce((acc, curr) => acc + curr.value, 0);

  const addInvoiceItem = () => setInvoiceItems([...invoiceItems, { id: Date.now(), desc: '', qty: 1, rate: 0 }]);
  
  const updateInvoiceItem = (id, field, value) => {
    setInvoiceItems(invoiceItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = invoiceItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="sales-admin-view">
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <p>Weekly Pipeline</p>
          <h3>₹{currentTotal.toLocaleString()}</h3>
          <div className="sales-progress-bar">
            <div className="sales-progress" style={{ width: `${(currentTotal / weeklyTarget) * 100}%` }} />
          </div>
        </div>
        <div className="stat-card">
          <p>Active Leads</p>
          <h3>{leads.length}</h3>
        </div>
        <div className="stat-card">
          <p>Target</p>
          <h3>₹{weeklyTarget.toLocaleString()}</h3>
        </div>
      </div>

      <div className="split-layout">
        {/* Pipeline Table */}
        <div className="section-container">
          <h3 className="section-heading">Lead Pipeline</h3>
          <table className="custom-table">
            <thead>
              <tr><th>Client</th><th>Executive</th><th>Status</th><th>Value</th></tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.client}</td>
                  <td>{lead.exec}</td>
                  <td><span className={`status-pill ${lead.status === 'Closed' ? 'active' : 'pending'}`}>{lead.status}</span></td>
                  <td>₹{lead.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Generator */}
        <div className="section-container">
          <h3 className="section-heading">Invoice Generator</h3>
          <div className="invoice-box">
            {invoiceItems.map(item => (
              <div className="invoice-row" key={item.id}>
                <input className="standard-input" placeholder="Description" value={item.desc} onChange={e => updateInvoiceItem(item.id, 'desc', e.target.value)} style={{flex:2}}/>
                <input className="standard-input" type="number" placeholder="Qty" value={item.qty} onChange={e => updateInvoiceItem(item.id, 'qty', e.target.value)} style={{width:'60px'}}/>
                <input className="standard-input" type="number" placeholder="Rate" value={item.rate} onChange={e => updateInvoiceItem(item.id, 'rate', e.target.value)} style={{width:'100px'}}/>
              </div>
            ))}
            <button className="btn-secondary small" onClick={addInvoiceItem} style={{marginTop:'10px'}}>+ Add Item</button>
            
            <div className="invoice-summary">
              <div className="summary-row"><span>Subtotal:</span> <span>₹{subtotal.toLocaleString()}</span></div>
              <div className="summary-row"><span>GST (18%):</span> <span>₹{tax.toLocaleString()}</span></div>
              <div className="summary-row total"><span>Total:</span> <span>₹{total.toLocaleString()}</span></div>
              <button className="btn-action full-width"><Download size={16}/> Download Invoice</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- 2. EXECUTIVE TARGETS & CLIENTS (From SalesExecutive.jsx) --- */
const SalesExecutiveModule = () => {
  const salesData = [
    { name: "Ravi Kumar", target: 50000, actual: 42000 },
    { name: "Sneha Patel", target: 60000, actual: 58000 },
    { name: "Arjun Das", target: 45000, actual: 30000 },
  ];

  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const handleAddClient = (e) => {
    e.preventDefault();
    if (formData.name) {
      setClients([...clients, formData]);
      setFormData({ name: "", phone: "", email: "" });
    }
  };

  return (
    <div className="sales-exec-view">
      <div className="split-layout">
        
        {/* Targets List */}
        <div className="section-container">
          <h3 className="section-heading">Team Targets</h3>
          <div className="target-list">
            {salesData.map((person) => (
              <div key={person.name} className="target-card">
                <div className="target-info">
                  <span className="name">{person.name}</span>
                  <span className="values">₹{person.actual.toLocaleString()} / ₹{person.target.toLocaleString()}</span>
                </div>
                <div className="sales-progress-bar">
                  <div className="sales-progress" style={{ width: `${(person.actual / person.target) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Client Form */}
        <div className="section-container">
          <h3 className="section-heading">Add New Client</h3>
          <form className="client-form" onSubmit={handleAddClient}>
            <input className="standard-input" placeholder="Client Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input className="standard-input" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            <input className="standard-input" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <button className="btn-action full-width" type="submit">Add Client</button>
          </form>

          {clients.length > 0 && (
            <div className="clients-list mt-4">
              <h4>Recent Clients</h4>
              <ul>{clients.map((c, i) => <li key={i}>{c.name}</li>)}</ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* --- 3. VOICE PROCESS (From VoiceProcess.jsx) --- */
const VoiceProcessModule = () => {
  const [calls, setCalls] = useState([
    { id: 1, client: "Tech Solutions UAE", status: "Pending" },
    { id: 2, client: "Kovai Retail", status: "Pending" },
    { id: 3, client: "London FinTech", status: "Pending" },
  ]);

  const handleCall = (id, status) => {
    setCalls(calls.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <div className="voice-container">
      <div className="section-container">
        <h3 className="section-heading">Incoming Sales Calls</h3>
        <table className="custom-table">
          <thead><tr><th>Client</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {calls.map((call) => (
              <tr key={call.id}>
                <td>{call.client}</td>
                <td>
                  <span className={`status-pill ${call.status === 'Pending' ? 'pending' : call.status === 'Accepted' ? 'active' : 'rejected'}`}>
                    {call.status}
                  </span>
                </td>
                <td>
                  {call.status === 'Pending' && (
                    <div style={{display:'flex', gap:'10px'}}>
                      <button className="icon-btn-check" onClick={() => handleCall(call.id, 'Accepted')}><Check size={16}/></button>
                      <button className="icon-btn-x" onClick={() => handleCall(call.id, 'Rejected')}><X size={16}/></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* --- 4. ROLES INFO (From Roles & Responsibilities.jsx) --- */
const RolesResponsibilities = () => {
  const [activeRole, setActiveRole] = useState(null);
  const rolesData = [
    { role: "Sales Manager", tasks: ["Assigns targets", "Generates invoices", "Coordinates with Accounts"] },
    { role: "Sales Executive", tasks: ["Works on targets", "Updates pipeline", "Client coordination"] },
    { role: "Accounts Team", tasks: ["Receives invoices", "Processes payments", "Maintains records"] }
  ];

  return (
    <div className="roles-container">
      {rolesData.map((item, index) => (
        <div key={index} className="role-item" style={{border:'1px solid #e2e8f0', borderRadius:'8px', marginBottom:'10px'}}>
          <div 
            className="role-header" 
            onClick={() => setActiveRole(activeRole === index ? null : index)}
            style={{padding:'15px', cursor:'pointer', fontWeight:'bold', display:'flex', justifyContent:'space-between', background:'#f8fafc'}}
          >
            {item.role}
            <span>{activeRole === index ? "▲" : "▼"}</span>
          </div>
          {activeRole === index && (
            <ul style={{padding:'15px 30px', margin:0, fontSize:'13px', color:'#64748b'}}>
              {item.tasks.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sales;