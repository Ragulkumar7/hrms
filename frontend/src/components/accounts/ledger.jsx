import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Download, ArrowUpCircle, ArrowDownCircle, Wallet, List, Save, PlusCircle, MinusCircle } from 'lucide-react';

const Ledger = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [entries, setEntries] = useState([
    { id: 1, date: '2026-01-30', type: 'Expense', party: 'Ink Station', bank: 'HDFC', desc: 'Office Supplies', debit: 50, credit: 0, balance: 1754292 },
    { id: 2, date: '2026-01-30', type: 'Income', party: 'Facebook India', bank: 'Canara', desc: 'Inv-2026-013', debit: 0, credit: 944, balance: 1755236 }
  ]);

  const [expenseForm, setExpenseForm] = useState({ desc: '', paidTo: '', bank: 'Select Bank', amount: '' });
  const [incomeForm, setIncomeForm] = useState({ desc: '', receivedFrom: '', bank: 'Select Bank', amount: '' });
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);

  // --- STATS CALCULATION ---
  const stats = entries.reduce((acc, curr) => {
    acc.credit += Number(curr.credit) || 0;
    acc.debit += Number(curr.debit) || 0;
    return acc;
  }, { credit: 1792752, debit: 38460 }); 
  
  const netBalance = stats.credit - stats.debit;

  // --- HANDLERS ---
  const handleSaveExpense = () => {
    if (!expenseForm.amount || !expenseForm.desc) return alert("Fill Expense Details");
    const newEntry = {
      id: Date.now(),
      date: entryDate,
      type: 'Expense',
      party: expenseForm.paidTo,
      bank: expenseForm.bank,
      desc: expenseForm.desc,
      debit: Number(expenseForm.amount),
      credit: 0,
      balance: netBalance - Number(expenseForm.amount)
    };
    setEntries([newEntry, ...entries]);
    setExpenseForm({ desc: '', paidTo: '', bank: 'Select Bank', amount: '' });
    alert("Expense Saved!");
  };

  const handleSaveIncome = () => {
    if (!incomeForm.amount || !incomeForm.desc) return alert("Fill Income Details");
    const newEntry = {
      id: Date.now(),
      date: entryDate,
      type: 'Income',
      party: incomeForm.receivedFrom,
      bank: incomeForm.bank,
      desc: incomeForm.desc,
      debit: 0,
      credit: Number(incomeForm.amount),
      balance: netBalance + Number(incomeForm.amount)
    };
    setEntries([newEntry, ...entries]);
    setIncomeForm({ desc: '', receivedFrom: '', bank: 'Select Bank', amount: '' });
    alert("Income Saved!");
  };

  // --- STYLES ---
  const cardStyle = { background: 'white', borderRadius: '12px', padding: '20px', flex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden', minWidth: '300px' };
  const labelStyle = { fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '5px', display: 'block' };
  const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%', fontSize: '13px', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' };
  const buttonStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '10px' };
  const tableHeaderStyle = { padding: '15px', fontSize: '12px', fontWeight: '700', color: '#64748b', borderBottom: '2px solid #f1f5f9', textAlign: 'left' };
  const tableCellStyle = { padding: '15px', fontSize: '13px', borderBottom: '1px solid #f8fafc', color: '#334155' };

  return (
    <div className="fade-in" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
           <button onClick={() => navigate('/payroll')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: '#64748b', fontWeight: '600', marginBottom: '5px' }}>
             <ArrowLeft size={16}/> Back to Accounts
           </button>
           <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e1b4b', margin: 0 }}>General Ledger</h1>
           <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Track all financial transactions and account balances</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
           {/* UPDATED: Export button now has a dark blue background and white text */}
           <button style={{ background: '#1e1b4b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
             <Download size={16}/> Export
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ ...cardStyle, borderLeft: '4px solid #10b981' }}>
           <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Credit (In)</span>
           <h2 style={{ fontSize: '24px', color: '#10b981', margin: '10px 0' }}>₹{stats.credit.toLocaleString()}</h2>
           <ArrowUpCircle size={24} color="#10b981" style={{ position: 'absolute', right: '20px', top: '20px', opacity: 0.2 }} />
        </div>
        <div style={{ ...cardStyle, borderLeft: '4px solid #ef4444' }}>
           <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Debit (Out)</span>
           <h2 style={{ fontSize: '24px', color: '#ef4444', margin: '10px 0' }}>₹{stats.debit.toLocaleString()}</h2>
           <ArrowDownCircle size={24} color="#ef4444" style={{ position: 'absolute', right: '20px', top: '20px', opacity: 0.2 }} />
        </div>
        <div style={{ ...cardStyle, borderLeft: '4px solid #3b82f6' }}>
           <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Net Balance</span>
           <h2 style={{ fontSize: '24px', color: '#3b82f6', margin: '10px 0' }}>₹{netBalance.toLocaleString()}</h2>
           <Wallet size={24} color="#3b82f6" style={{ position: 'absolute', right: '20px', top: '20px', opacity: 0.2 }} />
        </div>
        <div style={{ ...cardStyle, borderLeft: '4px solid #1e1b4b' }}>
           <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Entries</span>
           <h2 style={{ fontSize: '24px', color: '#1e1b4b', margin: '10px 0' }}>{entries.length + 25}</h2>
           <List size={24} color="#1e1b4b" style={{ position: 'absolute', right: '20px', top: '20px', opacity: 0.2 }} />
        </div>
      </div>

      {/* Forms Section */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        
        {/* Expense Form */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}><MinusCircle size={20}/> New Expense</h3>
          <label style={labelStyle}>Description</label>
          <input style={inputStyle} placeholder="e.g. Office Rent" value={expenseForm.desc} onChange={(e) => setExpenseForm({...expenseForm, desc: e.target.value})} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Paid To</label>
              <input style={inputStyle} placeholder="Vendor Name" value={expenseForm.paidTo} onChange={(e) => setExpenseForm({...expenseForm, paidTo: e.target.value})} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Amount</label>
              <input type="number" style={inputStyle} placeholder="0.00" value={expenseForm.amount} onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})} />
            </div>
          </div>
          <button onClick={handleSaveExpense} style={{ ...buttonStyle, background: '#ef4444', color: 'white' }}><Save size={16}/> Record Expense</button>
        </div>

        {/* Income Form */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}><PlusCircle size={20}/> New Income</h3>
          <label style={labelStyle}>Description</label>
          <input style={inputStyle} placeholder="e.g. Invoice #101" value={incomeForm.desc} onChange={(e) => setIncomeForm({...incomeForm, desc: e.target.value})} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Received From</label>
              <input style={inputStyle} placeholder="Client Name" value={incomeForm.receivedFrom} onChange={(e) => setIncomeForm({...incomeForm, receivedFrom: e.target.value})} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Amount</label>
              <input type="number" style={inputStyle} placeholder="0.00" value={incomeForm.amount} onChange={(e) => setIncomeForm({...incomeForm, amount: e.target.value})} />
            </div>
          </div>
          <button onClick={handleSaveIncome} style={{ ...buttonStyle, background: '#10b981', color: 'white' }}><Save size={16}/> Record Income</button>
        </div>
      </div>

      {/* Transactions Table */}
      <div style={{ ...cardStyle, padding: 0 }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: '#1e1b4b' }}>Recent Transactions</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '13px' }}>
            <Filter size={16} /> Filter
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Party</th>
              <th style={tableHeaderStyle}>Type</th>
              <th style={{ ...tableHeaderStyle, textAlign: 'right', color: '#ef4444' }}>Debit</th>
              <th style={{ ...tableHeaderStyle, textAlign: 'right', color: '#10b981' }}>Credit</th>
              <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td style={tableCellStyle}>{entry.date}</td>
                <td style={{...tableCellStyle, fontWeight: '600'}}>{entry.desc}</td>
                <td style={tableCellStyle}>{entry.party}</td>
                <td style={tableCellStyle}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: '700',
                    background: entry.type === 'Income' ? '#dcfce7' : '#fee2e2',
                    color: entry.type === 'Income' ? '#166534' : '#991b1b'
                  }}>
                    {entry.type}
                  </span>
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'right', color: '#ef4444' }}>{entry.debit > 0 ? `₹${entry.debit}` : '-'}</td>
                <td style={{ ...tableCellStyle, textAlign: 'right', color: '#10b981' }}>{entry.credit > 0 ? `₹${entry.credit}` : '-'}</td>
                <td style={{ ...tableCellStyle, textAlign: 'right', fontWeight: '600' }}>₹{entry.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Ledger;