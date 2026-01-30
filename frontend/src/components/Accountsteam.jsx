import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, FileText, ShoppingCart, List, ArrowLeft } from 'lucide-react';
import InvoiceSystem from './accounts/InvoiceSystem';
import PurchaseOrder from './purchaseorder';
import Ledger from './accounts/ledger';

const AccountsTeam = () => {
    // --- EXISTING STATE LOGIC ---
    const [activeTab, setActiveTab] = useState('invoice');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // --- NEW STATE FOR FORM VIEW ---
    const [showForm, setShowForm] = useState(false);

    // --- EXISTING FETCH DATA LOGIC ---
    useEffect(() => {
        if (!showForm) {
            fetchData();
        }
    }, [activeTab, showForm]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetching data based on active tab
            const response = await axios.get(`http://localhost:5000/api/accounts/${activeTab}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching accounts data:", error);
            setData([]);
        }
        setLoading(false);
    };

    // Render Table Row based on item data
    const renderTableContent = () => {
        if (data.length > 0) {
            return data.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={tableCellStyle}>{item.id || item._id || item.invoiceNo || item.poNumber}</td>
                    <td style={tableCellStyle}>{new Date(item.date).toLocaleDateString()}</td>
                    <td style={tableCellStyle}>{item.description || item.vendor_name || item.client || item.vendor || 'N/A'}</td>
                    <td style={tableCellStyle}>₹{item.total_amount || item.amount || item.grandTotal}</td>
                    <td style={tableCellStyle}>
                        <span style={{ 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: item.status === 'Paid' || item.status === 'Confirmed' ? '#d4edda' : '#fff3cd',
                            color: item.status === 'Paid' || item.status === 'Confirmed' ? '#155724' : '#856404'
                        }}>
                            {item.status || 'Pending'}
                        </span>
                    </td>
                </tr>
            ));
        }
        return (
            <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No records found for {activeTab.replace('-', ' ')}. Click "Create New" to add one.
                </td>
            </tr>
        );
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ color: '#1e1b4b', margin: 0, fontSize: '26px', fontWeight: '800' }}>Accounts Team Management</h2>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>Track invoices, ledgers, and procurement orders</p>
                </div>

                {/* --- ACTION BUTTON --- */}
                {!showForm && (
                    <button 
                        onClick={() => setShowForm(true)}
                        style={{
                            background: '#7C3AED',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
                        }}
                    >
                        <Plus size={20} /> Create New {activeTab.replace('-', ' ')}
                    </button>
                )}
            </div>

            {/* --- NAVIGATION TABS (EXISTING) --- */}
            {!showForm && (
                <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', background: 'white', padding: '8px', borderRadius: '14px', width: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    {['invoice', 'ledger', 'purchase-order'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '10px 25px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                backgroundColor: activeTab === tab ? '#7C3AED' : 'transparent',
                                color: activeTab === tab ? 'white' : '#64748b',
                                border: 'none',
                                borderRadius: '10px',
                                fontWeight: '700',
                                textTransform: 'capitalize'
                            }}
                        >
                            {tab.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            )}

            {/* --- CONTENT AREA --- */}
            {showForm ? (
                <div className="form-wrapper">
                    <button 
                        onClick={() => setShowForm(false)} 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginBottom: '20px', color: '#475569' }}
                    >
                        <ArrowLeft size={18} /> Back to List
                    </button>
                    
                    {/* Dynamic Component Rendering */}
                    {activeTab === 'invoice' && <InvoiceSystem />}
                    {activeTab === 'purchase-order' && <PurchaseOrder />}
                    {activeTab === 'ledger' && <Ledger />}
                </div>
            ) : (
                <div style={{ backgroundColor: 'white', padding: '0', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    {loading ? (
                        <div style={{ padding: '50px', textAlign: 'center', color: '#64748b' }}>
                            <p>Loading {activeTab.replace('-', ' ')} data...</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #f1f5f9' }}>
                                        <th style={tableHeaderStyle}>Ref ID</th>
                                        <th style={tableHeaderStyle}>Date</th>
                                        <th style={tableHeaderStyle}>Entity Name / Description</th>
                                        <th style={tableHeaderStyle}>Total Amount</th>
                                        <th style={tableHeaderStyle}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableContent()}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Internal CSS Styles
const tableHeaderStyle = { padding: '18px 20px', textAlign: 'left', fontWeight: '800', fontSize: '12px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' };
const tableCellStyle = { padding: '18px 20px', textAlign: 'left', fontSize: '14px', color: '#1e293b', fontWeight: '500' };

export default AccountsTeam;