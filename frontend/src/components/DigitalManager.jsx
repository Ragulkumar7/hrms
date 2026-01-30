import React from "react";
import { FileText, ShieldCheck, PieChart, TrendingUp } from "lucide-react";

const DigitalManager = () => {
  return (
    <div style={{ padding: "30px", background: "#F9FAFB", minHeight: "100vh" }}>
      <h1 style={{ color: "#1F2937", fontSize: "24px", fontWeight: "700" }}>
        Digital Manager Hub
      </h1>
      <p style={{ color: "#6B7280", marginBottom: "30px" }}>
        Lead Generation Oversight & Performance Analytics
      </p>

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <ShieldCheck size={20} color="#7C3AED" /> Lead Verification Queue
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                borderBottom: "1px solid #F3F4F6",
                textAlign: "left",
                fontSize: "12px",
                color: "#9CA3AF",
              }}
            >
              <th style={{ padding: "12px" }}>Client/Company</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "14px" }}>
            <tr style={{ borderBottom: "1px solid #F9FAFB" }}>
              <td style={{ padding: "15px 12px", fontWeight: "600" }}>
                NeoEra Global Tech
              </td>
              <td>LinkedIn</td>
              <td>
                <span
                  style={{
                    padding: "4px 8px",
                    background: "#FEF3C7",
                    color: "#92400E",
                    borderRadius: "20px",
                    fontSize: "11px",
                  }}
                >
                  Pending Review
                </span>
              </td>
              <td>
                <button
                  style={{
                    color: "#7C3AED",
                    border: "none",
                    background: "none",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Approve & Send to Sales
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DigitalManager;
