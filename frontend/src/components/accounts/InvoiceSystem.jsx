import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';

const InvoiceSystem = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [invoice, setInvoice] = useState({
    invoiceNo: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toISOString().split('T')[0],
    type: 'Cash', // Accounting Type
    
    // Client Details
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientGst: '',
    clientAddress: '',
    
    // Items
    items: [{ id: 1, desc: '', hsn: '', qty: 1, unit: 'Nos', rate: 0 }],
    
    // Totals
    freight: 0,
    paidAmount: 0,
    notes: ''
  });

  // --- CALCULATIONS ---
  const calculateTotals = () => {
    const netTotal = invoice.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const freight = Number(invoice.freight) || 0;
    const grandTotal = netTotal + freight;
    const paid = Number(invoice.paidAmount) || 0;
    const balance = grandTotal - paid;
    return { netTotal, grandTotal, balance };
  };

  const totals = calculateTotals();

  // --- HANDLERS ---
  const handleInputChange = (field, value) => {
    setInvoice({ ...invoice, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { id: Date.now(), desc: '', hsn: '', qty: 1, unit: 'Nos', rate: 0 }]
    });
  };

  const removeItem = (index) => {
    if (invoice.items.length > 1) {
      const newItems = invoice.items.filter((_, i) => i !== index);
      setInvoice({ ...invoice, items: newItems });
    }
  };

  const handleSave = () => {
    if (!invoice.clientName) return alert("Client Name is required!");

    const newRecord = {
      ...invoice,
      client: invoice.clientName, // Mapping for list view compatibility
      grandTotal: totals.grandTotal,
      status: totals.balance <= 0 ? 'Paid' : 'Unpaid'
    };

    const existing = JSON.parse(localStorage.getItem('account_invoices') || "[]");
    localStorage.setItem('account_invoices', JSON.stringify([newRecord, ...existing]));

    alert("Invoice Saved Successfully!");
    navigate('/payroll');
  };

  // --- STYLES (Matches Screenshot) ---
  const labelStyle = { fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '5px', display: 'block' };
  const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', color: '#334155', boxSizing: 'border-box' };
  const sectionHeaderStyle = { fontSize: '16px', fontWeight: '700', color: '#1e1b4b', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginTop: '20px' };

  return (
    <div className="fade-in" style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Back Button */}
      <button onClick={() => navigate('/payroll')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '15px', color: '#64748b', fontWeight: '600' }}>
        <ArrowLeft size={18}/> Back to Accounts
      </button>

      {/* --- MAIN CARD --- */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* HEADER STRIP */}
        <div style={{ background: '#1e1b4b', padding: '15px 30px', borderBottom: '4px solid #f59e0b', textAlign: 'center' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '20px', letterSpacing: '0.5px' }}>Add New Invoice</h2>
        </div>

        <div style={{ padding: '30px' }}>
          
          {/* TOP ROW: ID, Date, Type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div>
              <label style={labelStyle}>Invoice Number</label>
              <input style={{...inputStyle, background: '#f8fafc', fontWeight: 'bold'}} value={invoice.invoiceNo} readOnly />
            </div>
            <div>
              <label style={labelStyle}>Invoice Date</label>
              <input 
                  type="date" 
                  style={{...inputStyle, cursor: 'pointer'}} 
                  value={invoice.date} 
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  onClick={(e) => e.target.showPicker()} 
              />
            </div>
            <div>
              <label style={labelStyle}>Payment Type</label>
              <select style={inputStyle} value={invoice.type} onChange={(e) => handleInputChange('type', e.target.value)}>
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
                <option value="UPI">UPI / Online</option>
              </select>
            </div>
          </div>

          {/* CLIENT DETAILS SECTION */}
          <h3 style={sectionHeaderStyle}>Client / Customer Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>Client Name</label>
              <input style={inputStyle} placeholder="Enter client name" value={invoice.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Contact Number</label>
              <input style={inputStyle} placeholder="+91..." value={invoice.clientPhone} onChange={(e) => handleInputChange('clientPhone', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input style={inputStyle} placeholder="client@example.com" value={invoice.clientEmail} onChange={(e) => handleInputChange('clientEmail', e.target.value)} />
            </div>
            <div>
               <label style={labelStyle}>GST Number</label>
               <input style={inputStyle} placeholder="29ABCDE..." value={invoice.clientGst} onChange={(e) => handleInputChange('clientGst', e.target.value)} />
            </div>
             <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Address</label>
              <input style={inputStyle} placeholder="Complete billing address" value={invoice.clientAddress} onChange={(e) => handleInputChange('clientAddress', e.target.value)} />
            </div>
          </div>

          {/* ITEMS SECTION */}
          <h3 style={sectionHeaderStyle}>Invoice Items</h3>
          
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '40px 3fr 1fr 1fr 1fr 1fr 1fr 40px', gap: '10px', background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '10px' }}>
             <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>S.NO</span>
             <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>DESCRIPTION</span>
             <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>HSN CODE</span>
             <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>QTY</span>
             <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>UNIT</span>
             <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>RATE</span>
             <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>TOTAL</span>
             <span></span>
          </div>

          {/* Table Rows */}
          {invoice.items.map((item, index) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '40px 3fr 1fr 1fr 1fr 1fr 1fr 40px', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
               <span style={{ textAlign: 'center', fontSize: '13px', fontWeight: '600' }}>{index + 1}</span>
               <input style={{...inputStyle, padding: '8px'}} placeholder="Item description" value={item.desc} onChange={(e) => handleItemChange(index, 'desc', e.target.value)} />
               <input style={{...inputStyle, padding: '8px'}} placeholder="HSN" value={item.hsn} onChange={(e) => handleItemChange(index, 'hsn', e.target.value)} />
               <input type="number" style={{...inputStyle, padding: '8px'}} value={item.qty} onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))} />
               <select style={{...inputStyle, padding: '8px'}} value={item.unit} onChange={(e) => handleItemChange(index, 'unit', e.target.value)}>
                 <option>Nos</option>
                 <option>Kg</option>
                 <option>Sets</option>
                 <option>Hrs</option>
               </select>
               <input type="number" style={{...inputStyle, padding: '8px'}} placeholder="0.00" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))} />
               <input style={{...inputStyle, padding: '8px', background: '#f1f5f9'}} value={(item.qty * item.rate).toFixed(2)} readOnly />
               <button onClick={() => removeItem(index)} style={{ background: '#fee2e2', border: 'none', borderRadius: '6px', height: '35px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Trash2 size={16} color="#ef4444" />
               </button>
            </div>
          ))}

          <button onClick={addItem} style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Plus size={16} /> Add Item
          </button>

          {/* FOOTER / TOTALS SECTION */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', marginTop: '40px' }}>
             
             {/* Notes Area */}
             <div>
               <label style={labelStyle}>Remarks / Notes</label>
               <textarea 
                 style={{...inputStyle, resize: 'vertical', minHeight: '100px', fontFamily: 'inherit'}} 
                 placeholder="Additional notes or special instructions..."
                 value={invoice.notes}
                 onChange={(e) => handleInputChange('notes', e.target.value)}
               />
             </div>

             {/* Calculation Box */}
             <div style={{ background: '#fff7ed', padding: '20px', borderRadius: '10px', border: '1px solid #ffedd5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                  <span>Net Total:</span>
                  <span style={{ fontWeight: '600' }}>₹{totals.netTotal.toFixed(2)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px' }}>Freight Charges:</span>
                  <input 
                    type="number" 
                    style={{ width: '100px', padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    value={invoice.freight}
                    onChange={(e) => handleInputChange('freight', e.target.value)}
                  />
                </div>
                
                <div style={{ borderTop: '1px solid #cbd5e1', margin: '10px 0' }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '16px', fontWeight: '700', color: '#1e1b4b' }}>
                  <span>Grand Total:</span>
                  <span>₹{totals.grandTotal.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px' }}>Paid Amount:</span>
                  <input 
                    type="number" 
                    style={{ width: '100px', padding: '5px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    value={invoice.paidAmount}
                    onChange={(e) => handleInputChange('paidAmount', e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', color: totals.balance > 0 ? '#ef4444' : '#10b981' }}>
                  <span>Balance:</span>
                  <span>₹{totals.balance.toFixed(2)}</span>
                </div>
             </div>
          </div>

          {/* SAVE BUTTON */}
          <div style={{ textAlign: 'right', marginTop: '30px' }}>
            <button 
              onClick={handleSave} 
              style={{ 
                background: '#1e1b4b', 
                color: 'white', 
                border: 'none', 
                padding: '12px 30px', 
                borderRadius: '8px', 
                fontSize: '15px', 
                fontWeight: '600', 
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(30, 27, 75, 0.2)' 
              }}
            >
              Save Invoice
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvoiceSystem;