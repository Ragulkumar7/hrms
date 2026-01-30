import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API call panna axios use pannuvom

const AccountsTeam = () => {
    // Current-ah entha view-la irukom nu track panna state
    const [activeTab, setActiveTab] = useState('invoice');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Backend-la irundhu data fetch panna (Node.js API)
    useEffect(() => {
        fetchData();
    }, [activeTab]);

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
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2 style={{ color: '#333' }}>Accounts Team Management</h2>

            {/* --- Navigation Tabs --- */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {['invoice', 'ledger', 'purchase-order'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 20px',
                            cursor: 'pointer',
                            backgroundColor: activeTab === tab ? '#007bff' : '#f0f0f0',
                            color: activeTab === tab ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '5px',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab.replace('-', ' ')}
                    </button>
                ))}
            </div>

            {/* --- Content Area --- */}
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {loading ? (
                    <p>Loading {activeTab} data...</p>
                ) : (
                    <div className="table-container">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                                    <th style={tableHeaderStyle}>ID</th>
                                    <th style={tableHeaderStyle}>Date</th>
                                    <th style={tableHeaderStyle}>Description/Name</th>
                                    <th style={tableHeaderStyle}>Amount</th>
                                    <th style={tableHeaderStyle}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={tableCellStyle}>{item.id || item._id}</td>
                                            <td style={tableCellStyle}>{new Date(item.date).toLocaleDateString()}</td>
                                            <td style={tableCellStyle}>{item.description || item.vendor_name || 'N/A'}</td>
                                            <td style={tableCellStyle}>₹{item.total_amount || item.amount}</td>
                                            <td style={tableCellStyle}>
                                                <span style={{ 
                                                    padding: '4px 8px', 
                                                    borderRadius: '4px', 
                                                    fontSize: '12px',
                                                    backgroundColor: item.status === 'Paid' ? '#d4edda' : '#fff3cd' 
                                                }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No records found for {activeTab}.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

// Internal CSS Styles
const tableHeaderStyle = { padding: '12px', textAlign: 'left', fontWeight: 'bold' };
const tableCellStyle = { padding: '12px', textAlign: 'left' };

export default AccountsTeam;