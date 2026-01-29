import React, { useState, useRef } from "react";
import {
  Download,
  AlertCircle,
  X,
  Calendar,
  Users,
  Bell,
  Award,
  Briefcase,
  Phone,
  Mail,
  Cake,
  List,
  Clock,
  CheckCircle,
  Wrench,
  UserPlus,
  MessageSquare,
  FileText,
  DownloadCloud,
  User,
  ChevronDown,
  Info,
} from "lucide-react";

const EmployeeDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [showNotification, setShowNotification] = useState(true);
  const fileInputRef = useRef(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Task State
  const [allTasks, setAllTasks] = useState([
    {
      id: 1,
      title: "Submit Q1 Report",
      status: "Pending",
      time: "120",
      empName: "Arun",
    },
    {
      id: 2,
      title: "Update Client Assets",
      status: "Completed",
      time: "45",
      empName: "Arun",
    },
  ]);

  // Modal States
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportType, setSupportType] = useState("");
  const [supportReason, setSupportReason] = useState("");

  // --- NEW: Custom Message Popup State ---
  const [msgModal, setMsgModal] = useState({ isOpen: false, text: "" });

  const triggerPopup = (text) => {
    setMsgModal({ isOpen: true, text });
  };

  // --- MOCK DATA ---
  const empDetails = {
    name: "Stephan Peralt",
    initials: "SP",
    role: "Senior Product Designer",
    email: "steperde124@example.com",
    phone: "+91 98765 43210",
    joined: "15 Jan 2024",
  };

  const leaveStats = {
    onTime: 1254,
    absent: 14,
    total: 16,
    taken: 10,
    workedDays: 240,
    lop: 2,
    wfh: 12,
    late: 5,
  };

  // --- HANDLERS ---
  const handleOpenFile = (fileName) => {
    triggerPopup(`Action: Accessing ${fileName}`);
  };

  const handleTaskAction = (id, newStatus) => {
    if (newStatus === "Completed") {
      setActiveTaskId(id);
      fileInputRef.current?.click();
    } else {
      setAllTasks(
        allTasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
      );
    }
  };

  const onTaskFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && activeTaskId) {
      setAllTasks(
        allTasks.map((t) =>
          t.id === activeTaskId ? { ...t, status: "Completed" } : t,
        ),
      );
      triggerPopup(`✅ File Attached: ${file.name}`);
      setActiveTaskId(null);
    }
  };

  const openSupportModal = (type) => {
    setSupportType(type);
    setSupportReason("");
    setShowSupportModal(true);
  };

  // --- STYLES ---
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  };

  const cardStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    minHeight: "280px",
    boxSizing: "border-box",
  };

  return (
    <div
      className="dashboard-container"
      style={{ width: "100%", boxSizing: "border-box", padding: "20px" }}
    >
      <style>
        {`
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
          }

          .header-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
          }

          .reason-select {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 15px;
            border: 1px solid #cbd5e1;
            font-family: inherit;
            appearance: none;
            background-color: white;
            cursor: pointer;
          }

          @media (max-width: 480px) {
            .dashboard-grid {
              grid-template-columns: 1fr;
            }
            .modal-content {
              width: 90% !important;
            }
            .pie-chart-container {
              flex-direction: column;
              align-items: flex-start !important;
              gap: 15px !important;
            }
          }
        `}
      </style>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onTaskFileSelect}
      />

      {/* Header */}
      <div className="header-flex">
        <div>
          <h1 className="main-title" style={{ margin: 0 }}>
            Employee Dashboard
          </h1>
          <p className="sub-title" style={{ margin: 0 }}>
            Overview & Daily Tasks
          </p>
        </div>
        <button className="btn-secondary">
          <Download size={18} /> Export
        </button>
      </div>

      {/* Notification */}
      {showNotification && (
        <div
          style={{
            background: "#e0f2fe",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "13px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertCircle size={18} color="#1d4ed8" />
            <span style={{ color: "#1d4ed8", fontWeight: 500 }}>
              Your Leave Request Approved!
            </span>
          </div>
          <X
            size={18}
            style={{ cursor: "pointer", color: "#1d4ed8" }}
            onClick={() => setShowNotification(false)}
          />
        </div>
      )}

      {/* GRID 1 */}
      <div className="dashboard-grid">
        {/* Profile Card */}
        <div
          style={{
            ...cardStyle,
            background: "linear-gradient(135deg, #4C1D95, #4C1D95)",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "15px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                flexShrink: 0,
                borderRadius: "12px",
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "bold",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {empDetails.initials}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: "18px", color: "#fff" }}>
                {empDetails.name}
              </h2>
              <p
                style={{
                  margin: "2px 0",
                  color: "#D4AF37",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {empDetails.role}
              </p>
              <div
                style={{
                  fontSize: "11px",
                  color: "#cbd5e1",
                  marginTop: "5px",
                  display: "grid",
                  gap: "3px",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Mail size={12} /> {empDetails.email}
                </span>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Phone size={12} /> {empDetails.phone}
                </span>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Calendar size={12} /> Joined: {empDetails.joined}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(69, 33, 176, 0.68)",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "11px",
                fontWeight: "bold",
                color: "#D4AF37",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              My Documents
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {["Aadhaar_Card.pdf", "PAN_Card.pdf", "Offer_Letter.pdf"].map(
                (doc, index) => (
                  <div
                    key={index}
                    onClick={() => handleOpenFile(doc)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                      cursor: "pointer",
                      padding: "4px 0",
                      borderBottom: "1px solid rgba(127, 31, 201, 0.74)",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FileText size={14} color="#cbd5e1" /> {doc}
                    </span>
                    <DownloadCloud size={14} color="#D4AF37" />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Attendance Card */}
        <div style={cardStyle}>
          <h3
            style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#1e293b" }}
          >
            Attendance
          </h3>
          <div
            style={{
              textAlign: "center",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
              }}
            >
              <Clock
                size={32}
                color={isCheckedIn ? "#10b981" : "#64748b"}
                style={{ margin: "0 auto 10px" }}
              />
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                Status:{" "}
                <b style={{ color: isCheckedIn ? "#10b981" : "#ef4444" }}>
                  {isCheckedIn ? "Checked In" : "Checked Out"}
                </b>
              </p>
            </div>
            <button
              onClick={() => setIsCheckedIn(!isCheckedIn)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: isCheckedIn ? "#ef4444" : "#0dd549",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
                transition: "0.3s",
              }}
            >
              {isCheckedIn ? "Check Out" : "Check In"}
            </button>
          </div>
        </div>

        {/* Attendance Overview Card */}
        <div style={cardStyle}>
          <h3
            style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#1e293b" }}
          >
            Attendance Overview
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <p
                style={{
                  color: "#10b981",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <CheckCircle size={14} /> {leaveStats.onTime} On Time
              </p>
              <p
                style={{
                  color: "#6366f1",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Briefcase size={14} /> {leaveStats.wfh} WFH
              </p>
              <p
                style={{
                  color: "#f59e0b",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Clock size={14} /> {leaveStats.late} Late Coming
              </p>
              <p
                style={{
                  color: "#ef4444",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <AlertCircle size={14} /> {leaveStats.absent} Absent
              </p>
            </div>
            <div
              style={{
                position: "relative",
                width: "90px",
                height: "90px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background:
                    "conic-gradient(#10b981 0% 70%, #6366f1 70% 85%, #f59e0b 85% 92%, #ef4444 92% 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "15px",
                  background: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#4C1D95",
                }}
              >
                Active
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowLeaveModal(true)}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#4C1D95",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Apply New Leave
          </button>
        </div>
      </div>

      {/* GRID 2 */}
      <div className="dashboard-grid">
        <div style={cardStyle}>
          <h3
            style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#4C1D95" }}
          >
            Leave Distribution
          </h3>
          <div
            className="pie-chart-container"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              flex: 1,
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                flexShrink: 0,
                borderRadius: "50%",
                background:
                  "conic-gradient(#3b82f6 0% 40%, #10b981 40% 70%, #f97316 70% 100%)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            ></div>
            <div
              style={{
                fontSize: "13px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#4C1D95",
                    borderRadius: "2px",
                  }}
                ></div>
                <span
                  style={{ color: "#475569", fontWeight: "500", width: "60px" }}
                >
                  Casual:
                </span>
                <span style={{ fontWeight: "bold", color: "#4C1D95" }}>4</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#10b981",
                    borderRadius: "2px",
                  }}
                ></div>
                <span
                  style={{ color: "#475569", fontWeight: "500", width: "60px" }}
                >
                  Sick:
                </span>
                <span style={{ fontWeight: "bold", color: "#4C1D95" }}>3</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#f97316",
                    borderRadius: "2px",
                  }}
                ></div>
                <span
                  style={{ color: "#475569", fontWeight: "500", width: "60px" }}
                >
                  Earned:
                </span>
                <span style={{ fontWeight: "bold", color: "#4C1D95" }}>3</span>
              </div>
              <div
                style={{
                  marginTop: "5px",
                  paddingTop: "5px",
                  borderTop: "1px solid #e2e8f0",
                  fontWeight: "bold",
                  color: "#4C1D95",
                }}
              >
                Total Taken: 10
              </div>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>
            Task Manager
          </h3>
          <div
            style={{
              overflowY: "auto",
              flex: 1,
              maxHeight: "180px",
              paddingRight: "5px",
            }}
          >
            {allTasks
              .filter((t) => t.empName === "Arun")
              .map((t) => (
                <div
                  key={t.id}
                  style={{
                    padding: "10px",
                    background: "#f8fafc",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    border: "1px solid #e2e8f0",
                    borderLeft: "4px solid #4C1D95",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "13px" }}>
                    {t.title}
                  </p>
                  <button
                    onClick={() => handleTaskAction(t.id, "Completed")}
                    style={{
                      marginTop: "6px",
                      padding: "6px 12px",
                      fontSize: "11px",
                      background:
                        t.status === "Completed" ? "#10b981" : "#4C1D95",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {t.status === "Completed" ? "Completed ✓" : "Mark Done"}
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
            Announcements
          </h3>
          <div style={{ fontSize: "13px", flex: 1 }}>
            <div
              style={{
                background: "#fff7ed",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
                borderLeft: "4px solid #f97316",
              }}
            >
              <b>Town Hall:</b> Q1 growth update on Jan 30.
            </div>
            <div
              style={{
                background: "#f0fdf4",
                padding: "12px",
                borderRadius: "8px",
                borderLeft: "4px solid #22c55e",
              }}
            >
              <b>System:</b> Maintenance tonight at 11 PM.
            </div>
          </div>
        </div>

        {/* Help & Support Card - Removed Substitution Request Button */}
        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
            Help & Support
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => openSupportModal("Tech Ticket")}
              style={{
                padding: "12px",
                background: "#4C1D95",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Raise Tech Ticket
            </button>
          </div>
        </div>
      </div>

      {/* --- MODALS SECTION --- */}

      {/* Custom Message Modal */}
      {msgModal.isOpen && (
        <div style={modalOverlayStyle}>
          <div
            className="modal-content"
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "400px",
              textAlign: "center",
              boxShadow: "0 20px 25px rgba(0,0,0,0.1)",
            }}
          >
            <Info size={40} color="#4C1D95" style={{ marginBottom: "15px" }} />
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                color: "#4C1D95",
              }}
            >
              System Message
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#475569",
                marginBottom: "20px",
              }}
            >
              {msgModal.text}
            </p>
            <button
              onClick={() => setMsgModal({ isOpen: false, text: "" })}
              style={{
                width: "100%",
                padding: "12px",
                background: "#4C1D95",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Support Message Modal */}
      {showSupportModal && (
        <div style={modalOverlayStyle}>
          <div
            className="modal-content"
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "450px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
                color: "#4C1D95",
              }}
            >
              <MessageSquare size={24} />
              <h2 style={{ margin: 0, fontSize: "20px" }}>{supportType}</h2>
            </div>
            {supportType === "Tech Ticket" && (
              <div style={{ position: "relative" }}>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    marginBottom: "5px",
                  }}
                >
                  Select the issue reason:
                </p>
                <select
                  className="reason-select"
                  value={supportReason}
                  onChange={(e) => setSupportReason(e.target.value)}
                >
                  <option value="" disabled>
                    -- Select a Reason --
                  </option>
                  <option value="Hardware Issue">
                    Hardware Issue (Laptop/Mouse/etc)
                  </option>
                  <option value="Software Access">
                    Software / Access Issue
                  </option>
                  <option value="Network Connectivity">
                    Network / Internet Problem
                  </option>
                  <option value="Others">Others</option>
                </select>
                <ChevronDown
                  size={18}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "40px",
                    pointerEvents: "none",
                    color: "#94a3b8",
                  }}
                />
              </div>
            )}
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "10px",
              }}
            >
              Details regarding your request:
            </p>
            <textarea
              placeholder="Type your details here..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px",
                height: "120px",
                border: "1px solid #cbd5e1",
                resize: "none",
                fontFamily: "inherit",
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowSupportModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f1f5f9",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: "none",
                  color: "#475569",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSupportModal(false);
                  triggerPopup("Your request has been submitted successfully!");
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#4C1D95",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Modal */}
      {showLeaveModal && (
        <div style={modalOverlayStyle}>
          <div
            className="modal-content"
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "450px",
            }}
          >
            <h2 style={{ color: "#4C1D95", marginTop: 0 }}>Apply New Leave</h2>
            <textarea
              placeholder="Specify reason..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px",
                height: "100px",
                border: "1px solid #ddd",
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowLeaveModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f5f5f5",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: "1px solid #ddd",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLeaveModal(false);
                  triggerPopup("Leave request sent for approval.");
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#4C1D95",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
