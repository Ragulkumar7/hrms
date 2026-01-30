import React, { useState } from 'react';
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle, Wallet, List } from 'lucide-react';

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
    <div style={{ padding: '20px', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e1b4b' }}>General Ledger</h2>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Monitor and manage company financial transactions</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '25px' }}>
        {[
          { label: 'TOTAL CREDIT', val: totals.credit, color: '#10b981', icon: <ArrowUpCircle size={20}/> },
          { label: 'TOTAL DEBIT', val: totals.debit, color: '#ef4444', icon: <ArrowDownCircle size={20}/> },
          { label: 'NET BALANCE', val: totals.balance, color: '#7c3aed', icon: <Wallet size={20}/> },
          { label: 'TOTAL ENTRIES', val: entries.length, color: '#1e1b4b', icon: <List size={20}/> }
        ].map((card, i) => (
          <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: `4px solid ${card.color}` }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b' }}>{card.label}</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', color: card.color }}>₹ {card.val.toLocaleString()}</span>
              <span style={{ opacity: 0.3 }}>{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Entry Form */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h4 style={{ marginBottom: '15px', fontSize: '14px', color: '#1e1b4b' }}>Add Manual Entry</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr 1fr auto', gap: '10px', alignItems: 'end' }}>
          <div><label style={{display:'block', fontSize:'11px', marginBottom:'5px'}}>Date</label><input type="date" value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} style={{width:'100%', padding:'8px', border:'1px solid #e2e8f0', borderRadius:'6px'}}/></div>
          <div><label style={{display:'block', fontSize:'11px', marginBottom:'5px'}}>Type</label><select value={newEntry.type} onChange={e => setNewEntry({...newEntry, type: e.target.value})} style={{width:'100%', padding:'8px', border:'1px solid #e2e8f0', borderRadius:'6px'}}><option>Credit</option><option>Debit</option></select></div>
          <div><label style={{display:'block', fontSize:'11px', marginBottom:'5px'}}>Category</label><input type="text" value={newEntry.category} onChange={e => setNewEntry({...newEntry, category: e.target.value})} style={{width:'100%', padding:'8px', border:'1px solid #e2e8f0', borderRadius:'6px'}}/></div>
          <div><label style={{display:'block', fontSize:'11px', marginBottom:'5px'}}>Notes</label><input type="text" value={newEntry.notes} onChange={e => setNewEntry({...newEntry, notes: e.target.value})} style={{width:'100%', padding:'8px', border:'1px solid #e2e8f0', borderRadius:'6px'}}/></div>
          <div><label style={{display:'block', fontSize:'11px', marginBottom:'5px'}}>Amount</label><input type="number" value={newEntry.amount} onChange={e => setNewEntry({...newEntry, amount: e.target.value})} style={{width:'100%', padding:'8px', border:'1px solid #e2e8f0', borderRadius:'6px'}}/></div>
          <button onClick={handleAddEntry} style={{background:'#1e1b4b', color:'white', border:'none', padding:'10px 20px', borderRadius:'6px', cursor:'pointer'}}><Plus size={18}/></button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '15px', fontSize: '12px' }}>DATE</th>
              <th style={{ padding: '15px', fontSize: '12px' }}>TYPE</th>
              <th style={{ padding: '15px', fontSize: '12px' }}>CATEGORY</th>
              <th style={{ padding: '15px', fontSize: '12px' }}>NOTES</th>
              <th style={{ padding: '15px', fontSize: '12px' }}>AMOUNT</th>
              <th style={{ padding: '15px', fontSize: '12px' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px', fontSize: '13px' }}>{item.date}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', background: item.type === 'Credit' ? '#dcfce7' : '#fee2e2', color: item.type === 'Credit' ? '#166534' : '#991b1b' }}>{item.type}</span>
                </td>
                <td style={{ padding: '15px', fontSize: '13px' }}>{item.category}</td>
                <td style={{ padding: '15px', fontSize: '13px', color: '#64748b' }}>{item.notes}</td>
                <td style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>₹ {item.amount.toLocaleString()}</td>
                <td style={{ padding: '15px' }}><button style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={16}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ledger;