import React from "react";
import { Users, Briefcase, Activity, CheckCircle, Clock, AlertCircle } from "lucide-react";

const TeamLeadPortal = () => {
  // Sample data for employee work tracking
  const teamProgress = [
    { id: 1, name: "Arun", task: "Frontend Dashboard Integration", progress: 85, status: "On Track" },
    { id: 2, name: "Priya", task: "Database Security Patching", progress: 60, status: "In Progress" },
    { id: 3, name: "John", task: "API Documentation", progress: 100, status: "Completed" },
    { id: 4, name: "Sarah", task: "User Authentication Flow", progress: 35, status: "Delayed" },
    { id: 5, name: "Deepak", task: "Bug Fixing - Login Module", progress: 75, status: "On Track" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return { bg: "#DCFCE7", text: "#166534" };
      case "Delayed": return { bg: "#FEE2E2", text: "#991B1B" };
      default: return { bg: "#FEF3C7", text: "#92400E" };
    }
  };

  return (
    <div style={{ padding: "30px", background: "#F9FAFB", minHeight: "100vh" }}>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#1F2937", fontSize: "26px", fontWeight: "800", display: "flex", alignItems: "center", gap: "12px" }}>
          <Users color="#4C1D95" /> Team Lead Portal
        </h1>
        <p style={{ color: "#6B7280" }}>Real-time overview of employee tasks and project completion rates.</p>
      </header>

      {/* Employee Details Table */}
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E5E7EB", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ color: "#374151", margin: 0 }}>Team Activity Tracker</h3>
          <span style={{ fontSize: "12px", background: "#F3F4F6", padding: "4px 12px", borderRadius: "20px", fontWeight: "600" }}>Total Members: {teamProgress.length}</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB", textAlign: "left", borderBottom: "1px solid #F3F4F6" }}>
              <th style={{ padding: "15px 20px", color: "#6B7280", fontSize: "13px", fontWeight: "600" }}>Employee Name</th>
              <th style={{ padding: "15px", color: "#6B7280", fontSize: "13px", fontWeight: "600" }}>Current Assignment</th>
              <th style={{ padding: "15px", color: "#6B7280", fontSize: "13px", fontWeight: "600" }}>Progress</th>
              <th style={{ padding: "15px", color: "#6B7280", fontSize: "13px", fontWeight: "600" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {teamProgress.map((emp) => {
              const colors = getStatusColor(emp.status);
              return (
                <tr key={emp.id} style={{ borderBottom: "1px solid #F9FAFB" }}>
                  <td style={{ padding: "18px 20px", fontWeight: "700", color: "#4C1D95" }}>{emp.name}</td>
                  <td style={{ padding: "18px 15px", color: "#4B5563", fontSize: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Briefcase size={14} color="#9CA3AF" /> {emp.task}
                    </div>
                  </td>
                  <td style={{ padding: "18px 15px", width: "220px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ flex: 1, height: "8px", background: "#F3F4F6", borderRadius: "10px" }}>
                        <div style={{ 
                          width: `${emp.progress}%`, 
                          height: "100%", 
                          background: emp.progress === 100 ? "#10B981" : "#7C3AED", 
                          borderRadius: "10px",
                          transition: "width 0.5s ease"
                        }}></div>
                      </div>
                      <span style={{ fontWeight: "800", color: "#374151", fontSize: "13px" }}>{emp.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "18px 15px" }}>
                    <span style={{ 
                      padding: "5px 12px", 
                      borderRadius: "20px", 
                      fontSize: "11px", 
                      fontWeight: "700",
                      background: colors.bg,
                      color: colors.text,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      {emp.status === "Completed" ? <CheckCircle size={12} /> : emp.status === "Delayed" ? <AlertCircle size={12} /> : <Clock size={12} />}
                      {emp.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamLeadPortal;