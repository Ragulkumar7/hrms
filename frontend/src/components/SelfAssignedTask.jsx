import React, { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  ClipboardList,
  Save,
  AlertCircle,
  CheckCircle2,
  Timer,
  History,
  ChevronDown,
  X,
} from "lucide-react";

// --- Custom Modal Component ---
const MessageModal = ({ isOpen, message, type, onClose }) => {
  if (!isOpen) return null;
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertCircle size={20} color={type === "alert" ? "#ef4444" : "#4f46e5"} />
            <strong style={{ fontSize: "18px" }}>
              {type === "alert" ? "Notification" : "System Message"}
            </strong>
          </div>
          <X size={20} onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
        <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.5" }}>{message}</p>
        <button onClick={onClose} style={styles.modalBtn}>Close</button>
      </div>
    </div>
  );
};

const SelfAssignedTask = () => {
  const [taskData, setTaskData] = useState({ taskName: "", date: "", time: "" });
  const [savedTasks, setSavedTasks] = useState([
    { id: 1, taskName: "Initial Project Review", date: "2026-01-28", time: "10:00", status: "Completed" },
    { id: 2, taskName: "Client Call Prep", date: "2026-01-29", time: "14:30", status: "Working" },
  ]);
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState({ isOpen: false, message: "", type: "info" });

  const showModal = (message, type = "info") => {
    setModal({ isOpen: true, message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleStatusChange = (id, newStatus) => {
    setSavedTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!taskData.taskName || !taskData.date || !taskData.time) {
      showModal("Please fill in all fields before saving.", "alert");
      return;
    }
    const newTask = { id: Date.now(), ...taskData, status: "Pending" };
    setSavedTasks([newTask, ...savedTasks]);
    setTaskData({ taskName: "", date: "", time: "" });
    showModal("Task saved successfully!", "info");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      savedTasks.forEach((task) => {
        if (task.status !== "Completed") {
          const [hours, minutes] = task.time.split(":");
          const taskDateTime = new Date(task.date);
          taskDateTime.setHours(hours, minutes, 0);

          if (now >= taskDateTime && now < new Date(taskDateTime.getTime() + 60000)) {
            showModal(`⚠️ Alert: Time is up for task: ${task.taskName}`, "alert");
            handleStatusChange(task.id, "Completed");
          }
        }
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [savedTasks]);

  const filteredTasks = filter === "All" ? savedTasks : savedTasks.filter((t) => t.status === filter);

  return (
    <div style={styles.container}>
      <MessageModal
        isOpen={modal.isOpen}
        message={modal.message}
        type={modal.type}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />

      {/* LEFT SECTION: Task Entry Form */}
      <div style={styles.leftSection}>
        <div style={styles.entryContainer}>
          <div style={styles.card}>
            <div style={styles.header}>
              <ClipboardList size={28} color="#4f46e5" />
              <h2 style={styles.title}>Self Assigned Task</h2>
            </div>
            <p style={styles.subtitle}>Log personal tasks and set deadline alerts.</p>
            <form onSubmit={handleSave} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Task Name</label>
                <input
                  type="text"
                  name="taskName"
                  value={taskData.taskName}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Task title..."
                />
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}><Calendar size={14} /> Date</label>
                  <input type="date" name="date" value={taskData.date} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}><Clock size={14} /> Time</label>
                  <input type="time" name="time" value={taskData.time} onChange={handleChange} style={styles.input} />
                </div>
              </div>
              <button type="submit" style={styles.saveButton}><Save size={18} /> Save Task</button>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: Task History */}
      <div style={styles.rightSection}>
        <div style={styles.historyContainer}>
          <div style={styles.historyHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <History size={24} color="#1e293b" />
              <h3 style={{ margin: 0, fontSize: "22px" }}>Task History</h3>
            </div>
            <div style={styles.filterGroup}>
              {["All", "Working", "Pending", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  style={{
                    ...styles.filterBtn,
                    backgroundColor: filter === status ? "#4f46e5" : "#fff",
                    color: filter === status ? "#fff" : "#64748b",
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.taskList}>
            {filteredTasks.map((task) => (
              <div key={task.id} style={styles.taskItem}>
                <div style={styles.taskInfo}>
                  <span style={styles.taskItemTitle}>{task.taskName}</span>
                  <div style={styles.taskMeta}>
                    <Calendar size={12} /> {task.date} | <Clock size={12} /> {task.time}
                  </div>
                </div>

                <div style={styles.dropdownContainer}>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    style={{
                      ...styles.statusSelect,
                      backgroundColor:
                        task.status === "Completed" ? "#dcfce7" : task.status === "Working" ? "#fef9c3" : "#fee2e2",
                      color:
                        task.status === "Completed" ? "#166534" : task.status === "Working" ? "#854d0e" : "#991b1b",
                    }}
                  >
                    <option value="Working">Working</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <ChevronDown size={12} style={styles.dropdownIcon} />
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <div style={styles.emptyState}>No tasks found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  leftSection: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc", // Keeps subtle distinction for input area
  },
  entryContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "40px",
  },
  rightSection: {
    flex: "1",
    padding: "40px",
    backgroundColor: "#ffffff",
    height: "100vh",
  },
  historyContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "550px", // Increased to match History weight
    border: "1px solid #e2e8f0",
  },
  header: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" },
  title: { fontSize: "24px", fontWeight: "700", color: "#1e293b", margin: 0 },
  subtitle: { color: "#64748b", marginBottom: "32px", fontSize: "14px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#475569", display: "flex", alignItems: "center", gap: "5px" },
  input: { padding: "14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" },
  row: { display: "flex", gap: "16px" },
  saveButton: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "16px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "10px",
  },
  historyHeader: { marginBottom: "30px", flexShrink: 0 },
  filterGroup: { display: "flex", gap: "10px", marginTop: "20px" },
  filterBtn: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    overflowY: "auto",
    paddingRight: "10px",
    flexGrow: 1,
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #f1f5f9",
    backgroundColor: "#f8fafc",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
  },
  taskItemTitle: { fontWeight: "600", color: "#1e293b", fontSize: "16px" },
  taskMeta: { fontSize: "13px", color: "#64748b", marginTop: "6px", display: "flex", alignItems: "center", gap: "6px" },
  dropdownContainer: { position: "relative", display: "flex", alignItems: "center" },
  statusSelect: {
    appearance: "none",
    padding: "8px 32px 8px 16px",
    borderRadius: "12px",
    border: "none",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    cursor: "pointer",
    outline: "none",
  },
  dropdownIcon: { position: "absolute", right: "10px", pointerEvents: "none" },
  emptyState: { textAlign: "center", color: "#94a3b8", marginTop: "50px", fontSize: "15px" },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "420px",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
  },
  modalBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default SelfAssignedTask;