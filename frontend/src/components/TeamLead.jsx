import React, { useState } from "react";
import {
  Users,
  CheckSquare,
  FileCheck,
  Clock,
  PlusCircle,
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
  const [selfTaskName, setSelfTaskName] = useState("");
  const [selfDeadline, setSelfDeadline] = useState("");
  const [selfTaskDate, setSelfTaskDate] = useState("");

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

  const handleTLSelfAssign = () => {
    if (!selfTaskName || !selfDeadline || !selfTaskDate)
      return triggerPopup("Please fill all details including date!");
    const taskTitle = `[SELF] ${selfTaskName} (Due: ${selfTaskDate})`;
    addNewTask(taskTitle, "TL Manager");
    setSelfTaskName("");
    setSelfDeadline("");
    setSelfTaskDate("");
    triggerPopup("Personal task added to approvals.");
  };

  const handleAddMemberToGroup = (name) => {
    if (!name) return;
    if (groupMembers.length >= 3) return triggerPopup("Max 3 members per group.");
    if (!groupMembers.includes(name)) setGroupMembers([...groupMembers, name]);
  };

  const handleRemoveMember = (nameToRemove) =>
    setGroupMembers(groupMembers.filter((m) => m !== nameToRemove));

  const handleCreateGroup = () => {
    if (!projectName || groupMembers.length === 0)
      return triggerPopup("Enter project name and members.");
    setProjectName("");
    setGroupMembers([]);
    triggerPopup(`Project "${projectName}" grouped successfully.`);
  };

  const handleVerify = (id) => {
    setAllTasks(
      allTasks.map((t) => (t.id === id ? { ...t, status: "Verified" } : t))
    );
    triggerPopup("Task Verified.");
  };

  const handleAttendanceChange = (name, newStatus) => {
    setTeamAttendance(
      teamAttendance.map((member) =>
        member.name === name ? { ...member, status: newStatus } : member
      )
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
    <div className="team-lead-portal-wrapper" style={{ padding: "20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          backgroundColor: "white",
          padding: "15px 30px",
          borderRadius: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ fontSize: "24px", margin: 0, color: "#1e293b" }}>Team Lead Portal</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#64748b" }}>Welcome, <b>{tlProfile.name}</b></span>
          <div style={{ backgroundColor: "#f97316", color: "white", padding: "8px", borderRadius: "50%" }}>
            <Users size={24} />
          </div>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px", marginBottom: "25px" }}>
        {/* TL Profile */}
        <div style={{ ...cardStyle, background: "#f97316", color: "white" }}>
          <h3 style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "10px" }}>TL Profile</h3>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
            <p><b>Name:</b> {tlProfile.name}</p>
            <p><b>Role:</b> {tlProfile.role}</p>
            <p><b>Email:</b> {tlProfile.email}</p>
          </div>
        </div>

        {/* Attendance */}
        <div style={cardStyle}>
          <h3><Clock color="#f97316" size={20} /> Attendance & Verification</h3>
          <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
            <p style={{ fontSize: "14px" }}>Status: <b style={{ color: isCheckedIn ? "#10b981" : "#ef4444" }}>{isCheckedIn ? "Active" : "Offline"}</b></p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setIsCheckedIn(true)} style={{ flex: 1, padding: "8px", background: "#f97316", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>In</button>
              <button onClick={() => setIsCheckedIn(false)} style={{ flex: 1, padding: "8px", background: "#f97316", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Out</button>
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: "10px" }}>
              <button onClick={() => setShowVerifyModal(true)} style={{ width: "100%", padding: "8px", background: "#334155", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>Verify Team Attendance</button>
            </div>
          </div>
        </div>

        {/* Project Task Status */}
        <div style={cardStyle}>
          <h3><ClipboardList color="#f97316" size={20} /> Project Task Status</h3>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
            <div style={{ background: "#f8fafc", padding: "8px", borderRadius: "8px", border: "1px solid #eee" }}>
              <p style={{ fontSize: "12px", fontWeight: "bold", margin: "0 0 5px 0" }}>HR Management Web</p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                <span style={{ color: "#2563eb" }}>Working: 4</span>
                <span style={{ color: "#ea580c" }}>Pending: 2</span>
                <span style={{ color: "#16a34a" }}>Done: 8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Approvals */}
        <div style={cardStyle}>
          <h3><CheckSquare color="#f97316" size={20} /> Task Approvals</h3>
          <div style={{ overflowY: "auto", maxHeight: "180px" }}>
            {allTasks.filter(t => t.empName === "TL Manager" || t.type === "Manager").map(t => (
              <div key={t.id} style={{ padding: "10px", background: t.status === "Verified" ? "#f0fdf4" : "#f8fafc", marginBottom: "10px", borderRadius: "8px", border: "1px solid #edf2f7" }}>
                <div style={{ fontSize: "12px", color: "#1e293b" }}><b>{t.empName}</b>: {t.title}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
                  <span style={{ fontSize: "10px", color: t.status === "Verified" ? "#16a34a" : "#ea580c", fontWeight: "700" }}>{t.status.toUpperCase()}</span>
                  {t.status !== "Verified" && (
                    <button onClick={() => handleVerify(t.id)} style={{ fontSize: "11px", color: "#f97316", fontWeight: "600", cursor: "pointer", border: "none", background: "none" }}>Verify Now</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IT Technical */}
        <div style={cardStyle}>
          <h3><Cpu color="#f97316" size={20} /> IT Technical</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
            <button onClick={() => openITModal("System Diagnostics")} style={{ padding: "12px", background: "#fff7ed", color: "#c2410c", border: "1px solid #fdba74", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>Diagnostics</button>
            <button onClick={() => openITModal("Software Requests")} style={{ padding: "12px", background: "#fff7ed", color: "#c2410c", border: "1px solid #fdba74", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>Software</button>
            <button onClick={() => setShowHRModal(true)} style={{ padding: "12px", background: "#334155", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>Contact Admin</button>
          </div>
        </div>

        {/* Announcements */}
        <div style={{ ...cardStyle, background: "#fffaf0" }}>
          <h3><Bell color="#f97316" size={20} /> Announcements</h3>
          <div style={{ fontSize: "12px", color: "#7c2d12" }}>
            📢 Server migration this Sunday. <br />
            📢 Office closed Friday for holiday.
          </div>
        </div>

        {/* Project Grouping */}
        <div style={cardStyle}>
          <h3><FolderPlus color="#f97316" size={20} /> Project Grouping</h3>
          <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" style={{ padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
          <select onChange={(e) => handleAddMemberToGroup(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
            <option value="">Add Members (Max 3)</option>
            <option value="Arun">Arun</option>
            <option value="Priya">Priya</option>
            <option value="John">John</option>
          </select>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "12px 0", minHeight: "32px" }}>
            {groupMembers.map(name => (
              <div key={name} style={{ background: "#fff7ed", border: "1px solid #fdba74", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px", color: "#c2410c" }}>
                {name} <X size={12} style={{ cursor: "pointer" }} onClick={() => handleRemoveMember(name)} />
              </div>
            ))}
          </div>
          <button onClick={handleCreateGroup} style={{ padding: "12px", background: "#f97316", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginTop: "auto" }}>Create Group</button>
        </div>

        {/* Monitoring */}
        <div style={cardStyle}>
          <h3><UserX color="#f97316" size={20} /> Monitoring</h3>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {["Arun", "Priya", "John"].map(name => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "#f8fafc", marginBottom: "8px", borderRadius: "8px", border: "1px solid #edf2f7" }}>
                <span style={{ fontSize: "13px", fontWeight: "500" }}>{name}</span>
                <button onClick={() => openReportModal(name)} style={{ padding: "5px 10px", fontSize: "10px", background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "700" }}>REPORT</button>
              </div>
            ))}
          </div>
        </div>

        {/* Assign Task */}
        <div style={cardStyle}>
          <h3><CheckSquare color="#f97316" size={20} /> Assign Task</h3>
          <select value={selectedEmp} onChange={(e) => setSelectedEmp(e.target.value)} style={{ padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
            <option value="">Select Employee</option>
            <option value="Arun">Arun</option>
            <option value="Priya">Priya</option>
          </select>
          <input value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} placeholder="Description" style={{ padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
          <button onClick={handleAssignToTeam} style={{ padding: "12px", background: "#f97316", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Assign Task</button>
        </div>

        {/* Personal Task */}
        <div style={cardStyle}>
          <h3><PlusCircle color="#f97316" size={20} /> Personal Task</h3>
          <input placeholder="Task Name" value={selfTaskName} onChange={(e) => setSelfTaskName(e.target.value)} style={{ padding: "10px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
          <input type="number" placeholder="Minutes" value={selfDeadline} onChange={(e) => setSelfDeadline(e.target.value)} style={{ padding: "10px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
          <input type="date" value={selfTaskDate} onChange={(e) => setSelfTaskDate(e.target.value)} style={{ padding: "10px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #cbd5e1", color: "#64748b" }} />
          <button onClick={handleTLSelfAssign} style={{ padding: "12px", background: "#f97316", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Assign Self</button>
        </div>
      </div>

      {/* --- MODALS --- */}
      {showMsgModal && (
        <div style={modalOverlayStyle}>
          <div style={{ background: "white", padding: "25px", borderRadius: "15px", width: "350px", textAlign: "center", border: "2px solid #f97316" }}>
            <Info color="#f97316" size={40} style={{ marginBottom: "15px" }} />
            <p style={{ fontWeight: "bold", color: "#1e293b" }}>{popupMsg}</p>
            <button onClick={() => setShowMsgModal(false)} style={{ marginTop: "20px", padding: "10px 30px", background: "#f97316", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>Close</button>
          </div>
        </div>
      )}

      {showVerifyModal && (
        <div style={modalOverlayStyle}>
          <div style={{ background: "white", padding: "30px", borderRadius: "15px", width: "420px" }}>
            <h2 style={{ marginBottom: "20px", fontSize: "18px" }}>Adjust Team Attendance</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {teamAttendance.map(member => (
                <div key={member.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px solid #eee" }}>
                  <span style={{ fontWeight: "600" }}>{member.name}</span>
                  <select value={member.status} onChange={(e) => handleAttendanceChange(member.name, e.target.value)} style={{ padding: "5px", borderRadius: "4px", border: "1px solid #cbd5e1" }}>
                    <option value="In Office">In Office</option>
                    <option value="WFH">WFH</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              ))}
            </div>
            <button onClick={() => { setShowVerifyModal(false); triggerPopup("Attendance Confirmed."); }} style={{ marginTop: "25px", width: "100%", padding: "12px", background: "#f97316", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>Confirm</button>
            <button onClick={() => setShowVerifyModal(false)} style={{ marginTop: "8px", width: "100%", background: "none", border: "none", color: "#64748b", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      {showReportModal && (
        <div style={modalOverlayStyle}>
          <div style={{ background: "white", padding: "30px", borderRadius: "15px", width: "400px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Report {reportEmpName}</h2>
            <textarea placeholder="Provide reason..." style={{ width: "100%", height: "100px", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={() => { setShowReportModal(false); triggerPopup(`Report for ${reportEmpName} sent.`); }} style={{ flex: 1, padding: "12px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", fontWeight: "700" }}>Send</button>
              <button onClick={() => setShowReportModal(false)} style={{ flex: 1, padding: "12px", background: "#f5f5f5", color: "#64748b", border: "1px solid #ddd", borderRadius: "8px" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {(showHRModal || showITModal) && (
        <div style={modalOverlayStyle}>
          <div style={{ background: "white", padding: "30px", borderRadius: "15px", width: "400px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2 style={{ fontSize: "18px", margin: 0 }}>{showHRModal ? "Contact Admin" : itQueryType}</h2>
              <X size={20} style={{ cursor: "pointer", color: "#64748b" }} onClick={() => { setShowHRModal(false); setShowITModal(false); }} />
            </div>
            <textarea placeholder="Describe query..." style={{ width: "100%", height: "100px", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={() => { setShowHRModal(false); setShowITModal(false); triggerPopup("Request submitted."); }} style={{ flex: 1, padding: "12px", background: "#f97316", color: "white", border: "none", borderRadius: "8px", fontWeight: "700" }}>Submit</button>
              <button onClick={() => { setShowHRModal(false); setShowITModal(false); }} style={{ flex: 1, padding: "12px", background: "#f5f5f5", color: "#64748b", border: "1px solid #ddd", borderRadius: "8px" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamLeadDashboard;