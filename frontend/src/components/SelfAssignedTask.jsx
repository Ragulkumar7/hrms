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
} from "lucide-react";

const SelfAssignedTask = () => {
  const [taskData, setTaskData] = useState({
    taskName: "",
    date: "",
    time: "",
  });

  // State to store saved tasks
  const [savedTasks, setSavedTasks] = useState([
    {
      id: 1,
      taskName: "Initial Project Review",
      date: "2026-01-28",
      time: "10:00",
      status: "Completed",
    },
    {
      id: 2,
      taskName: "Client Call Prep",
      date: "2026-01-29",
      time: "14:30",
      status: "Working",
    },
  ]);

  const [filter, setFilter] = useState("All");

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Save Function
  const handleSave = (e) => {
    e.preventDefault();
    if (!taskData.taskName || !taskData.date || !taskData.time) {
      alert("Please fill in all fields before saving.");
      return;
    }

    const newTask = {
      id: Date.now(),
      ...taskData,
      status: "Pending",
    };

    setSavedTasks([newTask, ...savedTasks]);
    setTaskData({ taskName: "", date: "", time: "" }); // Clear form
    alert("Task saved successfully!");
  };

  // Timer Alert Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      savedTasks.forEach((task) => {
        if (task.status !== "Completed") {
          const [hours, minutes] = task.time.split(":");
          const taskDateTime = new Date(task.date);
          taskDateTime.setHours(hours, minutes, 0);

          // Trigger alert if time matches (within a 1-minute window)
          if (
            now >= taskDateTime &&
            now < new Date(taskDateTime.getTime() + 60000)
          ) {
            alert(`⚠️ Alert: Time is up for task: ${task.taskName}`);

            // Mark as completed automatically after alert
            setSavedTasks((prev) =>
              prev.map((t) =>
                t.id === task.id ? { ...t, status: "Completed" } : t,
              ),
            );
          }
        }
      });
    }, 10000); // Check every 10 seconds

    return () => clearInterval(timer);
  }, [savedTasks]);

  const filteredTasks =
    filter === "All"
      ? savedTasks
      : savedTasks.filter((t) => t.status === filter);

  return (
    <div style={styles.container}>
      {/* LEFT SIDE: TASK ENTRY */}
      <div style={styles.leftSection}>
        <div style={styles.card}>
          <div style={styles.header}>
            <ClipboardList size={28} color="#4f46e5" />
            <h2 style={styles.title}>Self Assigned Task</h2>
          </div>

          <p style={styles.subtitle}>
            Log your personal tasks and set a deadline alert.
          </p>

          <form onSubmit={handleSave} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Task Name</label>
              <input
                type="text"
                name="taskName"
                placeholder="What are you working on?"
                value={taskData.taskName}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Calendar size={14} style={{ marginRight: "5px" }} /> Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={taskData.date}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Clock size={14} style={{ marginRight: "5px" }} /> Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={taskData.time}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <button type="submit" style={styles.saveButton}>
              <Save size={18} />
              <span>Save Task</span>
            </button>
          </form>

          {taskData.time && (
            <div style={styles.infoBox}>
              <AlertCircle size={16} />
              <span>
                Alert set for {taskData.time} on {taskData.date}.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: TASK HISTORY & STATUS */}
      <div style={styles.rightSection}>
        <div style={styles.historyHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <History size={24} color="#1e293b" />
            <h3 style={{ margin: 0 }}>Task History</h3>
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
                  <Calendar size={12} /> {task.date} | <Clock size={12} />{" "}
                  {task.time}
                </div>
              </div>
              <div
                style={{
                  ...styles.statusBadge,
                  backgroundColor:
                    task.status === "Completed"
                      ? "#dcfce7"
                      : task.status === "Working"
                        ? "#fef9c3"
                        : "#fee2e2",
                  color:
                    task.status === "Completed"
                      ? "#166534"
                      : task.status === "Working"
                        ? "#854d0e"
                        : "#991b1b",
                }}
              >
                {task.status === "Completed" ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <Timer size={14} />
                )}
                {task.status}
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div style={styles.emptyState}>
              No tasks found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    marginLeft: "260px", // Aligns with your sidebar
  },
  leftSection: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    borderRight: "1px solid #e2e8f0",
  },
  rightSection: {
    flex: "1.2",
    padding: "40px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    border: "1px solid #e2e8f0",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  subtitle: {
    color: "#64748b",
    marginBottom: "32px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    display: "flex",
    alignItems: "center",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s",
  },
  row: {
    display: "flex",
    gap: "16px",
  },
  saveButton: {
    marginTop: "10px",
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },
  infoBox: {
    marginTop: "24px",
    padding: "12px",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    borderRadius: "6px",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  historyHeader: {
    marginBottom: "30px",
  },
  filterGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  filterBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    overflowY: "auto",
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #f1f5f9",
    backgroundColor: "#f8fafc",
  },
  taskItemTitle: {
    fontWeight: "600",
    color: "#1e293b",
    fontSize: "15px",
  },
  taskMeta: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "4px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  emptyState: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: "40px",
    fontSize: "14px",
  },
};

export default SelfAssignedTask;
