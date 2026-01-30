import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, ArrowLeft } from 'lucide-react';
import InvoiceSystem from './accounts/InvoiceSystem';
import PurchaseOrder from './purchaseorder';
import Ledger from './accounts/ledger';

const AccountsTeam = () => {
    // Current-ah entha view-la irukom nu track panna state
    const [activeTab, setActiveTab] = useState('invoice');
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Backend-la irundhu data fetch panna (Node.js API)
    useEffect(() => {
        if (!showForm) fetchData();
    }, [activeTab, showForm]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Unagada backend endpoint ippo /api/accounts/invoice etc. nu irundha:
            const response = await axios.get(`http://localhost:5000/api/accounts/${activeTab}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching accounts data:", error);
            // Error handling - logic for empty/failed data
            setData([]);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '30px', background: '#f4f7fe', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Accounts Team Management</h2>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>Manage financial records and compliance</p>
                </div>
                {!showForm && (
                  <button onClick={() => setShowForm(true)} style={{ background: '#7C3AED', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)' }}>
                    <Plus size={20}/> Create New {activeTab.replace('-', ' ')}
                  </button>
                )}
            </div>

            {!showForm && (
                <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', background: '#fff', padding: '8px', borderRadius: '16px', width: 'fit-content', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    {['invoice', 'ledger', 'purchase-order'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 25px', cursor: 'pointer', backgroundColor: activeTab === tab ? '#7C3AED' : 'transparent', color: activeTab === tab ? 'white' : '#64748b', border: 'none', borderRadius: '10px', fontWeight: '700', textTransform: 'capitalize' }}>
                            {tab.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            )}

            {showForm ? (
                <div>
                    {/* --- BUTTON COLOUR UPDATED FOR VISIBILITY --- */}
                    <button 
                        onClick={() => setShowForm(false)} 
                        style={{ 
                            marginBottom: '20px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            background: '#f1f5f9', 
                            border: 'none', 
                            padding: '10px 18px', 
                            borderRadius: '10px', 
                            fontWeight: '700', 
                            cursor: 'pointer',
                            color: '#475569' 
                        }}
                    >
                        <ArrowLeft size={18} /> Back to List
                    </button>
                    {activeTab === 'invoice' && <InvoiceSystem />}
                    {activeTab === 'purchase-order' && <PurchaseOrder />}
                    {activeTab === 'ledger' && <Ledger />}
                </div>
            ) : (
                <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '13px' }}>
                                <th style={{ padding: '20px' }}>REF ID</th>
                                <th style={{ padding: '20px' }}>DATE</th>
                                <th style={{ padding: '20px' }}>ENTITY NAME</th>
                                <th style={{ padding: '20px' }}>AMOUNT</th>
                                <th style={{ padding: '20px' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((item, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                                    <td style={{ padding: '18px 20px', fontWeight: '700' }}>{item.invoiceNo || item.poNumber || item.id}</td>
                                    <td style={{ padding: '18px 20px' }}>{new Date(item.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '18px 20px' }}>{item.client || item.vendor || item.category}</td>
                                    <td style={{ padding: '18px 20px', fontWeight: '800' }}>₹{(item.grandTotal || item.amount).toLocaleString()}</td>
                                    <td style={{ padding: '18px 20px' }}>
                                        <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', background: '#dcfce7', color: '#166534' }}>{item.status || 'Success'}</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>No records found for {activeTab}.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AccountsTeam;