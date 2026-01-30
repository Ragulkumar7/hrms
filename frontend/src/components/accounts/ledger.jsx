import React, { useState } from 'react';
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle, Wallet, List, Download } from 'lucide-react';

const Ledger = () => {
  const [entries, setEntries] = useState([
    { id: 1, date: '2026-01-30', type: 'Credit', category: 'Project Alpha', notes: 'Client Office Install', amount: 2030.00 },
    { id: 2, date: '2026-01-29', type: 'Debit', category: 'Software', notes: 'Monthly Subscription', amount: 550.00 }
  ]);

  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Credit',
    category: '',
    notes: '',
    amount: ''
  });

  const totals = entries.reduce((acc, curr) => {
    if (curr.type === 'Credit') acc.credit += curr.amount;
    else acc.debit += curr.amount;
    acc.balance = acc.credit - acc.debit;
    return acc;
  }, { credit: 0, debit: 0, balance: 0 });

  const handleAddEntry = () => {
    if (!newEntry.amount || !newEntry.category) {
      alert("Please fill in the category and amount");
      return;
    }
    setEntries([...entries, { ...newEntry, id: Date.now(), amount: parseFloat(newEntry.amount) }]);
    setNewEntry({ ...newEntry, category: '', notes: '', amount: '' });
  };

  return (
    <div className="fade-in-up" style={{ padding: '30px', background: '#f8fafc' }}>
      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <div className="finance-summary-box" style={{ borderLeft: '4px solid #16a34a' }}>
          <div className="finance-summary-item">
            <label>Total Credit</label>
            <span style={{ color: '#16a34a' }}>₹ {totals.credit.toLocaleString()}</span>
          </div>
          <ArrowUpCircle style={{ marginLeft: 'auto', color: '#dcfce7' }} size={32}/>
        </div>
        <div className="finance-summary-box" style={{ borderLeft: '4px solid #dc2626' }}>
          <div className="finance-summary-item">
            <label>Total Debit</label>
            <span style={{ color: '#dc2626' }}>₹ {totals.debit.toLocaleString()}</span>
          </div>
          <ArrowDownCircle style={{ marginLeft: 'auto', color: '#fee2e2' }} size={32}/>
        </div>
        <div className="finance-summary-box" style={{ borderLeft: '4px solid #FF9B44' }}>
          <div className="finance-summary-item">
            <label>Net Balance</label>
            <span>₹ {totals.balance.toLocaleString()}</span>
          </div>
          <Wallet style={{ marginLeft: 'auto', color: '#fff7ed' }} size={32}/>
        </div>
      </div>

      <div style={{ background: '#1e1b4b', padding: '25px', borderRadius: '16px', marginBottom: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <h4 style={{ color: 'white', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px', opacity: '0.6' }}>Transaction Console</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) auto', gap: '15px', alignItems: 'end' }}>
          <div className="form-group">
            <label style={{ color: 'white', fontSize: '10px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>DATE</label>
            <input type="date" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', width: '100%' }} value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ color: 'white', fontSize: '10px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>TYPE</label>
            <select style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', width: '100%' }} value={newEntry.type} onChange={e => setNewEntry({...newEntry, type: e.target.value})}><option style={{color:'black'}}>Credit</option><option style={{color:'black'}}>Debit</option></select>
          </div>
          <div className="form-group">
            <label style={{ color: 'white', fontSize: '10px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>CATEGORY</label>
            <input style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', width: '100%' }} value={newEntry.category} onChange={e => setNewEntry({...newEntry, category: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ color: 'white', fontSize: '10px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>NOTES</label>
            <input style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', width: '100%' }} value={newEntry.notes} onChange={e => setNewEntry({...newEntry, notes: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ color: 'white', fontSize: '10px', fontWeight: '700', marginBottom: '8px', display: 'block' }}>AMOUNT (₹)</label>
            <input type="number" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', width: '100%' }} value={newEntry.amount} onChange={e => setNewEntry({...newEntry, amount: e.target.value})} />
          </div>
          <button className="btn-action" style={{ height: '42px', width: '42px', padding: '0', display: 'flex', alignItems: 'center', justifySelf: 'center' }} onClick={handleAddEntry}><Plus size={20}/></button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <table className="accounts-data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Notes</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(item => (
              <tr key={item.id}>
                <td style={{ fontWeight: '600', color: '#64748b' }}>{item.date}</td>
                <td><span className={`status-pill ${item.type === 'Credit' ? 'approved' : 'rejected'}`}>{item.type}</span></td>
                <td style={{ fontWeight: '700', color: '#1e293b' }}>{item.category}</td>
                <td style={{ color: '#94a3b8', fontSize: '13px' }}>{item.notes}</td>
                <td style={{ textAlign: 'right', fontWeight: '800', color: '#1e293b' }}>₹ {item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ledger;