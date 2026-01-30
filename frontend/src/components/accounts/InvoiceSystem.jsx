import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

const InvoiceSystem = () => {
  const [invoice, setInvoice] = useState({
    client: '',
    invoiceNo: `INV-2026-${Math.floor(Math.random()*900)+100}`,
    date: new Date().toISOString().split('T')[0],
    items: [{ id: 1, desc: '', qty: 1, rate: 0, gst: 18 }],
    discount: 0
  });

  const [totals, setTotals] = useState({ sub: 0, tax: 0, grand: 0 });

  useEffect(() => {
    const sub = invoice.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const tax = invoice.items.reduce((sum, item) => sum + (item.qty * item.rate * item.gst / 100), 0);
    setTotals({ sub, tax, grand: sub + tax - invoice.discount });
  }, [invoice]);

  const handleSave = () => {
    if (!invoice.client) return alert("Client name is required!");
    alert("Invoice generated and saved successfully!");
  };

  return (
    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '40px' }}>
        <div>
            <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>CLIENT NAME *</label>
            <input style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '8px' }} placeholder="Enter client..." value={invoice.client} onChange={e => setInvoice({...invoice, client: e.target.value})} />
        </div>
        <div>
            <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>INVOICE NO</label>
            <input style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '8px', background: '#f8fafc' }} value={invoice.invoiceNo} readOnly />
        </div>
        <div>
            <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>DATE</label>
            <input type="date" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '8px' }} value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} />
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f8fafc', textAlign: 'left' }}>
          <tr>
            <th style={{ padding: '15px' }}>DESCRIPTION</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>QTY</th>
            <th style={{ padding: '15px', textAlign: 'center' }}>RATE (₹)</th>
            <th style={{ padding: '15px', textAlign: 'right' }}>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '15px' }}><input style={{ width: '100%', border: 'none' }} value={item.desc} onChange={e => {
                const newItems = [...invoice.items];
                newItems[idx].desc = e.target.value;
                setInvoice({...invoice, items: newItems});
              }} placeholder="Service desc..." /></td>
              <td style={{ textAlign: 'center' }}><input type="number" style={{ width: '60px', textAlign: 'center' }} value={item.qty} onChange={e => {
                const newItems = [...invoice.items];
                newItems[idx].qty = parseInt(e.target.value) || 0;
                setInvoice({...invoice, items: newItems});
              }} /></td>
              <td style={{ textAlign: 'center' }}><input type="number" style={{ width: '100px', textAlign: 'center' }} value={item.rate} onChange={e => {
                const newItems = [...invoice.items];
                newItems[idx].rate = parseFloat(e.target.value) || 0;
                setInvoice({...invoice, items: newItems});
              }} /></td>
              <td style={{ textAlign: 'right', fontWeight: '700' }}>₹{(item.qty * item.rate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '300px', background: '#f8fafc', padding: '30px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}><span>Subtotal</span><span style={{ fontWeight: '700' }}>₹{totals.sub.toLocaleString()}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}><span>GST (18%)</span><span style={{ fontWeight: '700' }}>₹{totals.tax.toLocaleString()}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: '2px dashed #cbd5e1' }}>
            <span style={{ fontWeight: '900' }}>GRAND TOTAL</span>
            <span style={{ fontSize: '24px', fontWeight: '900', color: '#7C3AED' }}>₹{totals.grand.toLocaleString()}</span>
          </div>
          <button onClick={handleSave} style={{ width: '100%', marginTop: '30px', background: '#7C3AED', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: '800', cursor: 'pointer' }}>Generate Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSystem;