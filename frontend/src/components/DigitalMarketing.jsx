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
  Zap,
  PieChart,
  FileText,
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
    alert(
      `Lead for ${formData.clientName} has been successfully sent to the Manager for verification!`,
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
      {/* Header Section */}
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#1F2937", fontSize: "24px", fontWeight: "700" }}>
          Digital Marketing Workspace
        </h1>
        <p style={{ color: "#6B7280" }}>
          Lead Generation via Social Media & Search Engine Strategy (SEO/SEM)
        </p>
      </header>

      {/* Top Level Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {[
          {
            label: "Total Outreach",
            value: "1,240",
            icon: <Zap size={20} />,
            color: "#7C3AED",
          },
          {
            label: "Interested Leads",
            value: "84",
            icon: <Users size={20} />,
            color: "#10B981",
          },
          {
            label: "Sales Handoffs",
            value: "32",
            icon: <TrendingUp size={20} />,
            color: "#3B82F6",
          },
          {
            label: "Conversion Rate",
            value: "12%",
            icon: <PieChart size={20} />,
            color: "#F59E0B",
          },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ color: stat.color, marginBottom: "10px" }}>
              {stat.icon}
            </div>
            <h3 style={{ fontSize: "20px", margin: "0", color: "#1F2937" }}>
              {stat.value}
            </h3>
            <p
              style={{ fontSize: "12px", color: "#6B7280", margin: "5px 0 0" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

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

      {/* Tab Content */}
      {activeTab === "lead-gen" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
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
              <Send size={20} color="#7C3AED" /> Social Media Lead Finder
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
                  Client / Company Name
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
                Submit to Manager Review
              </button>
            </form>
          </div>

          {/* Manager's Pending Approvals */}
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
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#4B5563",
              }}
            >
              <FileText size={20} color="#7C3AED" /> Lead Approval Queue
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "#6B7280",
                marginBottom: "15px",
              }}
            >
              Verification of leads before Sales handoff.
            </p>
            <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #F9FAFB",
                }}
              >
                <span style={{ fontSize: "13px" }}>TechFlow Solutions</span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#9333EA",
                    fontWeight: "700",
                  }}
                >
                  LinkedIn
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #F9FAFB",
                }}
              >
                <span style={{ fontSize: "13px" }}>Global Systems</span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#9333EA",
                    fontWeight: "700",
                  }}
                >
                  Facebook
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "seo-sem" && (
        <div
          style={{ background: "white", padding: "24px", borderRadius: "16px" }}
        >
          <h3 style={{ marginBottom: "20px" }}>
            S.E.O & S.E.M Strategy Performance
          </h3>
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
                Organic SEO
              </h4>
              <p style={{ fontSize: "13px", color: "#6B7280" }}>
                Metadata optimization and keyword health audits.
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
                Paid Ads (SEM)
              </h4>
              <p style={{ fontSize: "13px", color: "#6B7280" }}>
                Google Ads performance and budget ROI tracking.
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
                Social Reach
              </h4>
              <p style={{ fontSize: "13px", color: "#6B7280" }}>
                Engagement metrics across Instagram and LinkedIn.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "intern-portal" && (
        <div
          style={{ background: "white", padding: "24px", borderRadius: "16px" }}
        >
          <h3 style={{ marginBottom: "15px" }}>Daily "Execute" Checklist</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "Weekly Search Engine Rank Monitoring",
              "Identifying Client Potential on Social Media",
              "Lead Details Entry for Sales Executives",
              "Daily Blog SEO Optimization Check",
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
