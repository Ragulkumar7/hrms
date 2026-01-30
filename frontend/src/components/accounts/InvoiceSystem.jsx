import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Printer, Download } from 'lucide-react';

const InvoiceSystem = () => {
  const [invoice, setInvoice] = useState({
    client: '',
    invoiceNo: 'INV-2026-101',
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

  const updateRow = (id, field, val) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map(item => item.id === id ? { ...item, [field]: val } : item)
    });
  };

  return (
    <div style={{ padding: '30px', background: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1e1b4b' }}>INVOICE SYSTEM</h1>
          <p style={{ color: '#64748b' }}>Project billing and client receivables</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}><Printer size={16}/> Print</button>
          <button style={{ padding: '10px 20px', borderRadius: '8px', background: '#7c3aed', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><Download size={16}/> Export PDF</button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '30px', borderBottom: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '30px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>CLIENT DETAILS</label>
            <input placeholder="Enter Client Name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px' }} value={invoice.client} onChange={e => setInvoice({...invoice, client: e.target.value})} />
          </div>
          <div>
            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>INVOICE NO</label>
            <input value={invoice.invoiceNo} readOnly style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#f8fafc', fontWeight: '700' }} />
          </div>
          <div>
            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>DATE</label>
            <input type="date" value={invoice.date} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} onChange={e => setInvoice({...invoice, date: e.target.value})} />
          </div>
        </div>

        <div style={{ padding: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: '12px', color: '#64748b' }}>
                <th style={{ paddingBottom: '15px' }}>DESCRIPTION</th>
                <th style={{ paddingBottom: '15px', width: '100px' }}>QTY</th>
                <th style={{ paddingBottom: '15px', width: '150px' }}>RATE (₹)</th>
                <th style={{ paddingBottom: '15px', width: '100px' }}>GST %</th>
                <th style={{ paddingBottom: '15px', width: '120px', textAlign: 'right' }}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '15px 0' }}><input style={{ border: 'none', width: '100%', fontSize: '14px' }} placeholder="Project Service Description..." value={item.desc} onChange={e => updateRow(item.id, 'desc', e.target.value)} /></td>
                  <td><input type="number" style={{ border: '1px solid #e2e8f0', width: '60px', padding: '5px', borderRadius: '4px' }} value={item.qty} onChange={e => updateRow(item.id, 'qty', parseInt(e.target.value))} /></td>
                  <td><input type="number" style={{ border: '1px solid #e2e8f0', width: '100px', padding: '5px', borderRadius: '4px' }} value={item.rate} onChange={e => updateRow(item.id, 'rate', parseFloat(e.target.value))} /></td>
                  <td style={{ fontSize: '14px', color: '#64748b' }}>{item.gst}%</td>
                  <td style={{ textAlign: 'right', fontWeight: '700' }}>₹ {(item.qty * item.rate * (1 + item.gst / 100)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button onClick={() => setInvoice({...invoice, items: [...invoice.items, {id: Date.now(), desc: '', qty: 1, rate: 0, gst: 18}]})} style={{ marginTop: '20px', border: 'none', background: 'none', color: '#7c3aed', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><Plus size={18}/> ADD LINE</button>
        </div>

        <div style={{ background: '#f8fafc', padding: '30px', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}><span>Subtotal</span><span>₹ {totals.sub.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}><span>Total GST</span><span>₹ {totals.tax.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', alignItems: 'center' }}>
              <span>Discount</span>
              <input type="number" style={{ width: '80px', padding: '5px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right' }} value={invoice.discount} onChange={e => setInvoice({...invoice, discount: parseFloat(e.target.value) || 0})} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #e2e8f0', fontWeight: '900', fontSize: '20px', color: '#1e1b4b' }}>
              <span>Grand Total</span>
              <span>₹ {totals.grand.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSystem;