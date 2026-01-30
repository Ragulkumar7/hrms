import React, { useState } from 'react';
import { ShoppingCart, Plus, Save } from 'lucide-react';

const PurchaseOrder = () => {
  const [po, setPo] = useState({
    vendor: '',
    poNumber: `PO-2026-00${Math.floor(Math.random()*90)+10}`,
    date: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    items: [{ id: 1, desc: '', qty: 1, rate: 0 }]
  });

  const [dateError, setDateError] = useState("");

  const handleDateCheck = (val) => {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selected < today) {
      setDateError("Delivery date cannot be in the past!");
    } else {
      setDateError("");
      setPo({...po, deliveryDate: val});
    }
  };

  const grandTotal = po.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);

  return (
    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <div style={{ background: '#1e1b4b', color: 'white', padding: '30px', borderRadius: '16px', marginBottom: '35px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <ShoppingCart style={{ color: '#FF9B44' }}/>
          <h2 style={{ margin: 0, fontSize: '22px' }}>New Purchase Order</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#FF9B44' }}>{po.poNumber}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        <div>
          <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>VENDOR NAME</label>
          <input style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '8px' }} placeholder="Vendor name..." value={po.vendor} onChange={e => setPo({...po, vendor: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>EXPECTED DELIVERY DATE</label>
          <input type="date" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: dateError ? '1px solid #ef4444' : '1px solid #e2e8f0', marginTop: '8px' }} onChange={e => handleDateCheck(e.target.value)} />
          {dateError && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '5px' }}>{dateError}</p>}
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#94a3b8', fontSize: '12px' }}>
              <th>ITEM DESCRIPTION</th>
              <th style={{ width: '100px', textAlign: 'center' }}>QTY</th>
              <th style={{ width: '150px', textAlign: 'center' }}>RATE (₹)</th>
              <th style={{ textAlign: 'right' }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {po.items.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px 0' }}><input style={{ width: '100%', border: 'none', fontWeight: '600' }} value={item.desc} onChange={e => {
                  const newItems = [...po.items];
                  newItems[idx].desc = e.target.value;
                  setPo({...po, items: newItems});
                }} placeholder="Item details..." /></td>
                <td style={{ textAlign: 'center' }}><input type="number" style={{ width: '60px', textAlign: 'center' }} value={item.qty} onChange={e => {
                  const newItems = [...po.items];
                  newItems[idx].qty = parseInt(e.target.value) || 0;
                  setPo({...po, items: newItems});
                }} /></td>
                <td style={{ textAlign: 'center' }}><input type="number" style={{ width: '100px', textAlign: 'center' }} value={item.rate} onChange={e => {
                  const newItems = [...po.items];
                  newItems[idx].rate = parseFloat(e.target.value) || 0;
                  setPo({...po, items: newItems});
                }} /></td>
                <td style={{ textAlign: 'right', fontWeight: '800' }}>₹{(item.qty * item.rate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
      </table>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ textAlign: 'right', background: '#fff7ed', padding: '20px 40px', borderRadius: '16px' }}>
            <span style={{ fontSize: '11px', color: '#9a3412', fontWeight: '800' }}>TOTAL PROCURED VALUE</span>
            <div style={{ fontSize: '32px', fontWeight: '900', color: '#1e1b4b' }}>₹{grandTotal.toLocaleString()}</div>
          </div>
      </div>
      <button onClick={() => alert("PO Finalized!")} style={{ width: '100%', marginTop: '40px', background: '#7C3AED', color: 'white', padding: '18px', borderRadius: '15px', border: 'none', fontWeight: '800', fontSize: '16px' }}>Authorize Purchase Order</button>
    </div>
  );
};

export default PurchaseOrder;