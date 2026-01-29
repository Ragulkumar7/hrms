import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Download,
  Briefcase,
  PieChart as ChartIcon,
  FileText,
  PlusCircle,
  Target,
  BarChart3,
  MousePointer2,
  ChevronDown,
  Building2,
  AlertTriangle,
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
  const [leads] = useState([
    {
      id: 1,
      client: "Tech Solutions UAE",
      exec: "Arun",
      status: "Negotiation",
      value: 45000,
    },
    {
      id: 2,
      client: "Kovai Retail",
      exec: "Sana",
      status: "Analysis",
      value: 25000,
    },
    {
      id: 3,
      client: "London FinTech",
      exec: "Arun",
      status: "Closed",
      value: 85000,
    },
  ]);

  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, desc: "Web App Development", qty: 1, rate: 50000 },
  ]);
  const subtotal = invoiceItems.reduce(
    (acc, item) => acc + item.qty * item.rate,
    0,
  );
  const total = subtotal + subtotal * 0.18;

  const updateInvoiceItem = (id, field, value) => {
    setInvoiceItems(
      invoiceItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <div className="sales-admin-view p-4">
      <div
        className="split-layout"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div className="section-container">
          <h3 className="section-heading">Active Pipeline</h3>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Executive</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.client}</td>
                  <td>{lead.exec}</td>
                  <td>₹{lead.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section-container">
          <h3 className="section-heading">Invoice Generator</h3>
          <div
            className="invoice-box"
            style={{
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            {invoiceItems.map((item) => (
              <div
                className="invoice-row mb-2"
                key={item.id}
                style={{ display: "flex", gap: "10px" }}
              >
                <input
                  className="standard-input"
                  placeholder="Service"
                  value={item.desc}
                  onChange={(e) =>
                    updateInvoiceItem(item.id, "desc", e.target.value)
                  }
                  style={{ flex: 2 }}
                />
                <input
                  className="standard-input"
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    updateInvoiceItem(item.id, "rate", e.target.value)
                  }
                  style={{ width: "100px" }}
                />
              </div>
            ))}
            <div
              className="summary"
              style={{
                borderTop: "1px solid #ddd",
                marginTop: "10px",
                paddingTop: "10px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total (+18% GST):</span> <b>₹{total.toLocaleString()}</b>
              </div>
              <button className="btn-action full-width mt-2">
                <Download size={16} /> Download Invoice
              </button>
            </div>
          </div>
        </div>
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
        item.id === id ? { ...item, status: newStatus } : item,
      ),
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
                  borderLeft: "4px solid #4f46e5",
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
                          border: "1px solid #e2e8f0",
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
                          color: "#94a3b8",
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
                    color: "#4f46e5",
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
