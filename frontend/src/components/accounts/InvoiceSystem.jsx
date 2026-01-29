import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Receipt, Download } from 'lucide-react';

const InvoiceSystem = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: `INV-${new Date().getFullYear()}-001`,
    date: new Date().toISOString().split('T')[0],
    clientName: '',
    bankName: '',
    items: [{ id: Date.now(), desc: '', qty: 1, rate: 0, gst: 18, gstAmt: 0, total: 0 }],
    discount: 0,
    subtotal: 0,
    totalGst: 0,
    grandTotal: 0
  });

  // Calculate totals whenever items or discount change
  useEffect(() => {
    let sub = 0;
    let gst = 0;
    const updatedItems = invoiceData.items.map(item => {
      const rowSub = item.qty * item.rate;
      const rowGst = (rowSub * item.gst) / 100;
      const rowTotal = rowSub + rowGst;
      sub += rowSub;
      gst += rowGst;
      return { ...item, gstAmt: rowGst.toFixed(2), total: rowTotal.toFixed(2) };
    });

    const grand = sub + gst - invoiceData.discount;
    setInvoiceData(prev => ({ 
      ...prev, 
      subtotal: sub.toFixed(2), 
      totalGst: gst.toFixed(2), 
      grandTotal: grand.toFixed(2) 
    }));
  }, [invoiceData.items, invoiceData.discount]);

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { id: Date.now(), desc: '', qty: 1, rate: 0, gst: 18, gstAmt: 0, total: 0 }]
    });
  };

  const removeItem = (id) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData({ ...invoiceData, items: invoiceData.items.filter(i => i.id !== id) });
    }
  };

  const updateItem = (id, field, val) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map(i => i.id === id ? { ...i, [field]: val } : i)
    });
  };

  return (
    <div className="invoice-container">
      <style>{`
        .invoice-container { font-family: 'Inter', sans-serif; color: #1e293b; }
        .inv-header-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; }
        .inv-input { padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; outline: none; transition: 0.2s; }
        .inv-input:focus { border-color: #7C3AED; box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.1); }
        
        .table-responsive { overflow-x: auto; margin-top: 20px; border: 1px solid #f1f5f9; border-radius: 12px; }
        .inv-table { width: 100%; border-collapse: collapse; min-width: 800px; }
        .inv-table th { background: #f8fafc; padding: 15px; text-align: left; font-size: 11px; text-transform: uppercase; color: #64748b; }
        .inv-table td { padding: 12px 15px; border-top: 1px solid #f1f5f9; }
        
        .summary-wrapper { display: flex; justify-content: flex-end; margin-top: 30px; }
        .summary-box { background: #f8fafc; padding: 20px; border-radius: 12px; width: 100%; max-width: 350px; }
        .sum-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
        .sum-row.grand { border-top: 2px solid #e2e8f0; padding-top: 10px; margin-top: 10px; font-weight: 800; color: #1e1b4b; font-size: 18px; }
        
        @media (max-width: 768px) {
          .inv-header-grid { grid-template-columns: 1fr; }
          .summary-box { max-width: 100%; }
        }
      `}</style>

      <div className="inv-header-grid">
        <div className="form-group">
          <label>Invoice No</label>
          <input type="text" className="inv-input" value={invoiceData.invoiceNo} readOnly />
        </div>
        <div className="form-group">
          <label>Client Name</label>
          <input type="text" className="inv-input" placeholder="Enter Client" onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" className="inv-input" value={invoiceData.date} onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})} />
        </div>
      </div>

      <div className="table-responsive">
        <table className="inv-table">
          <thead>
            <tr>
              <th width="40%">Description</th>
              <th width="10%">Qty</th>
              <th width="15%">Rate</th>
              <th width="10%">GST %</th>
              <th width="15%">Total</th>
              <th width="10%"></th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map(item => (
              <tr key={item.id}>
                <td><input type="text" className="inv-input" style={{width:'90%'}} placeholder="Service details" onChange={(e) => updateItem(item.id, 'desc', e.target.value)} /></td>
                <td><input type="number" className="inv-input" style={{width:'60px'}} value={item.qty} onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)} /></td>
                <td><input type="number" className="inv-input" style={{width:'100px'}} placeholder="0.00" onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)} /></td>
                <td><input type="number" className="inv-input" style={{width:'60px'}} value={item.gst} onChange={(e) => updateItem(item.id, 'gst', parseInt(e.target.value) || 0)} /></td>
                <td style={{fontWeight:'700'}}>₹ {item.total}</td>
                <td><button onClick={() => removeItem(item.id)} style={{border:'none', background:'none', color:'#ef4444', cursor:'pointer'}}><Trash2 size={18}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={addItem} style={{marginTop:'15px', background:'#10b981', color:'white', border:'none', padding:'10px 20px', borderRadius:'8px', cursor:'pointer', fontWeight:'700'}}>+ Add Line Item</button>

      <div className="summary-wrapper">
        <div className="summary-box">
          <div className="sum-row"><span>Subtotal:</span><span>₹ {invoiceData.subtotal}</span></div>
          <div className="sum-row"><span>Tax (GST):</span><span>₹ {invoiceData.totalGst}</span></div>
          <div className="sum-row"><span>Discount:</span><input type="number" className="inv-input" style={{width:'100px', textAlign:'right'}} value={invoiceData.discount} onChange={(e) => setInvoiceData({...invoiceData, discount: parseFloat(e.target.value) || 0})} /></div>
          <div className="sum-row grand"><span>Grand Total:</span><span>₹ {invoiceData.grandTotal}</span></div>
          <button style={{width:'100%', marginTop:'20px', background:'#1e1b4b', color:'white', border:'none', padding:'15px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>Save & Generate PDF</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSystem;