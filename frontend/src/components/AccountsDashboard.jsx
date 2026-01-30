import React, { useState } from 'react';
import { 
  DollarSign, ArrowUpRight, ArrowDownRight, Clock, 
  AlertTriangle, FileText, Plus, List, Search 
} from 'lucide-react';

const AccountsTeam = () => {
  const [activeTab, setActiveTab] = useState('Invoice');

  const summary = {
    cashBalance: 1248000,
    outstandingPayables: 458000,
    outstandingReceivables: 872000,
    overdueInvoices: { count: 7, amount: 285000 },
  };

  const tabs = ['Invoice', 'Ledger', 'Purchase Order'];

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-full mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1B4B]">Accounts Team Management</h1>
            <p className="text-gray-500 text-sm">Manage financial records and compliance</p>
          </div>
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow-lg shadow-purple-200 font-semibold">
            <Plus size={18} /> Create New {activeTab}
          </button>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard title="Cash Balance" amount={`₹${summary.cashBalance.toLocaleString()}`} icon={<DollarSign className="text-green-600" />} color="green" />
          <KPICard title="Outstanding Receivables" amount={`₹${summary.outstandingReceivables.toLocaleString()}`} icon={<ArrowUpRight className="text-blue-600" />} color="blue" />
          <KPICard title="Outstanding Payables" amount={`₹${summary.outstandingPayables.toLocaleString()}`} icon={<ArrowDownRight className="text-orange-600" />} color="orange" />
          <KPICard title="Overdue Invoices" amount={`${summary.overdueInvoices.count} • ₹${summary.overdueInvoices.amount.toLocaleString()}`} icon={<AlertTriangle className="text-red-600" />} color="red" />
        </div>

        {/* Tab System & Table Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <div className="flex bg-gray-50 p-1.5 rounded-2xl w-fit gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab 
                    ? 'bg-[#7C3AED] text-white shadow-md' 
                    : 'text-gray-500 hover:text-indigo-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[11px] uppercase tracking-wider border-b border-gray-50">
                  <th className="px-8 py-5 font-bold">Ref ID</th>
                  <th className="px-8 py-5 font-bold">Date</th>
                  <th className="px-8 py-5 font-bold">Entity Name</th>
                  <th className="px-8 py-5 font-bold">Amount</th>
                  <th className="px-8 py-5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <FileText size={48} className="mb-3 opacity-20" />
                      <p className="text-sm">No records found for {activeTab.toLowerCase()}.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Sub-component
const KPICard = ({ title, amount, icon, color }) => {
  const colors = {
    green: 'bg-green-50',
    blue: 'bg-blue-50',
    orange: 'bg-orange-50',
    red: 'bg-red-50'
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{title}</p>
          <h2 className="text-xl font-bold text-gray-800 mt-2">{amount}</h2>
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

export default AccountsTeam;