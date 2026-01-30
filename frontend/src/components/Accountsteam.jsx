import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';

// Import your existing components
import InvoiceSystem from './accounts/InvoiceSystem';
import Ledger from './accounts/ledger';
import PurchaseOrder from './purchaseorder'; // Ensure this path matches your folder structure

const AccountsTeam = () => {
    // State to track current view and toggle between List/Form
    const [activeTab, setActiveTab] = useState('Invoice'); // Options: Invoice, Ledger, Purchase Order
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState([]);

    // --- LOAD DATA FROM LOCAL STORAGE ---
    useEffect(() => {
        // Only fetch data if we are in the list view
        if (!showForm) {
            loadData();
        }
    }, [activeTab, showForm]);

    const loadData = () => {
        let storageKey = '';
        
        // Select the correct storage key based on the active tab
        if (activeTab === 'Invoice') storageKey = 'account_invoices';
        else if (activeTab === 'Ledger') storageKey = 'account_ledger';
        else if (activeTab === 'Purchase Order') storageKey = 'account_pos';

        const savedData = localStorage.getItem(storageKey);
        
        if (savedData) {
            try {
                setData(JSON.parse(savedData));
            } catch (error) {
                console.error("Error parsing data", error);
                setData([]);
            }
        } else {
            setData([]); // Reset if no data found
        }
    };

    // Helper to get specific fields based on record type
    const getEntityName = (item) => item.client || item.vendor || item.category || 'N/A';
    const getReferenceId = (item) => item.invoiceNo || item.poNumber || item.id || 'N/A';
    const getAmount = (item) => item.grandTotal || item.amount || 0;
    const getStatus = (item) => item.status || item.type || 'Completed';

    return (
        <div className="fade-in" style={{ padding: '30px', background: '#f4f7fe', minHeight: '100vh' }}>
            
            {/* --- HEADER SECTION --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Accounts Team Management</h2>
                    <p style={{ color: '#64748b', fontSize: '14px', margin: '5px 0 0 0' }}>Manage financial records and compliance</p>
                </div>
                
                {/* Show 'Create New' button only when in List View */}
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
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)' 
                        }}
                    >
                        <Plus size={20}/> Create New {activeTab}
                    </button>
                )}
            </div>

            {/* --- TAB SWITCHER (Visible only in List View) --- */}
            {!showForm && (
                <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', background: '#fff', padding: '8px', borderRadius: '16px', width: 'fit-content', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    {['Invoice', 'Ledger', 'Purchase Order'].map((tab) => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)} 
                            style={{ 
                                padding: '10px 25px', 
                                cursor: 'pointer', 
                                backgroundColor: activeTab === tab ? '#7C3AED' : 'transparent', 
                                color: activeTab === tab ? 'white' : '#64748b', 
                                border: 'none', 
                                borderRadius: '10px', 
                                fontWeight: '700' 
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            )}

            {/* --- CONTENT AREA --- */}
            {showForm ? (
                // --- FORM VIEW ---
                <div>
                    <button 
                        onClick={() => { setShowForm(false); loadData(); }} 
                        style={{ 
                            marginBottom: '20px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            background: '#f1f5f9', 
                            border: '1px solid #e2e8f0', 
                            padding: '10px 18px', 
                            borderRadius: '10px', 
                            fontWeight: '700', 
                            cursor: 'pointer',
                            color: '#475569' 
                        }}
                    >
                        <ArrowLeft size={18} /> Back to List
                    </button>

                    {/* Render the specific component based on active tab */}
                    <div className="fade-in">
                        {activeTab === 'Invoice' && <InvoiceSystem />}
                        {activeTab === 'Purchase Order' && <PurchaseOrder />}
                        {activeTab === 'Ledger' && <Ledger />}
                    </div>
                </div>
            ) : (
                // --- LIST VIEW (TABLE) ---
                <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '13px' }}>
                                <th style={{ padding: '20px' }}>REF ID</th>
                                <th style={{ padding: '20px' }}>DATE</th>
                                <th style={{ padding: '20px' }}>ENTITY NAME / DESCRIPTION</th>
                                <th style={{ padding: '20px', textAlign: 'right' }}>AMOUNT</th>
                                <th style={{ padding: '20px', textAlign: 'center' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((item, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                                    <td style={{ padding: '18px 20px', fontWeight: '700', color: '#1e293b' }}>
                                        {getReferenceId(item)}
                                    </td>
                                    <td style={{ padding: '18px 20px', color: '#64748b' }}>
                                        {item.date}
                                    </td>
                                    <td style={{ padding: '18px 20px', fontWeight: '500' }}>
                                        {getEntityName(item)}
                                    </td>
                                    <td style={{ padding: '18px 20px', fontWeight: '800', textAlign: 'right', color: '#0f172a' }}>
                                        ₹{Number(getAmount(item)).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                                        <span style={{ 
                                            padding: '6px 12px', 
                                            borderRadius: '8px', 
                                            fontSize: '12px', 
                                            fontWeight: '700', 
                                            background: (getStatus(item) === 'Paid' || getStatus(item) === 'Credit' || getStatus(item) === 'Approved') ? '#dcfce7' : '#fff7ed', 
                                            color: (getStatus(item) === 'Paid' || getStatus(item) === 'Credit' || getStatus(item) === 'Approved') ? '#166534' : '#c2410c' 
                                        }}>
                                            {getStatus(item)}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
                                        No records found for {activeTab}.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AccountsTeam;