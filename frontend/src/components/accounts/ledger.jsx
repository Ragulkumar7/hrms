import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Plus } from 'lucide-react';

const Ledger = () => {
  const [entries, setEntries] = useState([
    { id: 1, date: '2026-01-30', type: 'Credit', category: 'Sales', notes: 'Invoice #101 Payment', amount: 25000 },
    { id: 2, date: '2026-01-29', type: 'Debit', category: 'Rent', notes: 'Office Monthly Rent', amount: 8000 }
  ]);

  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], type: 'Credit', category: '', amount: '' });

  const totals = entries.reduce((acc, curr) => {
    if (curr.type === 'Credit') acc.credit += curr.amount;
    else acc.debit += curr.amount;
    acc.balance = acc.credit - acc.debit;
    return acc;
  }, { credit: 0, debit: 0, balance: 0 });

  const handleAdd = () => {
    if (!form.category || !form.amount) return alert("Fill all fields!");
    setEntries([{ ...form, id: Date.now(), amount: parseFloat(form.amount) }, ...entries]);
    setForm({...form, category: '', amount: ''});
  };

  return (
    <div style={{ padding: '0px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #16a34a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>TOTAL CREDIT</p><h3 style={{ margin: '5px 0', color: '#16a34a' }}>₹{totals.credit.toLocaleString()}</h3></div>
          <ArrowUpCircle color="#dcfce7" fill="#16a34a" size={32}/>
        </div>
        <div style={{ background: 'white', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #dc2626', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>TOTAL DEBIT</p><h3 style={{ margin: '5px 0', color: '#dc2626' }}>₹{totals.debit.toLocaleString()}</h3></div>
          <ArrowDownCircle color="#fee2e2" fill="#dc2626" size={32}/>
        </div>
        <div style={{ background: '#7C3AED', padding: '25px', borderRadius: '20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><p style={{ margin: 0, opacity: 0.8, fontSize: '13px' }}>NET BALANCE</p><h3 style={{ margin: '5px 0' }}>₹{totals.balance.toLocaleString()}</h3></div>
          <Wallet color="rgba(255,255,255,0.2)" size={32}/>
        </div>
      </div>

      <div style={{ background: '#1e1b4b', padding: '30px', borderRadius: '20px', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr auto', gap: '15px', alignItems: 'end' }}>
          <div><label style={{ color: 'white', fontSize: '10px' }}>DATE</label><input type="date" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }} value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
          <div><label style={{ color: 'white', fontSize: '10px' }}>TYPE</label><select style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }} value={form.type} onChange={e => setForm({...form, type: e.target.value})}><option value="Credit">Credit (+)</option><option value="Debit">Debit (-)</option></select></div>
          <div><label style={{ color: 'white', fontSize: '10px' }}>CATEGORY</label><input style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }} value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="e.g. Project A" /></div>
          <div><label style={{ color: 'white', fontSize: '10px' }}>AMOUNT (₹)</label><input type="number" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }} value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} /></div>
          <button onClick={handleAdd} style={{ background: '#7C3AED', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: '800', cursor: 'pointer' }}><Plus size={20}/></button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '13px' }}>
              <th style={{ padding: '20px' }}>DATE</th>
              <th style={{ padding: '20px' }}>TYPE</th>
              <th style={{ padding: '20px' }}>CATEGORY</th>
              <th style={{ padding: '20px', textAlign: 'right' }}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                <td style={{ padding: '15px 20px', color: '#64748b' }}>{item.date}</td>
                <td style={{ padding: '15px 20px' }}><span style={{ color: item.type === 'Credit' ? '#16a34a' : '#dc2626', fontWeight: '700' }}>{item.type}</span></td>
                <td style={{ padding: '15px 20px', fontWeight: '700' }}>{item.category}</td>
                <td style={{ padding: '15px 20px', textAlign: 'right', fontWeight: '800', color: item.type === 'Credit' ? '#16a34a' : '#dc2626' }}>₹{item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ledger;