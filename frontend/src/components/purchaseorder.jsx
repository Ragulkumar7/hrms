import React, { useState } from 'react';
import { ShoppingCart, Plus, Save, FileText } from 'lucide-react';

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
    <div style={{ padding: '25px', background: '#f1f5f9' }}>
      {/* Header Card */}
      <div style={{ background: '#1e1b4b', padding: '25px', borderRadius: '16px 16px 0 0', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: '#fbbf24', padding: '10px', borderRadius: '10px', color: '#1e1b4b' }}><ShoppingCart size={24}/></div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Generate Purchase Order</h2>
              <span style={{ opacity: 0.7, fontSize: '12px' }}>Internal procurement and vendor billing</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{poData.poNumber}</div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>Date: {poData.date}</div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '25px' }}>
          <div>
            <label style={{ fontSize: '11px', display: 'block', marginBottom: '8px', opacity: 0.8 }}>SELECT VENDOR</label>
            <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              <option style={{color:'black'}}>Choose Vendor...</option>
              <option style={{color:'black'}}>Tech Solutions Ltd</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '11px', display: 'block', marginBottom: '8px', opacity: 0.8 }}>BILLING CURRENCY</label>
            <input value="INR (₹) - Indian Rupee" readOnly style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }} />
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '0 0 16px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>ITEM DESCRIPTION</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '100px' }}>QUANTITY</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '150px' }}>UNIT RATE (₹)</th>
              <th style={{ padding: '12px', textAlign: 'right', width: '150px' }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {poData.items.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px' }}>
                  <input placeholder="e.g. Office Hardware" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px' }} value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} />
                </td>
                <td style={{ padding: '12px' }}>
                  <input type="number" style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '5px', textAlign: 'center' }} value={item.qty} onChange={e => updateItem(item.id, 'qty', parseInt(e.target.value))} />
                </td>
                <td style={{ padding: '12px' }}>
                  <input type="number" style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '5px', textAlign: 'center' }} value={item.rate} onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value))} />
                </td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700' }}>₹ {item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c3aed', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer' }}><Plus size={18}/> Add Line Item</button>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: '#64748b', fontSize: '14px' }}>Grand Total Amount</span>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#1e1b4b' }}>₹ {grandTotal.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
          <button style={{ flex: 1, padding: '15px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
          <button style={{ flex: 2, padding: '15px', borderRadius: '10px', border: 'none', background: '#1e1b4b', color: 'white', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer' }}><Save size={18}/> Finalize & Send PO</button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;