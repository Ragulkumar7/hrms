import React, { useState } from "react";
import { History, Calendar, Clock, Filter, FileText } from "lucide-react";

const Attendance = () => {
  // Personal logs for the Team Lead
  const [historyData] = useState([
    {
      date: "Jan 30, 2026",
      in: "09:05 AM",
      out: "06:15 PM",
      hours: "9h 10m",
      status: "Present",
    },
    {
      date: "Jan 29, 2026",
      in: "09:30 AM",
      out: "06:45 PM",
      hours: "9h 15m",
      status: "Present",
    },
    {
      date: "Jan 28, 2026",
      in: "10:15 AM",
      out: "07:30 PM",
      hours: "9h 15m",
      status: "Late",
    },
    {
      date: "Jan 27, 2026",
      in: "09:00 AM",
      out: "06:00 PM",
      hours: "9h 00m",
      status: "WFH",
    },
    {
      date: "Jan 26, 2026",
      in: "08:55 AM",
      out: "05:55 PM",
      hours: "9h 00m",
      status: "Present",
    },
  ]);

  return (
    <div style={{ padding: "30px", background: "#F9FAFB", minHeight: "100vh" }}>
      <header
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ color: "#1F2937", fontSize: "24px", fontWeight: "700" }}>
            Personal Attendance History
          </h1>
          <p style={{ color: "#6B7280" }}>Team Lead Activity Tracking Hub</p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#fff",
            border: "1px solid #E5E7EB",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          <Filter size={16} /> Filter Logs
        </button>
      </header>

      {/* Summary Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Calendar color="#7C3AED" style={{ marginBottom: "10px" }} />
          <h3 style={{ fontSize: "22px", margin: "0" }}>22</h3>
          <p style={{ fontSize: "12px", color: "#6B7280" }}>
            Days Present (Monthly)
          </p>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Clock color="#10B981" style={{ marginBottom: "10px" }} />
          <h3 style={{ fontSize: "22px", margin: "0" }}>09:12 AM</h3>
          <p style={{ fontSize: "12px", color: "#6B7280" }}>
            Avg. Check-in Time
          </p>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <FileText color="#F59E0B" style={{ marginBottom: "10px" }} />
          <h3 style={{ fontSize: "22px", margin: "0" }}>0</h3>
          <p style={{ fontSize: "12px", color: "#6B7280" }}>
            Pending Adjustments
          </p>
        </div>
      </div>

      {/* Logs Table */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #F3F4F6",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <History size={20} color="#7C3AED" />
          <h3 style={{ fontSize: "18px", color: "#1F2937" }}>
            Attendance Activity Logs
          </h3>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#F9FAFB",
                textAlign: "left",
                borderBottom: "1px solid #F3F4F6",
                color: "#6B7280",
                fontSize: "13px",
              }}
            >
              <th style={{ padding: "15px 20px" }}>Date</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((row, i) => (
              <tr
                key={i}
                style={{ borderBottom: "1px solid #F9FAFB", fontSize: "14px" }}
              >
                <td
                  style={{
                    padding: "15px 20px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  {row.date}
                </td>
                <td style={{ color: "#4B5563" }}>{row.in}</td>
                <td style={{ color: "#4B5563" }}>{row.out}</td>
                <td style={{ color: "#4B5563" }}>{row.hours}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "700",
                      background:
                        row.status === "Present"
                          ? "#DCFCE7"
                          : row.status === "WFH"
                            ? "#DBEAFE"
                            : "#FEF3C7",
                      color:
                        row.status === "Present"
                          ? "#166534"
                          : row.status === "WFH"
                            ? "#1E40AF"
                            : "#92400E",
                    }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
