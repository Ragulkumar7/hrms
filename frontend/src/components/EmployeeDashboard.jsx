import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
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
} from "lucide-react";

const EmployeeDashboard = ({ allTasks, setAllTasks }) => {
  const [showNotification, setShowNotification] = useState(true);
  const fileInputRef = useRef(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Modal States
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showTechModal, setShowTechModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);

  const empDetails = {
    name: "Stephan Peralt",
    initials: "SP",
    role: "Senior Product Designer",
    subRole: "UI/UX Design",
    phone: "+1 324 3453 545",
    email: "steperde124@example.com",
    reportTo: "Doglas Martini",
    joined: "15 Jan 2024",
  };

  const leaveStats = {
    onTime: 1254,
    late: 32,
    wfh: 658,
    absent: 14,
    sick: 68,
    total: 16,
    taken: 10,
    request: 0,
    workedDays: 240,
    lop: 2,
  };

  const attendanceData = [
    {
      employee: "John Doe",
      date: "Oct 26, 2023",
      clockIn: "09:02 AM",
      status: "Present",
    },
    {
      employee: "Sarah Connor",
      date: "Oct 26, 2023",
      clockIn: "09:45 AM",
      status: "Late",
    },
    {
      employee: "Michael Scott",
      date: "Oct 26, 2023",
      clockIn: "--",
      status: "Absent",
    },
  ];

  const salaryData = {
    basic: 50000,
    allowance: 15000,
    deduction: 5000,
    net: 60000,
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
          t.id === activeTaskId
            ? { ...t, status: "Completed", file: file.name }
            : t,
        ),
      );
      alert(`✅ File Attached: ${file.name}`);
      setActiveTaskId(null);
    }
  };

  const addSelfAssignedTask = () => {
    if (newTaskTitle && newTaskTime) {
      const newTask = {
        id: allTasks.length + 1,
        title: newTaskTitle,
        status: "Pending",
        time: newTaskTime,
        empName: "Arun",
      };
      setAllTasks([...allTasks, newTask]);
      setNewTaskTitle("");
      setNewTaskTime("");
    }
  };

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
    minHeight: "250px",
    boxSizing: "border-box",
  };

  return (
    <div
      className="dashboard-layout"
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        width: "100%",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          flex: 1,
          padding: "20px",
          width: "calc(100% - 260px)",
          boxSizing: "border-box",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onTaskFileSelect}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 700,
                color: "#1e293b",
              }}
            >
              Employee Dashboard
            </h1>
            <p style={{ marginTop: "4px", color: "#64748b", fontSize: "14px" }}>
              Dashboard / Employee Dashboard
            </p>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "white",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
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
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "13px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertCircle size={18} color="#1d4ed8" />
              <span style={{ color: "#1d4ed8", fontWeight: 500 }}>
                Your Leave Request on "24th April 2024" has been Approved!!!
              </span>
            </div>
            <X
              size={18}
              style={{ cursor: "pointer", color: "#1d4ed8" }}
              onClick={() => setShowNotification(false)}
            />
          </div>
        )}

        {/* LINE 1 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg, #1e293b, #334155)",
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: "50%",
                  background: "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {empDetails.initials}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "20px" }}>
                  {empDetails.name}
                </h2>
                <p style={{ margin: 0, color: "#cbd5e1", fontSize: "12px" }}>
                  {empDetails.role}
                </p>
              </div>
            </div>
            <div style={{ fontSize: "13px", lineHeight: "1.6" }}>
              <p style={{ margin: "4px 0" }}>
                <strong>Email:</strong> {empDetails.email}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Joined:</strong> {empDetails.joined}
              </p>
            </div>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "18px",
                color: "#1e293b",
              }}
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
              <p style={{ fontSize: "15px", color: "#64748b" }}>
                Current Status:{" "}
                <b style={{ color: isCheckedIn ? "#10b981" : "#ef4444" }}>
                  {isCheckedIn ? "Checked In" : "Checked Out"}
                </b>
              </p>
              <button
                onClick={() => setIsCheckedIn(!isCheckedIn)}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: isCheckedIn ? "#ef4444" : "#10b981",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {isCheckedIn ? "Check Out" : "Check In"}
              </button>
            </div>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "18px",
                color: "#1e293b",
              }}
            >
              Leave Details
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
              }}
            >
              <div style={{ fontSize: "13px" }}>
                <p style={{ color: "#10b981", margin: "6px 0" }}>
                  ● {leaveStats.onTime} on time
                </p>
                <p style={{ color: "#ef4444", margin: "6px 0" }}>
                  ● {leaveStats.absent} Absent
                </p>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background:
                      "conic-gradient(#10b981 0% 60%, #ef4444 60% 100%)",
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
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  60%
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowLeaveModal(true)}
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "#f97316",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Apply New Leave
            </button>
          </div>
        </div>

        {/* LINE 2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "18px",
                color: "#1e293b",
              }}
            >
              Leave Status
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                fontSize: "14px",
                flex: 1,
              }}
            >
              <p>
                <strong>Total:</strong> {leaveStats.total}
              </p>
              <p>
                <strong>Taken:</strong> {leaveStats.taken}
              </p>
              <p>
                <strong>Worked:</strong> {leaveStats.workedDays}
              </p>
              <p>
                <strong>LOP:</strong> {leaveStats.lop}
              </p>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>
              Add Self-Assigned Task
            </h3>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task Title"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
              }}
            />
            <input
              type="number"
              value={newTaskTime}
              onChange={(e) => setNewTaskTime(e.target.value)}
              placeholder="Minutes"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
              }}
            />
            <button
              onClick={addSelfAssignedTask}
              style={{
                width: "100%",
                padding: "12px",
                background: "#FF9B44",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Save Task
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>
              Task Manager
            </h3>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {allTasks
                ?.filter((t) => t.empName === "Arun")
                .map((t) => (
                  <div
                    key={t.id}
                    style={{
                      padding: "10px",
                      background: "#f9fafb",
                      borderRadius: "8px",
                      marginBottom: "10px",
                      borderLeft: "4px solid #6366f1",
                    }}
                  >
                    <p
                      style={{ margin: 0, fontWeight: "600", fontSize: "13px" }}
                    >
                      {t.title}
                    </p>
                    <button
                      onClick={() => handleTaskAction(t.id, "Completed")}
                      style={{
                        marginTop: "6px",
                        padding: "6px 12px",
                        fontSize: "11px",
                        background:
                          t.status === "Completed" ? "#22c55e" : "#6366f1",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {t.status === "Completed" ? "Completed ✓" : "Complete"}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* LINE 3 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
              Account & Salary
            </h3>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p style={{ fontSize: "20px" }}>
                <strong>Net Salary:</strong> ${salaryData.net}
              </p>
            </div>
            <button
              onClick={() => setShowPayslipModal(true)}
              style={{
                padding: "12px",
                background: "#FF9B44",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              View Payslip
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
              Announcements
            </h3>
            <div style={{ fontSize: "13px", flex: 1 }}>
              <div
                style={{
                  background: "#fffbeb",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  borderLeft: "4px solid #fbbf24",
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
                <b>System:</b> Server maintenance tonight at 11 PM.
              </div>
            </div>
          </div>

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
                onClick={() => setShowTechModal(true)}
                style={{
                  padding: "12px",
                  background: "#FF9B44",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Raise Tech Ticket
              </button>
              <button
                onClick={() => setShowSubModal(true)}
                style={{
                  padding: "12px",
                  background: "#FF9B44",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Substitution Request
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Maintenance Table */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            width: "100%",
          }}
        >
          <h3 style={{ margin: "0 0 15px 0", fontSize: "20px" }}>
            Attendance Maintenance
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                <th
                  style={{ padding: "15px", borderBottom: "2px solid #e5e7eb" }}
                >
                  EMPLOYEE
                </th>
                <th
                  style={{ padding: "15px", borderBottom: "2px solid #e5e7eb" }}
                >
                  DATE
                </th>
                <th
                  style={{ padding: "15px", borderBottom: "2px solid #e5e7eb" }}
                >
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((entry, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "15px" }}>{entry.employee}</td>
                  <td style={{ padding: "15px" }}>{entry.date}</td>
                  <td style={{ padding: "15px" }}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background:
                          entry.status === "Present" ? "#d1fae5" : "#fee2e2",
                        color:
                          entry.status === "Present" ? "#059669" : "#ef4444",
                        fontWeight: 600,
                      }}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {showLeaveModal && (
        <div style={modalOverlayStyle}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "450px",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Apply New Leave</h2>
            <textarea
              placeholder="Reason..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px",
                height: "100px",
                border: "1px solid #ddd",
              }}
            />
            <input
              type="number"
              placeholder="Days"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
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
                onClick={() => setShowLeaveModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f97316",
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

      {showPayslipModal && (
        <div style={modalOverlayStyle}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "450px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid #eee",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>Monthly Payslip</h2>
              <X
                style={{ cursor: "pointer" }}
                onClick={() => setShowPayslipModal(false)}
              />
            </div>
            <div style={{ lineHeight: "2" }}>
              <p>
                Basic Salary: <b>${salaryData.basic}</b>
              </p>
              <p>
                Allowances: <b>${salaryData.allowance}</b>
              </p>
              <p>
                Deductions:{" "}
                <b style={{ color: "red" }}>- ${salaryData.deduction}</b>
              </p>
              <div
                style={{
                  background: "#1e293b",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Net: ${salaryData.net}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TECH TICKET MODAL */}
      {showTechModal && (
        <div style={modalOverlayStyle}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "450px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid #eee",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>Raise Tech Ticket</h2>
              <X
                style={{ cursor: "pointer" }}
                onClick={() => setShowTechModal(false)}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  marginBottom: "5px",
                }}
              >
                Query Subject:
              </label>
              <input
                type="text"
                placeholder="E.g. VPN not working, Hardware issue"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  marginBottom: "5px",
                }}
              >
                Describe your query for the IT Team:
              </label>
              <textarea
                placeholder="Describe your issue in detail..."
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  height: "100px",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowTechModal(false)}
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
                  alert("Ticket sent to IT Team!");
                  setShowTechModal(false);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUBSTITUTION REQUEST MODAL */}
      {showSubModal && (
        <div style={modalOverlayStyle}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "450px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid #eee",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>Substitution Request</h2>
              <X
                style={{ cursor: "pointer" }}
                onClick={() => setShowSubModal(false)}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  marginBottom: "5px",
                }}
              >
                Teammate to request coverage from:
              </label>
              <input
                type="text"
                placeholder="Enter teammate name"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  marginBottom: "5px",
                }}
              >
                Reason for substitution:
              </label>
              <textarea
                placeholder="E.g. Medical appointment, family emergency"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  height: "100px",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowSubModal(false)}
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
                  alert("Substitution request sent!");
                  setShowSubModal(false);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#8b5cf6",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;