import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Printer, Download, User, Calendar } from 'lucide-react';

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
    <div className="fade-in-up" style={{ padding: '30px', background: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>CLIENT BILLING SYSTEM</h2>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Manage receivables and tax compliance</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => window.print()}><Printer size={16}/> Print</button>
          <button className="btn-action" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Download size={16}/> Export</button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <div style={{ padding: '30px', borderBottom: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          <div className="form-group">
            <label style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Authorized Client</label>
            <input className="standard-input" style={{ width: '100%' }} placeholder="Enter client name..." value={invoice.client} onChange={e => setInvoice({...invoice, client: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Invoice Number</label>
            <input className="standard-input" style={{ width: '100%', background: '#f8fafc', fontWeight: '700' }} value={invoice.invoiceNo} readOnly />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Billing Date</label>
            <input type="date" className="standard-input" style={{ width: '100%' }} value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} />
          </div>
        </div>

        <div style={{ padding: '30px' }}>
          <table className="accounts-data-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Item Description</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Qty</th>
                <th style={{ width: '150px', textAlign: 'center' }}>Rate (₹)</th>
                <th style={{ width: '150px', textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map(item => (
                <tr key={item.id}>
                  <td style={{ padding: '20px 0' }}><input style={{ width: '100%', border: 'none', outline: 'none', fontWeight: '600', color: '#334155' }} value={item.desc} onChange={e => updateRow(item.id, 'desc', e.target.value)} placeholder="Service description..." /></td>
                  <td style={{ textAlign: 'center' }}><input type="number" style={{ width: '60px', padding: '5px', border: '1px solid #e2e8f0', borderRadius: '6px', textAlign: 'center' }} value={item.qty} onChange={e => updateRow(item.id, 'qty', parseInt(e.target.value))} /></td>
                  <td style={{ textAlign: 'center' }}><input type="number" style={{ width: '100px', padding: '5px', border: '1px solid #e2e8f0', borderRadius: '6px', textAlign: 'center' }} value={item.rate} onChange={e => updateRow(item.id, 'rate', parseFloat(e.target.value))} /></td>
                  <td style={{ textAlign: 'right', fontWeight: '800', color: '#1e293b' }}>₹ {(item.qty * item.rate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{ marginTop: '20px', background: 'none', border: 'none', color: '#FF9B44', fontWeight: '800', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => setInvoice({...invoice, items: [...invoice.items, {id: Date.now(), desc: '', qty: 1, rate: 0, gst: 18}]})}><Plus size={16}/> ADD LINE ITEM</button>
        </div>

        <div style={{ background: '#f8fafc', padding: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Subtotal</span><span style={{ fontWeight: '700' }}>₹ {totals.sub.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Tax (GST 18%)</span><span style={{ fontWeight: '700' }}>₹ {totals.tax.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
              <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Discount</span>
              <input type="number" style={{ width: '100px', padding: '5px', border: '1px solid #e2e8f0', borderRadius: '6px', textAlign: 'right' }} value={invoice.discount} onChange={e => setInvoice({...invoice, discount: parseFloat(e.target.value) || 0})} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '2px dashed #cbd5e1' }}>
              <span style={{ fontWeight: '800', color: '#1e1b4b', textTransform: 'uppercase', fontSize: '12px' }}>Grand Total</span>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#1e1b4b' }}>₹ {totals.grand.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSystem;