import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  Banknote,
  Users,
  Briefcase,
  TrendingUp,
  Settings,
  Cpu,
  FileText,
  LogOut,
  ShieldCheck,
  Fingerprint,
  Menu,
  X,
  UserCheck,
  Phone,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Calculator,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [dmOpen, setDmOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const sections = [
    {
      label: "Main",
      items: [
        {
          name: "Dashboard",
          path: "/",
          icon: <LayoutDashboard size={20} />,
          allowed: ["Manager", "TL", "HR", "Employee", "Accounts", "DM"],
        },
        {
          name: "Team Lead Portal",
          path: "/teamlead",
          icon: <Users size={20} />,
          allowed: ["TL", "HR", "Manager"],
        },
        {
          name: "HR Management",
          path: "/hrManagement",
          icon: <Fingerprint size={20} />,
          allowed: ["Manager", "HR"],
        },
        {
          name: "Employees Directory",
          path: "/employees",
          icon: <Users size={20} />,
          allowed: ["Manager", "HR"],
        },
        {
          name: "Manager Portal",
          path: "/manager",
          icon: <ShieldCheck size={20} />,
          allowed: ["Manager", "HR"],
        },
      ],
    },
    {
      label: "Operations",
      items: [
        {
          name: "Attendance",
          path: "/employee-attendance",
          icon: <CalendarCheck size={20} />,
          allowed: ["Manager", "TL", "HR", "Employee", "Accounts", "DM"],
        },
        {
          name: "Attendance History",
          path: "/attendance-history",
          icon: <Calculator size={20} />,
          allowed: ["Manager", "HR"],
        },
        {
          name: "Task Management",
          path: "/tasks",
          icon: <ClipboardList size={20} />,
          allowed: ["Manager", "TL", "Employee", "HR", "DM"],
        },
        {
          name: "Self Assigned Tasks",
          path: "/self-task",
          icon: <UserCheck size={20} />,
          allowed: ["Manager", "TL", "Employee"],
        },
        {
          name: "Teams / Chat",
          path: "/teams",
          icon: <MessageSquare size={20} />,
          allowed: ["Manager", "TL", "HR", "Employee", "Accounts"],
        },
        {
          name: "Payroll & Accounts",
          path: "/payroll",
          icon: <Banknote size={20} />,
          allowed: ["Manager", "HR"],
        },
        {
          name: "IT & Operations",
          path: "/it",
          icon: <Cpu size={20} />,
          allowed: ["Manager", "HR"],
        },
        {
          name: "Recruitment",
          path: "/recruitment",
          icon: <Briefcase size={20} />,
          allowed: ["Manager", "HR"],
        },
        {
          name: "Sales Manager",
          path: "/sales",
          icon: <TrendingUp size={20} />,
          allowed: ["Manager", "TL", "HR"],
        },
        {
          name: "Digital Marketing",
          icon: <Phone size={20} />,
          allowed: ["DM"],
          subItems: [
            {
              name: "Digital Manager",
              path: "/digital-marketing/manager",
              allowed: ["DM"],
            },
            {
              name: "Digital Executive",
              path: "/digital-marketing/executive",
              allowed: ["DM"],
            },
          ],
        },
        {
          name: "Accounts Team",
          // UPDATED: Path synced with App.jsx to load Invoice/Ledger/PO
          path: "/accounts-team",
          icon: <Banknote size={20} />,
          allowed: ["Accounts", "Manager"], // Manager-kum access venumna role add pannikalam
        },
      ],
    },
    {
      label: "System",
      items: [
        {
          name: "Reports",
          path: "/reports",
          icon: <FileText size={20} />,
          allowed: ["Manager", "TL", "HR", "Accounts", "DM"],
        },
        {
          name: "Settings",
          path: "/settings",
          icon: <Settings size={20} />,
          allowed: ["Manager", "TL", "Employee", "Accounts", "HR", "DM"],
        },
      ],
    },
  ];

  const activeSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.allowed.includes(user.role)),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      <style>
        {`
          :root {
            --sb-bg-start: #2E1065;
            --sb-bg-end: #4C1D95;
            --sb-text: #E9D5FF;
            --sb-active-bg: rgba(255, 255, 255, 0.15);
            --sb-hover-bg: rgba(255, 255, 255, 0.05);
            --sb-accent: #C084FC;
          }

          .sidebar-wrapper { display: flex; height: 100vh; position: sticky; top: 0; z-index: 1000; }
          .sidebar { width: 270px; min-width: 270px; background-image: linear-gradient(160deg, var(--sb-bg-start) 0%, var(--sb-bg-end) 100%); height: 100vh; display: flex; flex-direction: column; box-shadow: 10px 0 30px rgba(0,0,0,0.25); font-family: 'Inter', sans-serif; color: var(--sb-text); transition: transform 0.3s ease; }
          .sidebar-header { padding: 25px; display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.1); border-bottom: 1px solid rgba(255,255,255,0.08); }
          .logo-glass { width: 42px; height: 42px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; font-weight: 800; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .brand-info { display: flex; flex-direction: column; }
          .brand-name { font-size: 19px; font-weight: 700; color: #fff; letter-spacing: 0.5px; }
          .brand-badge { font-size: 10px; font-weight: 600; text-transform: uppercase; background: linear-gradient(90deg, #A855F7, #D8B4FE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-top: 2px; letter-spacing: 1px; }
          .nav-container { flex: 1; overflow-y: auto; padding: 20px 15px; }
          .nav-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: rgba(233, 213, 255, 0.4); margin: 20px 0 8px 10px; letter-spacing: 1px; }
          .nav-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; margin-bottom: 6px; color: var(--sb-text); text-decoration: none; border-radius: 14px; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); font-size: 14px; font-weight: 500; border: 1px solid transparent; cursor: pointer; }
          .nav-item:hover { background: var(--sb-hover-bg); color: #fff; transform: translateX(3px); }
          .nav-item.active { background: var(--sb-active-bg); border: 1px solid rgba(255,255,255,0.1); color: #fff; font-weight: 600; box-shadow: 0 4px 15px rgba(0,0,0,0.1); backdrop-filter: blur(5px); }
          .nav-item.active .nav-icon { color: var(--sb-accent); filter: drop-shadow(0 0 8px rgba(192, 132, 252, 0.5)); }
          .nav-content { display: flex; align-items: center; gap: 14px; }
          .active-dot { width: 6px; height: 6px; background: var(--sb-accent); border-radius: 50%; box-shadow: 0 0 8px var(--sb-accent); }
          
          .sub-menu-container { margin-left: 20px; border-left: 1px solid rgba(255,255,255,0.1); margin-top: -4px; margin-bottom: 10px; padding-left: 10px; }
          .sub-nav-item { display: block; padding: 8px 16px; color: rgba(233, 213, 255, 0.7); text-decoration: none; font-size: 13px; border-radius: 8px; transition: 0.2s; }
          .sub-nav-item:hover { color: #fff; background: rgba(255,255,255,0.05); }
          .sub-nav-item.active { color: var(--sb-accent); font-weight: 600; }

          .profile-card { margin: 20px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between; }
          .avatar-circle { width: 36px; height: 36px; background: linear-gradient(135deg, #F472B6, #9333EA); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; font-size: 14px; }
          .user-details h4 { margin: 0; font-size: 13px; color: white; }
          .user-details p { margin: 0; font-size: 11px; color: rgba(255,255,255,0.5); }
          .logout-btn { background: rgba(255,255,255,0.1); border: none; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FCA5A5; cursor: pointer; transition: 0.2s; }
          .logout-btn:hover { background: #EF4444; color: white; }
          
          @media (max-width: 968px) { .mobile-toggle { display: flex; position: fixed; top: 15px; left: 15px; z-index: 1100; background: var(--sb-bg-end); color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.2); } .sidebar { position: fixed; left: 0; top: 0; height: 100vh; transform: translateX(-100%); z-index: 1200; } .sidebar.open { transform: translateX(0); } .sidebar-overlay { display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 1150; opacity: 0; pointer-events: none; transition: opacity 0.3s; } .sidebar-overlay.visible { opacity: 1; pointer-events: auto; } }
        `}
      </style>

      <button className="mobile-toggle" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>

      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <div className="sidebar-wrapper">
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="logo-glass">S</div>
            <div className="brand-info">
              <span className="brand-name">SmartHR</span>
              <span className="brand-badge">{user.role} Workspace</span>
            </div>
          </div>

          <div className="nav-container">
            {activeSections.map((section, sIndex) => (
              <div key={sIndex}>
                <div className="nav-label">{section.label}</div>
                <nav>
                  {section.items.map((item, iIndex) => {
                    const hasSubItems =
                      item.subItems && item.subItems.length > 0;
                    const isActive = location.pathname === item.path;

                    if (hasSubItems) {
                      return (
                        <div key={iIndex}>
                          <div
                            className={`nav-item ${dmOpen ? "active" : ""}`}
                            onClick={() => setDmOpen(!dmOpen)}
                          >
                            <div className="nav-content">
                              <span className="nav-icon">{item.icon}</span>
                              <span>{item.name}</span>
                            </div>
                            {dmOpen ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </div>
                          {dmOpen && (
                            <div className="sub-menu-container">
                              {item.subItems.map((sub, subIdx) => (
                                <Link
                                  key={subIdx}
                                  to={sub.path}
                                  className={`sub-nav-item ${location.pathname === sub.path ? "active" : ""}`}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        to={item.path}
                        key={iIndex}
                        className={`nav-item ${isActive ? "active" : ""}`}
                      >
                        <div className="nav-content">
                          <span className="nav-icon">{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                        {isActive && <div className="active-dot"></div>}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          <div className="profile-card">
            <div className="profile-info">
              <div className="avatar-circle">{user.name.charAt(0)}</div>
              <div className="user-details">
                <h4>{user.name}</h4>
                <p>Online</p>
              </div>
            </div>
            <Link to="/logout" className="logout-btn">
              <LogOut size={16} />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;