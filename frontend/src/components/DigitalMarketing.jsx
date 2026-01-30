import React, { useState } from "react";
import {
  Share2,
  Search,
  BarChart3,
  Users,
  Send,
  CheckCircle,
  TrendingUp,
  Globe,
} from "lucide-react";

const DigitalMarketing = () => {
  const [activeTab, setActiveTab] = useState("lead-gen");
  const [formData, setFormData] = useState({
    clientName: "",
    socialMediaSource: "LinkedIn",
    interestLevel: "Warm",
    requirements: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitToSales = (e) => {
    e.preventDefault();
    console.log("Lead Handoff details provided to Sales Team:", formData);
    alert(
      `Lead for ${formData.clientName} has been successfully sent to the Sales Pipeline!`,
    );
    setFormData({
      clientName: "",
      socialMediaSource: "LinkedIn",
      interestLevel: "Warm",
      requirements: "",
    });
  };

  return (
    <div style={{ padding: "30px", background: "#F9FAFB", minHeight: "100vh" }}>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#1F2937", fontSize: "24px", fontWeight: "700" }}>
          Digital Marketing Workspace
        </h1>
        <p style={{ color: "#6B7280" }}>
          Lead Generation via Social Media & Search Engine Strategy (SEO/SEM)
        </p>
      </header>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          borderBottom: "2px solid #E5E7EB",
          marginBottom: "25px",
        }}
      >
        {["lead-gen", "seo-sem", "intern-portal"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              border: "none",
              background: "none",
              fontWeight: "600",
              color: activeTab === tab ? "#7C3AED" : "#6B7280",
              borderBottom: activeTab === tab ? "3px solid #7C3AED" : "none",
              textTransform: "capitalize",
            }}
          >
            {tab === "lead-gen" ? "Client Lead Gen" : tab.replace("-", " ")}
          </button>
        ))}
      </div>

      {activeTab === "lead-gen" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          {/* Lead Handoff Form */}
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#4B5563",
              }}
            >
              <Send size={20} color="#7C3AED" /> Sales Handoff (Manager &
              Executive)
            </h3>
            <form onSubmit={handleSubmitToSales}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    marginBottom: "5px",
                    fontWeight: "500",
                  }}
                >
                  Client / Company Name Found on Social Media
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                  }}
                  required
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "5px",
                      fontWeight: "500",
                    }}
                  >
                    Platform Source
                  </label>
                  <select
                    name="socialMediaSource"
                    value={formData.socialMediaSource}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                    }}
                  >
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>Twitter/X</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "5px",
                      fontWeight: "500",
                    }}
                  >
                    Sales Readiness
                  </label>
                  <select
                    name="interestLevel"
                    value={formData.interestLevel}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                    }}
                  >
                    <option>Warm</option>
                    <option>Hot (Ready)</option>
                    <option>Cold (Researching)</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#7C3AED",
                  color: "white",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Send Report to Sales Team
              </button>
            </form>
          </div>

          {/* Role Responsibilities Tracker */}
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#4B5563" }}>
              Role-Based Objectives
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div
                style={{
                  padding: "10px",
                  borderLeft: "4px solid #7C3AED",
                  background: "#F5F3FF",
                }}
              >
                <h4 style={{ fontSize: "14px", margin: "0 0 5px 0" }}>
                  Digital Manager
                </h4>
                <p style={{ fontSize: "12px", margin: 0, color: "#6B7280" }}>
                  Review client reports and ensure high-quality lead delivery to
                  Sales Executives.
                </p>
              </div>
              <div
                style={{
                  padding: "10px",
                  borderLeft: "4px solid #10B981",
                  background: "#F0FDF4",
                }}
              >
                <h4 style={{ fontSize: "14px", margin: "0 0 5px 0" }}>
                  Digital Executive
                </h4>
                <p style={{ fontSize: "12px", margin: 0, color: "#6B7280" }}>
                  Active outreach on social media platforms to identify
                  potential business partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "seo-sem" && (
        <div
          style={{ background: "white", padding: "24px", borderRadius: "16px" }}
        >
          <h3 style={{ marginBottom: "20px" }}>S.E.O & S.E.M Strategy</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
            }}
          >
            <div
              style={{
                padding: "15px",
                border: "1px solid #F3F4F6",
                borderRadius: "12px",
              }}
            >
              <Globe
                size={20}
                color="#7C3AED"
                style={{ marginBottom: "10px" }}
              />
              <h4 style={{ color: "#7C3AED", margin: "0 0 10px 0" }}>
                S.E.O Executive
              </h4>
              <p style={{ fontSize: "13px", color: "#6B7280" }}>
                On-page keyword optimization and technical health audits.
              </p>
            </div>
            <div
              style={{
                padding: "15px",
                border: "1px solid #F3F4F6",
                borderRadius: "12px",
              }}
            >
              <TrendingUp
                size={20}
                color="#7C3AED"
                style={{ marginBottom: "10px" }}
              />
              <h4 style={{ color: "#7C3AED", margin: "0 0 10px 0" }}>
                S.E.M Management
              </h4>
              <p style={{ fontSize: "13px", color: "#6B7280" }}>
                Running paid search campaigns to increase website traffic.
              </p>
            </div>
            <div
              style={{
                padding: "15px",
                border: "1px solid #F3F4F6",
                borderRadius: "12px",
              }}
            >
              <Share2
                size={20}
                color="#7C3AED"
                style={{ marginBottom: "10px" }}
              />
              <h4 style={{ color: "#7C3AED", margin: "0 0 10px 0" }}>
                Social Media Audit
              </h4>
              <p style={{ fontSize: "13px", color: "#6B7280" }}>
                Tracking client engagement metrics for the Sales team.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "intern-portal" && (
        <div
          style={{ background: "white", padding: "24px", borderRadius: "16px" }}
        >
          <h3 style={{ marginBottom: "15px" }}>S.E.O Execute Intern Tasks</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "Weekly Search Engine Rank Monitoring",
              "Identify Potential Clients on Social Media",
              "Input Lead Details for Sales Team",
              "Daily SEO Content Optimization Check",
            ].map((task, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 0",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                <CheckCircle size={18} color="#10B981" />
                <span style={{ fontSize: "14px", color: "#374151" }}>
                  {task}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DigitalMarketing;
