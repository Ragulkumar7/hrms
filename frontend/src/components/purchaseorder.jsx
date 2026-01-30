import React, { useState } from 'react';
import { Receipt, Calculator, BookOpen, ShoppingCart, Plus } from 'lucide-react';

const Accountsteam = () => {
  const [activeTab, setActiveTab] = useState('salary');
  
  // Replicated Frontend Logic from invoice_management.php
  const [invoiceItems, setInvoiceItems] = useState([{ id: 1, desc: '', qty: 1, rate: 0, gst: 18 }]);
  const subtotal = invoiceItems.reduce((sum, i) => sum + (i.qty * i.rate), 0);
  const totalGst = invoiceItems.reduce((sum, i) => sum + ((i.qty * i.rate * i.gst) / 100), 0);

  return (
    <div style={{ padding: '20px' }}>
      <div className="page-header" style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e1b4b' }}>Finance Operations</h2>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #e2e8f0' }}>
        {['salary', 'invoice', 'ledger'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '700', color: activeTab === tab ? '#7C3AED' : '#64748b', borderBottom: activeTab === tab ? '3px solid #7C3AED' : '3px solid transparent' }}>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {activeTab === 'invoice' && (
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#f8fafc', fontSize: '12px' }}><th>Description</th><th>Qty</th><th>Rate</th><th>GST%</th><th>Total</th></tr></thead>
              <tbody>
                {invoiceItems.map(item => (
                  <tr key={item.id}>
                    <td><input style={{ padding: '8px', border: '1px solid #ddd' }} onChange={(e) => {}} /></td>
                    <td><input type="number" value={item.qty} style={{ width: '60px' }} /></td>
                    <td><input type="number" value={item.rate} style={{ width: '80px' }} /></td>
                    <td>18%</td>
                    <td>₹{(item.qty * item.rate * 1.18).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'right', marginTop: '20px', fontWeight: '700' }}>
               <p>Grand Total: ₹{(subtotal + totalGst).toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accountsteam;