import React, { useState } from "react";
import {
  Users,
  CheckSquare,
  FileCheck,
  Clock,
  X,
  Bell,
  Cpu,
  UserX,
  FolderPlus,
  ClipboardList,
  Info,
} from "lucide-react";

const TeamLeadDashboard = ({ allTasks = [], setAllTasks, addNewTask }) => {
  const [selectedEmp, setSelectedEmp] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  // Modal States
  const [showHRModal, setShowHRModal] = useState(false);
  const [showITModal, setShowITModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);

  const [popupMsg, setPopupMsg] = useState("");
  const [itQueryType, setItQueryType] = useState("");
  const [reportEmpName, setReportEmpName] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const [teamAttendance, setTeamAttendance] = useState([
    { name: "Arun", status: "In Office" },
    { name: "Priya", status: "WFH" },
  ]);

  const [projectName, setProjectName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  const [projects, setProjects] = useState([
    { name: "HR Management Web", working: 4, pending: 2, done: 8 },
  ]);

  const tlProfile = {
    name: "TL Manager",
    role: "Team Lead - Engineering",
    email: "tl.manager@company.com",
  };

  const triggerPopup = (msg) => {
    setPopupMsg(msg);
    setShowMsgModal(true);
  };

  const handleAssignToTeam = () => {
    if (!selectedEmp || !taskDesc)
      return triggerPopup("Please select an employee and enter description.");
    addNewTask(taskDesc, selectedEmp);
    setTaskDesc("");
    setSelectedEmp("");
    triggerPopup(`Task assigned to ${selectedEmp}`);
  };

  const handleAddMemberToGroup = (name) => {
    if (!name) return;
    if (groupMembers.length >= 3)
      return triggerPopup("Max 3 members per group.");
    if (!groupMembers.includes(name)) setGroupMembers([...groupMembers, name]);
  };

  const handleRemoveMember = (nameToRemove) =>
    setGroupMembers(groupMembers.filter((m) => m !== nameToRemove));

  const handleCreateGroup = () => {
    if (!projectName || groupMembers.length === 0)
      return triggerPopup("Enter project name and members.");

    const newProject = {
      name: projectName,
      working: 0,
      pending: groupMembers.length,
      done: 0,
    };

    setProjects([newProject, ...projects]);
    setProjectName("");
    setGroupMembers([]);
    triggerPopup(
      `Project "${projectName}" assigned to ${groupMembers.join(", ")}.`,
    );
  };

  const handleVerify = (id) => {
    setAllTasks(
      allTasks.map((t) => (t.id === id ? { ...t, status: "Verified" } : t)),
    );
    triggerPopup("Task Verified.");
  };

  const handleAttendanceChange = (name, newStatus) => {
    setTeamAttendance(
      teamAttendance.map((member) =>
        member.name === name ? { ...member, status: newStatus } : member,
      ),
    );
  };

  const openITModal = (type) => {
    setItQueryType(type);
    setShowITModal(true);
  };

  const openReportModal = (name) => {
    setReportEmpName(name);
    setShowReportModal(true);
  };

  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    minHeight: "280px",
    boxSizing: "border-box",
    border: "1px solid #e2e8f0",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
  };

  return (
    <div
      className="team-lead-portal-wrapper"
      style={{
        padding: "20px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          backgroundColor: "#4C1D95",
          padding: "15px 30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ fontSize: "24px", margin: 0, color: "#fff" }}>
          Team Lead Portal
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#cbd5e1" }}>
            Welcome, <b style={{ color: "#fcfbf8" }}>{tlProfile.name}</b>
          </span>
          <div
            style={{
              backgroundColor: "#f8f7f4",
              color: "#4C1D95",
              padding: "8px",
              borderRadius: "50%",
            }}
          >
            <Users size={24} />
          </div>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
          marginBottom: "25px",
        }}
      >
        {/* TL Profile - Theme Adjusted */}
        <div
          style={{
            ...cardStyle,
            background: "linear-gradient(135deg, #4C1D95, #4C1D95)",
            color: "white",
            border: "none",
          }}
        >
          <h3
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: "10px",
              marginTop: 0,
              color: "#f3f0e5",
            }}
          >
            TL Profile
          </h3>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p>
              <b style={{ color: "#e4e1d7" }}>Name:</b> {tlProfile.name}
            </p>
            <p>
              <b style={{ color: "#f4f3ef" }}>Role:</b> {tlProfile.role}
            </p>
            <p>
              <b style={{ color: "#fcfbf5" }}>Email:</b> {tlProfile.email}
            </p>
          </div>
        </div>

        {/* Attendance */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#4C1D95" }}>
            <Clock color="#D4AF37" size={20} /> Attendance & Verification
          </h3>
          <div
            style={{
              textAlign: "center",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <p style={{ fontSize: "14px" }}>
              Status:{" "}
              <b style={{ color: isCheckedIn ? "#10b981" : "#ef4444" }}>
                {isCheckedIn ? "Active" : "Offline"}
              </b>
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setIsCheckedIn(true)}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: "#069e06",
                  color: "#e5e4e1",
                  border: "1px solid #f8f6f2",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                In
              </button>
              <button
                onClick={() => setIsCheckedIn(false)}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: "#cd3112",
                  color: "#f5f3ee",
                  border: "1px solid #f4f2ed",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Out
              </button>
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: "10px" }}>
              <button
                onClick={() => setShowVerifyModal(true)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#4C1D95",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Verify Team Attendance
              </button>
            </div>
          </div>
        </div>

        {/* Project Task Status */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#4C1D95" }}>
            <ClipboardList color="#D4AF37" size={20} /> Project Task Status
          </h3>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              overflowY: "auto",
              maxHeight: "200px",
            }}
          >
            {projects.map((proj, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f8fafc",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    margin: "0 0 5px 0",
                    color: "#4C1D95",
                  }}
                >
                  {proj.name}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                  }}
                >
                  <span style={{ color: "#2563eb", fontWeight: "600" }}>
                    Working: {proj.working}
                  </span>
                  <span style={{ color: "#ea580c", fontWeight: "600" }}>
                    Pending: {proj.pending}
                  </span>
                  <span style={{ color: "#16a34a", fontWeight: "600" }}>
                    Done: {proj.done}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Approvals */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#4C1D95" }}>
            <CheckSquare color="#D4AF37" size={20} /> Task Approvals
          </h3>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {allTasks
              .filter((t) => t.empName === "TL Manager" || t.type === "Manager")
              .map((t) => (
                <div
                  key={t.id}
                  style={{
                    padding: "10px",
                    background: t.status === "Verified" ? "#f0fdf4" : "#f8fafc",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    border: "1px solid #edf2f7",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#4C1D95" }}>
                    <b>{t.empName}</b>: {t.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        color: t.status === "Verified" ? "#16a34a" : "#ea580c",
                        fontWeight: "700",
                      }}
                    >
                      {t.status.toUpperCase()}
                    </span>
                    {t.status !== "Verified" && (
                      <button
                        onClick={() => handleVerify(t.id)}
                        style={{
                          fontSize: "11px",
                          color: "#eceae2",
                          fontWeight: "700",
                          cursor: "pointer",
                          border: "none",
                          background: "none",
                        }}
                      >
                        Verify Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Project Grouping */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#4C1D95" }}>
            <FolderPlus color="#D4AF37" size={20} /> Project Grouping
          </h3>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          />
          <select
            onChange={(e) => handleAddMemberToGroup(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          >
            <option value="">Add Members (Max 3)</option>
            <option value="Arun">Arun</option>
            <option value="Priya">Priya</option>
            <option value="John">John</option>
          </select>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              margin: "12px 0",
              minHeight: "32px",
            }}
          >
            {groupMembers.map((name) => (
              <div
                key={name}
                style={{
                  background: "#f1f5f9",
                  border: "1px solid #cbd5e1",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "#4C1D95",
                }}
              >
                {name}{" "}
                <X
                  size={12}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveMember(name)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleCreateGroup}
            style={{
              padding: "12px",
              background: "#4C1D95",
              color: "#efede5",
              border: "1px solid #f6f4f0",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "auto",
            }}
          >
            Assign & Create Group
          </button>
        </div>

        {/* Monitoring */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#4C1D95" }}>
            <UserX color="#D4AF37" size={20} /> Monitoring
          </h3>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {["Arun", "Priya", "John"].map((name) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  background: "#f8fafc",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  border: "1px solid #edf2f7",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#4C1D95",
                  }}
                >
                  {name}
                </span>
                <button
                  onClick={() => openReportModal(name)}
                  style={{
                    padding: "5px 10px",
                    fontSize: "10px",
                    background: "#fee2e2",
                    color: "#ef4444",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  REPORT
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Assign Task */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#4C1D95" }}>
            <CheckSquare color="#D4AF37" size={20} /> Assign Task
          </h3>
          <select
            value={selectedEmp}
            onChange={(e) => setSelectedEmp(e.target.value)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          >
            <option value="">Select Employee</option>
            <option value="Arun">Arun</option>
            <option value="Priya">Priya</option>
          </select>
          <input
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            placeholder="Description"
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          />
          <button
            onClick={handleAssignToTeam}
            style={{
              padding: "12px",
              background: "#4C1D95",
              color: "#eeebe4",
              border: "1px solid #f1f0ec",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "auto",
            }}
          >
            Assign Task
          </button>
        </div>

        {/* Announcements */}
        <div style={{ ...cardStyle, background: "#f8fafc" }}>
          <h3 style={{ marginTop: 0, color: "#4C1D95" }}>
            <Bell color="#D4AF37" size={20} /> Announcements
          </h3>
          <div
            style={{
              fontSize: "13px",
              color: "#4C1D95",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "8px",
                borderLeft: "4px solid #D4AF37",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              📢 Server migration this Sunday.
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "8px",
                borderLeft: "4px solid #D4AF37",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              📢 Office closed Friday for holiday.
            </div>
          </div>
        </div>

        {/* IT Technical - MOVED TO LAST */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#4C1D95" }}>
            <Cpu color="#D4AF37" size={20} /> IT Technical
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => openITModal("System Diagnostics")}
              style={{
                padding: "12px",
                background: "#f8fafc",
                color: "#4C1D95",
                border: "1px solid #bdc2c8",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Diagnostics
            </button>
            <button
              onClick={() => openITModal("Software Requests")}
              style={{
                padding: "12px",
                background: "#f8fafc",
                color: "#4C1D95",
                border: "1px solid #bdc2c8",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Software
            </button>
            <button
              onClick={() => setShowHRModal(true)}
              style={{
                padding: "12px",
                background: "#4C1D95",
                color: "#fcfcfc",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              Contact Admin
            </button>
          </div>
        </div>
      </div>

      {/* --- MODALS (Updated with theme) --- */}
      {showMsgModal && (
        <div style={modalOverlayStyle}>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              width: "350px",
              textAlign: "center",
              border: "2px solid #D4AF37",
            }}
          >
            <Info color="#D4AF37" size={40} style={{ marginBottom: "15px" }} />
            <p style={{ fontWeight: "bold", color: "#4C1D95" }}>{popupMsg}</p>
            <button
              onClick={() => setShowMsgModal(false)}
              style={{
                marginTop: "20px",
                padding: "10px 30px",
                background: "#4C1D95",
                color: "#D4AF37",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showVerifyModal && (
        <div style={modalOverlayStyle}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "420px",
              border: "1px solid #D4AF37",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "18px",
                color: "#4C1D95",
              }}
            >
              Adjust Team Attendance
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {teamAttendance.map((member) => (
                <div
                  key={member.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#f8fafc",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <span style={{ fontWeight: "600", color: "#4C1D95" }}>
                    {member.name}
                  </span>
                  <select
                    value={member.status}
                    onChange={(e) =>
                      handleAttendanceChange(member.name, e.target.value)
                    }
                    style={{
                      padding: "5px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                      outline: "none",
                    }}
                  >
                    <option value="In Office">In Office</option>
                    <option value="WFH">WFH</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowVerifyModal(false);
                triggerPopup("Attendance Confirmed.");
              }}
              style={{
                marginTop: "25px",
                width: "100%",
                padding: "12px",
                background: "#4C1D95",
                color: "#D4AF37",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => setShowVerifyModal(false)}
              style={{
                marginTop: "8px",
                width: "100%",
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showReportModal && (
        <div style={modalOverlayStyle}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "400px",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                marginBottom: "15px",
                color: "#4C1D95",
              }}
            >
              Report {reportEmpName}
            </h2>
            <textarea
              placeholder="Provide reason..."
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  triggerPopup(`Report for ${reportEmpName} sent.`);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "700",
                }}
              >
                Send
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f5f5f5",
                  color: "#64748b",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {(showHRModal || showITModal) && (
        <div style={modalOverlayStyle}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "400px",
              border: "1px solid #D4AF37",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h2 style={{ fontSize: "18px", margin: 0, color: "#4C1D95" }}>
                {showHRModal ? "Contact Admin" : itQueryType}
              </h2>
              <X
                size={20}
                style={{ cursor: "pointer", color: "#64748b" }}
                onClick={() => {
                  setShowHRModal(false);
                  setShowITModal(false);
                }}
              />
            </div>
            <textarea
              placeholder="Describe query..."
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => {
                  setShowHRModal(false);
                  setShowITModal(false);
                  triggerPopup("Request submitted.");
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#4C1D95",
                  color: "#D4AF37",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "700",
                }}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowHRModal(false);
                  setShowITModal(false);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f1f5f9",
                  color: "#64748b",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamLeadDashboard;
