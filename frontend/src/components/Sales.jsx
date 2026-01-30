import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {
  Users,
  DollarSign,
  TrendingUp,
  Download,
  PieChart as ChartIcon,
  PlusCircle,
  BarChart3,
  MousePointer2,
  ChevronDown,
  Building2,
  AlertTriangle,
  Calendar,
  Trash2,
  RefreshCw,
  Save,
  Plus,
  FileText,
  CheckCircle2,
  X,        // For the Cross mark
  Printer   // For the Print symbol
} from "lucide-react";

const Sales = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("pipeline");

  const tabs = [
    {
      id: "pipeline",
      label: "Pipeline & Billing",
      icon: <DollarSign size={18} />,
    },
    { id: "executive", label: "Sales Executive", icon: <Users size={18} /> },
    { id: "lead", label: "Lead & Expenses", icon: <ChartIcon size={18} /> },
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="main-title">Sales Manager</h1>
          <p className="sub-title">
            Manage client billing, executive targets, and revenue leads.
          </p>
        </div>
      </div>

      <div className="rec-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rec-tab-btn ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card" style={{ minHeight: "600px" }}>
        {activeTab === "pipeline" && <SalesBillingModule />}
        {activeTab === "executive" && <SalesExecutiveModule />}
        {activeTab === "lead" && <LeadExpensesModule />}
      </div>
    </div>
  );
};

/* --- 1. PIPELINE & BILLING MODULE --- */
const SalesBillingModule = () => {
  // --- State for the Form ---
  const [invoiceHeader, setInvoiceHeader] = useState({
    invoiceNo: "INV-2026-014",
    client: "",
    bank: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState([
    { id: 1, desc: "", qty: 1, rate: 0, gstPercent: 18 },
  ]);

  const [financials, setFinancials] = useState({
    discount: 0,
    paymentTerms: "Payment due within 15 days",
    notes: "",
  });

  // --- State for Saved Invoices Table ---
  const [savedInvoices, setSavedInvoices] = useState([
    { invoiceNo: "INV-2026-013", client: "Tech Solutions", date: "2026-01-28", amount: 11800.00, status: "Paid" }
  ]);

  // --- Calculations ---
  const calculateTotals = () => {
    let subtotal = 0;
    let totalGst = 0;

    items.forEach((item) => {
      const lineBase = item.qty * item.rate;
      const lineGst = lineBase * (item.gstPercent / 100);
      subtotal += lineBase;
      totalGst += lineGst;
    });

    const grandTotal = subtotal + totalGst - Number(financials.discount);
    return { subtotal, totalGst, grandTotal };
  };

  const { subtotal, totalGst, grandTotal } = calculateTotals();

  // --- Handlers ---
  const updateHeader = (field, value) => {
    setInvoiceHeader((prev) => ({ ...prev, [field]: value }));
  };

  const updateFinancials = (field, value) => {
    setFinancials((prev) => ({ ...prev, [field]: value }));
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        desc: "",
        qty: 1,
        rate: 0,
        gstPercent: 18,
      },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSaveInvoice = () => {
    if (!invoiceHeader.client) {
      alert("Please select a client.");
      return;
    }

    const newInvoice = {
      invoiceNo: invoiceHeader.invoiceNo,
      client: invoiceHeader.client,
      date: invoiceHeader.date,
      amount: grandTotal,
      status: "Pending"
    };

    setSavedInvoices([newInvoice, ...savedInvoices]);
    alert("Invoice saved successfully!");
    
    // Auto-increment invoice number
    const currentNum = parseInt(invoiceHeader.invoiceNo.split('-')[2]);
    setInvoiceHeader(prev => ({ ...prev, invoiceNo: `INV-2026-0${currentNum + 1}` }));
  };

  // --- Styles ---
  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "6px",
    textTransform: "uppercase",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    outline: "none",
    color: "#334155",
  };

  return (
    <div className="p-4" style={{ background: "#fff", borderRadius: "12px" }}>
      {/* --- Top Inputs Grid --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <label style={labelStyle}>Invoice Number</label>
          <input
            style={inputStyle}
            value={invoiceHeader.invoiceNo}
            onChange={(e) => updateHeader("invoiceNo", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Client Name</label>
          <select
            style={inputStyle}
            value={invoiceHeader.client}
            onChange={(e) => updateHeader("client", e.target.value)}
          >
            <option value="">Select Client</option>
            <option value="Global Corp">Global Corp</option>
            <option value="Tech Solutions">Tech Solutions</option>
            <option value="Shruthi Inc">Shruthi Inc</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Receiving Bank</label>
          <input
            style={inputStyle}
            placeholder="Select or Type Bank"
            value={invoiceHeader.bank}
            onChange={(e) => updateHeader("bank", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Invoice Date</label>
          <div style={{ position: "relative" }}>
            <input
              type="date"
              style={inputStyle}
              value={invoiceHeader.date}
              onChange={(e) => updateHeader("date", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- Invoice Items Header --- */}
      <div style={{ marginBottom: "15px" }}>
        <h3
          style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b" }}
        >
          Invoice Items
        </h3>
      </div>

      {/* --- Items Table Header --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 3fr 1fr 1.5fr 1fr 1.5fr 1.5fr 40px",
          gap: "10px",
          background: "#f8fafc",
          padding: "10px 10px",
          borderRadius: "6px",
          marginBottom: "10px",
        }}
      >
        <span style={labelStyle}>S.No</span>
        <span style={labelStyle}>Description / Particulars</span>
        <span style={labelStyle}>Qty</span>
        <span style={labelStyle}>Rate</span>
        <span style={labelStyle}>GST %</span>
        <span style={labelStyle}>GST Amt</span>
        <span style={labelStyle}>Total</span>
        <span></span>
      </div>

      {/* --- Items Rows --- */}
      {items.map((item, index) => {
        const gstAmount = (item.qty * item.rate * item.gstPercent) / 100;
        const lineTotal = item.qty * item.rate + gstAmount;

        return (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "40px 3fr 1fr 1.5fr 1fr 1.5fr 1.5fr 40px",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              {index + 1}
            </span>
            <input
              style={inputStyle}
              placeholder="Item description"
              value={item.desc}
              onChange={(e) => updateItem(item.id, "desc", e.target.value)}
            />
            <input
              style={inputStyle}
              type="number"
              value={item.qty}
              onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))}
            />
            <input
              style={inputStyle}
              type="number"
              placeholder="0.00"
              value={item.rate}
              onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
            />
            <input
              style={inputStyle}
              type="number"
              value={item.gstPercent}
              onChange={(e) => updateItem(item.id, "gstPercent", Number(e.target.value))}
            />
            <input
              style={{ ...inputStyle, background: "#f1f5f9", cursor: "not-allowed" }}
              disabled
              value={gstAmount.toFixed(2)}
            />
            <input
              style={{ ...inputStyle, background: "#f1f5f9", cursor: "not-allowed" }}
              disabled
              value={lineTotal.toFixed(2)}
            />
            
            {/* UPDATED: Red Cross Mark Button (No background box) */}
            <button
              onClick={() => removeItem(item.id)}
              style={{
                border: "none",
                background: "transparent", 
                color: "#ef4444", // Red color for the icon
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: "8px"
              }}
              title="Remove Item"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
        );
      })}

      {/* --- Add Button --- */}
      <button
        onClick={addItem}
        style={{
          background: "#10b981",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        <Plus size={16} /> Add Item
      </button>

      {/* --- Footer / Calculations Section --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "40px",
          marginTop: "40px",
        }}
      >
        {/* Left: Notes & Terms */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Payment Terms</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }}
              value={financials.paymentTerms}
              onChange={(e) => updateFinancials("paymentTerms", e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }}
              placeholder="Additional notes or instructions"
              value={financials.notes}
              onChange={(e) => updateFinancials("notes", e.target.value)}
            />
          </div>
        </div>

        {/* Right: Totals Card */}
        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontSize: "13px",
            }}
          >
            <span>Subtotal:</span>
            <span style={{ fontWeight: "600" }}>₹{subtotal.toFixed(2)}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              fontSize: "13px",
            }}
          >
            <span>Discount:</span>
            <input
              type="number"
              style={{
                width: "100px",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                textAlign: "right",
              }}
              value={financials.discount}
              onChange={(e) =>
                updateFinancials("discount", Number(e.target.value))
              }
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              fontSize: "13px",
              paddingBottom: "15px",
              borderBottom: "1px solid #cbd5e1",
            }}
          >
            <span>Total GST:</span>
            <span style={{ fontWeight: "600" }}>₹{totalGst.toFixed(2)}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "16px",
              fontWeight: "700",
              color: "#1e293b",
            }}
          >
            <span>Grand Total:</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            background: "#f1f5f9",
            color: "#475569",
            border: "none",
            borderRadius: "6px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
        <button
          onClick={handleSaveInvoice}
          style={{
            padding: "10px 24px",
            background: "#1e1b4b", // Dark blue
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Save Invoice
        </button>
      </div>

      {/* --- SAVED INVOICES TABLE --- */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
          <FileText size={18} /> Recently Saved Invoices
        </h3>
        
        <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    <th style={{ padding: "12px", fontSize: "12px", color: "#64748b" }}>Invoice #</th>
                    <th style={{ padding: "12px", fontSize: "12px", color: "#64748b" }}>Date</th>
                    <th style={{ padding: "12px", fontSize: "12px", color: "#64748b" }}>Client</th>
                    <th style={{ padding: "12px", fontSize: "12px", color: "#64748b" }}>Amount</th>
                    <th style={{ padding: "12px", fontSize: "12px", color: "#64748b" }}>Status</th>
                    <th style={{ padding: "12px", fontSize: "12px", color: "#64748b" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {savedInvoices.map((inv, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "12px", fontSize: "13px", fontWeight: "500" }}>{inv.invoiceNo}</td>
                        <td style={{ padding: "12px", fontSize: "13px", color: "#64748b" }}>{inv.date}</td>
                        <td style={{ padding: "12px", fontSize: "13px" }}>{inv.client}</td>
                        <td style={{ padding: "12px", fontSize: "13px", fontWeight: "600" }}>₹{inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td style={{ padding: "12px" }}>
                            <span style={{ 
                                fontSize: "11px", 
                                padding: "3px 8px", 
                                borderRadius: "12px", 
                                background: inv.status === "Paid" ? "#dcfce7" : "#fff7ed",
                                color: inv.status === "Paid" ? "#166534" : "#c2410c",
                                fontWeight: "500"
                            }}>
                                {inv.status}
                            </span>
                        </td>
                         <td style={{ padding: "12px" }}>
                            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#3b82f6" }}>
                                {/* UPDATED: Replaced Download with Printer symbol */}
                                <Printer size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

/* --- 2. SALES EXECUTIVE MODULE --- */
const SalesExecutiveModule = () => {
  const [clientList, setClientList] = useState(() => {
    const saved = localStorage.getItem("sales_clients");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Global Corp",
            phone: "9876543210",
            email: "contact@global.com",
          },
          {
            id: 2,
            name: "Shruthi",
            phone: "5677445576",
            email: "shruthi90@gmail.com",
          },
        ];
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("sales_assignments");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 101,
            client: "Global Corp",
            employee: "Arun",
            target: 50000,
            deadline: "2026-02-15",
            status: "Yet to start process",
          },
          {
            id: 102,
            client: "Shruthi",
            employee: "Varshith",
            target: 35000,
            deadline: "2026-02-05",
            status: "Yet to start process",
          },
        ];
  });

  const [clientForm, setClientForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [assignForm, setAssignForm] = useState({
    client: "",
    employee: "",
    target: "",
    deadline: "",
  });

  useEffect(() => {
    localStorage.setItem("sales_clients", JSON.stringify(clientList));
  }, [clientList]);

  useEffect(() => {
    localStorage.setItem("sales_assignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleAddClient = (e) => {
    e.preventDefault();
    if (clientForm.name) {
      setClientList([
        ...clientList,
        { ...clientForm, id: Date.now() + Math.random() },
      ]);
      setClientForm({ name: "", phone: "", email: "" });
    }
  };

  const handleAllotment = (e) => {
    e.preventDefault();
    if (assignForm.client && assignForm.employee) {
      setAssignments([
        ...assignments,
        {
          ...assignForm,
          id: Date.now() + Math.random(),
          status: "Yet to start process",
        },
      ]);
      setAssignForm({ client: "", employee: "", target: "", deadline: "" });
    }
  };

  const updateStatus = (id, newStatus) => {
    setAssignments(
      assignments.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="sales-exec-view p-4">
      <div
        className="split-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div className="section-container">
          <h3 className="section-heading">
            <PlusCircle size={18} /> 1. Add New Client
          </h3>
          <form
            onSubmit={handleAddClient}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              className="standard-input"
              placeholder="Client Name"
              value={clientForm.name}
              onChange={(e) =>
                setClientForm({ ...clientForm, name: e.target.value })
              }
              required
            />
            <input
              className="standard-input"
              placeholder="Phone Number"
              value={clientForm.phone}
              onChange={(e) =>
                setClientForm({ ...clientForm, phone: e.target.value })
              }
            />
            <input
              className="standard-input"
              placeholder="Email Address"
              value={clientForm.email}
              onChange={(e) =>
                setClientForm({ ...clientForm, email: e.target.value })
              }
            />
            <button className="btn-secondary full-width" type="submit">
              Save Permanently
            </button>
          </form>
        </div>

        <div className="section-container">
          <h3 className="section-heading">
            <Users size={18} /> 2. Set Target & Allot Employee
          </h3>
          <form
            onSubmit={handleAllotment}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <select
              className="standard-input"
              value={assignForm.client}
              onChange={(e) =>
                setAssignForm({ ...assignForm, client: e.target.value })
              }
              required
            >
              <option value="">Select Saved Client</option>
              {clientList.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              className="standard-input"
              value={assignForm.employee}
              onChange={(e) =>
                setAssignForm({ ...assignForm, employee: e.target.value })
              }
              required
            >
              <option value="">Assign Employee</option>
              <option value="Arun">Arun</option>
              <option value="Varshith">Varshith</option>
              <option value="Sana">Sana</option>
            </select>
            <input
              className="standard-input"
              type="number"
              placeholder="Target Value (₹)"
              value={assignForm.target}
              onChange={(e) =>
                setAssignForm({ ...assignForm, target: e.target.value })
              }
              required
            />
            <input
              className="standard-input"
              type="date"
              value={assignForm.deadline}
              onChange={(e) =>
                setAssignForm({ ...assignForm, deadline: e.target.value })
              }
              required
            />
            <button className="btn-action full-width" type="submit">
              Assign Project
            </button>
          </form>
        </div>
      </div>

      <div
        className="split-layout"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div className="section-container">
          <h3 className="section-heading">Client Directory</h3>
          <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {clientList.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.phone}</td>
                    <td style={{ fontSize: "11px" }}>{client.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-container">
          <h3 className="section-heading">Current Allotments</h3>
          <div
            className="assignment-list"
            style={{ maxHeight: "350px", overflowY: "auto" }}
          >
            {assignments.map((item) => (
              <div
                key={item.id}
                className="glass-card mb-2"
                style={{
                  padding: "15px",
                  borderLeft: "4px solid #eeeef3",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <b>{item.client}</b>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      className="status-pill active"
                      style={{ fontSize: "10px", padding: "2px 8px" }}
                    >
                      {item.employee}
                    </span>
                    <div style={{ position: "relative" }}>
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        style={{
                          appearance: "none",
                          padding: "4px 24px 4px 8px",
                          fontSize: "11px",
                          borderRadius: "4px",
                          border: "1px solid #f3f5f7",
                          backgroundColor: "#f8fafc",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <option value="Yet to start process">
                          Yet to start process
                        </option>
                        <option value="Pending follow up">
                          Pending follow up
                        </option>
                        <option value="Completed">Completed</option>
                        <option value="Not interested">Not interested</option>
                      </select>
                      <ChevronDown
                        size={12}
                        style={{
                          position: "absolute",
                          right: "6px",
                          top: "25%",
                          pointerEvents: "none",
                          color: "#040404",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginTop: "5px",
                  }}
                >
                  Target: ₹{Number(item.target).toLocaleString()} | Due:{" "}
                  {item.deadline}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "4px",
                    color: "#64748b",
                    fontWeight: "600",
                  }}
                >
                  Status: {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- 3. LEAD & EXPENSES MODULE --- */
const LeadExpensesModule = () => {
  const pipelineStages = [
    { label: "Contacted", count: 50000, color: "#f97316" },
    { label: "Opportunity", count: 25985, color: "#3b82f6" },
    { label: "Not Contacted", count: 12566, color: "#64748b" },
    { label: "Closed", count: 8965, color: "#10b981" },
    { label: "Lost", count: 2452, color: "#ef4444" },
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="lead-expenses-view p-4">
      <div
        className="stages-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {pipelineStages.map((stage) => (
          <div
            key={stage.label}
            className="stat-card"
            style={{
              textAlign: "center",
              borderTop: `4px solid ${stage.color}`,
              padding: "15px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              {stage.label}
            </p>
            <h3 style={{ margin: 0 }}>{stage.count.toLocaleString()}</h3>
          </div>
        ))}
      </div>

      <div
        className="split-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="section-container">
          <h3 className="section-heading">
            <BarChart3 size={18} /> Monthly Lead Analysis
          </h3>
          <div
            style={{
              height: "240px",
              background: "#f8fafc",
              borderRadius: "8px",
              display: "flex",
              alignItems: "flex-end", // Aligns bars to the bottom
              gap: "8px",
              padding: "20px 15px",
            }}
          >
            {[35, 60, 40, 85, 65, 95, 55, 80, 40, 75, 45, 90].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: "100%",
                  gap: "8px",
                }}
              >
                {/* The bar itself */}
                <div
                  style={{
                    width: "100%",
                    height: `${h}%`,
                    background: "#f97316",
                    borderRadius: "4px 4px 0 0",
                  }}
                ></div>
                {/* The Month Label below the bar */}
                <span
                  style={{
                    fontSize: "10px",
                    color: "#94a3b8",
                    textAlign: "center",
                  }}
                >
                  {months[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-container">
          <h3 className="section-heading">
            <MousePointer2 size={18} /> Leads by Source
          </h3>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background:
                  "conic-gradient(#f97316 0% 40%, #10b981 40% 70%, #8b5cf6 70% 90%, #3b82f6 90% 100%)",
                margin: "10px auto",
                position: "relative",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "35px",
                  background: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <b style={{ fontSize: "18px" }}>40%</b>
              </div>
            </div>
            <div
              className="legend"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                fontSize: "11px",
                marginTop: "15px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#f97316",
                    borderRadius: "2px",
                  }}
                ></div>{" "}
                Google
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#10b981",
                    borderRadius: "2px",
                  }}
                ></div>{" "}
                LinkedIn
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#8b5cf6",
                    borderRadius: "2px",
                  }}
                ></div>{" "}
                Referral
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#3b82f6",
                    borderRadius: "2px",
                  }}
                ></div>{" "}
                Others
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="split-layout"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div className="section-container">
          <h3 className="section-heading">
            <AlertTriangle size={18} color="#ef4444" /> Lost Leads By Reason
          </h3>
          <table className="custom-table">
            <tbody>
              <tr>
                <td>Price too high</td>
                <td style={{ textAlign: "right", fontWeight: "600" }}>42%</td>
              </tr>
              <tr>
                <td>Competitor selected</td>
                <td style={{ textAlign: "right", fontWeight: "600" }}>28%</td>
              </tr>
              <tr>
                <td>No requirement now</td>
                <td style={{ textAlign: "right", fontWeight: "600" }}>15%</td>
              </tr>
              <tr>
                <td>Bad timing</td>
                <td style={{ textAlign: "right", fontWeight: "600" }}>10%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section-container">
          <h3 className="section-heading">
            <Building2 size={18} /> Leads By Companies
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                background: "#f8fafc",
                borderRadius: "8px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "#1e1b4b",
                    borderRadius: "6px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  P
                </div>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>
                  Pitch
                </span>
              </div>
              <span className="status-pill active">₹45,985</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                background: "#f8fafc",
                borderRadius: "8px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "#8b5cf6",
                    borderRadius: "6px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  I
                </div>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>
                  Initech
                </span>
              </div>
              <span className="status-pill active">₹21,145</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;