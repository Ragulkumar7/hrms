import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { 
  TrendingUp, DollarSign, Users, Plus, MoreHorizontal, 
  Briefcase, CheckCircle, XCircle 
} from 'lucide-react';

const Sales = () => {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  // --- MOCK DATA: SALES DEALS ---
  const [deals, setDeals] = useState([
    { id: 1, client: 'TechCorp Inc', title: 'Website Redesign', value: 120000, stage: 'New Lead', owner: 'Karthik (TL)', date: '2026-01-20' },
    { id: 2, client: 'Alpha Stream', title: 'Mobile App Dev', value: 450000, stage: 'Negotiation', owner: 'Sarah (TL)', date: '2026-02-05' },
    { id: 3, client: 'Urban Store', title: 'POS Integration', value: 85000, stage: 'Closed Won', owner: 'Karthik (TL)', date: '2026-01-15' },
    { id: 4, client: 'Global Logistics', title: 'ERP Maintenance', value: 200000, stage: 'Proposal', owner: 'Varshith', date: '2026-02-10' },
  ]);

  const [newDeal, setNewDeal] = useState({ client: '', title: '', value: '', stage: 'New Lead' });

  // Kanban Stages
  const stages = ['New Lead', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  // --- ACTIONS ---
  const handleAddDeal = (e) => {
    e.preventDefault();
    const deal = {
      id: deals.length + 1,
      ...newDeal,
      value: parseFloat(newDeal.value),
      owner: user.name,
      date: new Date().toISOString().split('T')[0]
    };
    setDeals([...deals, deal]);
    setShowModal(false);
    setNewDeal({ client: '', title: '', value: '', stage: 'New Lead' });
  };

  const moveStage = (id, newStage) => {
    setDeals(deals.map(d => d.id === id ? { ...d, stage: newStage } : d));
  };

  // --- CALCULATIONS ---
  const totalPipeline = deals.filter(d => d.stage !== 'Closed Lost').reduce((acc, curr) => acc + curr.value, 0);
  const wonDeals = deals.filter(d => d.stage === 'Closed Won').length;
  const conversionRate = Math.round((wonDeals / deals.length) * 100) || 0;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="main-title">Sales Pipeline</h2>
          <p className="sub-title">Manage leads, track deals, and forecast revenue.</p>
        </div>
        <div className="header-actions">
           <button className="btn-action" onClick={() => setShowModal(true)}>
             <Plus size={16}/> Add New Deal
           </button>
        </div>
      </div>

      {/* --- SALES METRICS --- */}
      <div className="stats-grid">
        <div className="glass-card stat-item">
          <div className="icon-box green"><DollarSign size={20} /></div>
          <div><p className="stat-label">Pipeline Value</p><h3 className="stat-value">₹{totalPipeline.toLocaleString()}</h3></div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box blue"><Briefcase size={20} /></div>
          <div><p className="stat-label">Active Deals</p><h3 className="stat-value">{deals.filter(d => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost').length}</h3></div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box orange"><TrendingUp size={20} /></div>
          <div><p className="stat-label">Conversion Rate</p><h3 className="stat-value">{conversionRate}%</h3></div>
        </div>
      </div>

      {/* --- KANBAN BOARD --- */}
      <div className="kanban-container">
        {stages.map((stage) => (
          <div key={stage} className="kanban-column">
            <div className={`kanban-header stage-${stage.replace(' ', '-').toLowerCase()}`}>
              <h5>{stage}</h5>
              <span className="count-badge">{deals.filter(d => d.stage === stage).length}</span>
            </div>
            
            <div className="kanban-body">
              {deals.filter(d => d.stage === stage).map(deal => (
                <div key={deal.id} className="deal-card fade-in">
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                    <span className="deal-client">{deal.client}</span>
                    <strong className="deal-value">₹{(deal.value/1000).toFixed(0)}k</strong>
                  </div>
                  
                  <h4 className="deal-title">{deal.title}</h4>
                  
                  <div className="deal-footer">
                    <div className="deal-owner">
                      <Users size={12}/> {deal.owner.split(' ')[0]}
                    </div>
                    
                    {/* Stage Switcher Dropdown */}
                    <select 
                      className="mini-select" 
                      value={deal.stage}
                      onChange={(e) => moveStage(deal.id, e.target.value)}
                    >
                      {stages.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              ))}
              
              {deals.filter(d => d.stage === stage).length === 0 && (
                <div className="empty-zone">No deals</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- ADD DEAL MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <div className="section-header">
              <h4>Create Sales Opportunity</h4>
              <button className="icon-btn-x" onClick={() => setShowModal(false)}><Plus size={20} style={{transform:'rotate(45deg)'}}/></button>
            </div>
            <form onSubmit={handleAddDeal} className="task-form">
              <div className="form-group">
                <label>Client Name</label>
                <input type="text" required className="standard-input" 
                  value={newDeal.client} onChange={e => setNewDeal({...newDeal, client: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Project / Deal Title</label>
                <input type="text" required className="standard-input" 
                  value={newDeal.title} onChange={e => setNewDeal({...newDeal, title: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Value (₹)</label>
                  <input type="number" required className="standard-input" 
                    value={newDeal.value} onChange={e => setNewDeal({...newDeal, value: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Initial Stage</label>
                  <select className="standard-input"
                    value={newDeal.stage} onChange={e => setNewDeal({...newDeal, stage: e.target.value})}>
                    {stages.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-action full-width">Create Deal</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;