import React, { useState } from 'react';
import { ShoppingCart, Plus, Save, FileText, Trash2 } from 'lucide-react';

const PurchaseOrder = () => {
  const [poData, setPoData] = useState({
    vendor: '',
    poNumber: 'PO-2026-0045',
    date: new Date().toISOString().split('T')[0],
    items: [{ id: 1, desc: '', qty: 0, rate: 0, total: 0 }]
  });

  const updateItem = (id, field, val) => {
    const updated = poData.items.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: val };
        newItem.total = (newItem.qty || 0) * (newItem.rate || 0);
        return newItem;
      }
      return item;
    });
    setPoData({ ...poData, items: updated });
  };

  const grandTotal = poData.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="fade-in-up" style={{ padding: '30px', background: '#f8fafc' }}>
      <div style={{ background: '#1e1b4b', padding: '40px', borderRadius: '24px 24px 0 0', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: '#FF9B44', padding: '12px', borderRadius: '14px' }}><ShoppingCart size={28}/></div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.02em' }}>PURCHASE ORDER</h2>
            <p style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>Internal Procurement Module</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#FF9B44' }}>{poData.poNumber}</div>
          <div style={{ fontSize: '12px', fontWeight: '600', opacity: '0.6' }}>Date: {poData.date}</div>
        </div>
      </div>

      <div className="glass-card" style={{ borderRadius: '0 0 24px 24px', padding: '40px' }}>
        <div style={{ marginBottom: '40px', maxWidth: '400px' }}>
          <label style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Target Vendor</label>
          <input className="standard-input" style={{ width: '100%' }} placeholder="Enter vendor name..." value={poData.vendor} onChange={e => setPoData({...poData, vendor: e.target.value})} />
        </div>

        <table className="accounts-data-table">
          <thead>
            <tr>
              <th>Item Description</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Qty</th>
              <th style={{ width: '180px', textAlign: 'center' }}>Unit Rate</th>
              <th style={{ width: '180px', textAlign: 'right' }}>Aggregate</th>
            </tr>
          </thead>
          <tbody>
            {poData.items.map(item => (
              <tr key={item.id}>
                <td style={{ padding: '20px 0' }}><input style={{ width: '100%', border: 'none', outline: 'none', fontWeight: '600', color: '#334155' }} placeholder="Office hardware, assets..." value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} /></td>
                <td style={{ textAlign: 'center' }}><input type="number" className="standard-input" style={{ width: '80px', textAlign: 'center' }} value={item.qty} onChange={e => updateItem(item.id, 'qty', parseInt(e.target.value))} /></td>
                <td style={{ textAlign: 'center' }}><input type="number" className="standard-input" style={{ width: '120px', textAlign: 'center' }} value={item.rate} onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value))} /></td>
                <td style={{ textAlign: 'right', fontWeight: '800', color: '#1e293b' }}>₹ {item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
          <button style={{ background: 'none', border: 'none', color: '#FF9B44', fontWeight: '800', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => setPoData({...poData, items: [...poData.items, {id: Date.now(), desc: '', qty: 0, rate: 0, total: 0}]})}><Plus size={16}/> ADD LINE ITEM</button>
          <div style={{ textAlign: 'right', background: '#fff7ed', padding: '15px 30px', borderRadius: '16px', border: '1px solid #ffedd5' }}>
            <span style={{ color: '#9a3412', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>Total Procurement Value</span>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#1e1b4b' }}>₹ {grandTotal.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '50px', borderTop: '1px solid #f1f5f9', paddingTop: '30px' }}>
          <button className="btn-secondary" style={{ flex: 1, padding: '15px' }}>Save as Draft</button>
          <button className="btn-action" style={{ flex: 2, padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}><Save size={18}/> Finalize & Transmit Purchase Order</button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;