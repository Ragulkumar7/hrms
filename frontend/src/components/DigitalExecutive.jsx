import React from "react";
import { Zap, Globe, CheckCircle, Linkedin, Instagram, Facebook } from "lucide-react";

const DigitalExecutive = () => {
  const tasks = [
    { task: "Update Metadata for office website", type: "S.E.O" },
    { task: "Monitor Daily SEM Ad Performance", type: "S.E.M" },
    { task: "Identify 5 leads on social media", type: "Execute" },
    { task: "S.E.O Execute Intern Task: Keyword Audit", type: "Intern" }
  ];

  return (
    <div style={{ padding: "30px", background: "#F9FAFB", minHeight: "100vh" }}>
      <h1 style={{ color: "#1F2937", fontSize: "24px", fontWeight: "700" }}>Digital Executive Workstation</h1>
      <p style={{ color: "#6B7280", marginBottom: "30px" }}>Social Media Outreach & Search Engine Strategy Execution</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "30px" }}>
        {/* Lead Entry Form */}
        <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}><Zap size={20} color="#7C3AED" /> Social Media Client Finder</h3>
          <input type="text" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #E5E7EB", marginBottom: "15px" }} placeholder="Client/Company Name" />
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
             <button style={{ flex: 1, padding: "10px", border: "1px solid #7C3AED", background: "#F5F3FF", borderRadius: "8px" }}><Linkedin size={18} /></button>
             <button style={{ flex: 1, padding: "10px", border: "1px solid #E5E7EB", background: "white", borderRadius: "8px" }}><Instagram size={18} /></button>
             <button style={{ flex: 1, padding: "10px", border: "1px solid #E5E7EB", background: "white", borderRadius: "8px" }}><Facebook size={18} /></button>
          </div>
          <button style={{ width: "100%", padding: "14px", background: "#7C3AED", color: "white", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>Submit to Manager Review</button>
        </div>

        {/* Task Checklist */}
        <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #E5E7EB" }}>
          <h3 style={{ marginBottom: "20px" }}><Globe size={20} color="#7C3AED" /> SEO/SEM Daily "Execute" Tasks</h3>
          {tasks.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F9FAFB" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckCircle size={18} color="#10B981" />
                <span style={{ fontSize: "14px", color: "#374151" }}>{item.task}</span>
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", background: "#F3F4F6", padding: "3px 10px", borderRadius: "12px", color: "#6B7280" }}>{item.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalExecutive;