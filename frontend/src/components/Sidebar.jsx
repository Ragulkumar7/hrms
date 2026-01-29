import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  LayoutDashboard, CalendarCheck, ClipboardList, Banknote, 
  Users, Briefcase, TrendingUp, Settings, Cpu, FileText, 
  LogOut, ShieldCheck, Fingerprint, Menu, X
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar automatically when route changes (Mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // --- MENU CONFIGURATION ---
  const sections = [
    {
      label: 'Main',
      items: [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} />, allowed: ['Manager', 'TL', 'Employee'] },
        { name: 'Team Lead Portal', path: '/teamlead', icon: <Users size={18} />, allowed: ['TL'] },
        { name: 'HR Management', path: '/hrManagement', icon: <Fingerprint size={18} />, allowed: ['Manager', 'TL'] },
        { name: 'Employees Directory', path: '/employees', icon: <Users size={18} />, allowed: ['Manager'] },
        { name: 'Manager Portal', path: '/manager', icon: <ShieldCheck size={18} />, allowed: ['Manager', 'TL'] },
      ]
    },
    {
      label: 'Operations',
      items: [
        { name: 'Attendance', path: '/attendance', icon: <CalendarCheck size={18} />, allowed: ['Manager', 'TL', 'Employee'] },
        { name: 'Task Management', path: '/tasks', icon: <ClipboardList size={18} />, allowed: ['Manager', 'TL', 'Employee'] },
        { name: 'Payroll & Accounts', path: '/payroll', icon: <Banknote size={18} />, allowed: ['Manager'] },
        { name: 'IT & Operations', path: '/it', icon: <Cpu size={18} />, allowed: ['Manager'] },
        { name: 'Recruitment', path: '/recruitment', icon: <Briefcase size={18} />, allowed: ['Manager'] },
        { name: 'Sales Pipeline', path: '/sales', icon: <TrendingUp size={18} />, allowed: ['Manager', 'TL'] },
      ]
    },
    {
      label: 'System',
      items: [
        { name: 'Reports & PDF', path: '/reports', icon: <FileText size={18} />, allowed: ['Manager', 'TL'] },
        { name: 'Settings', path: '/settings', icon: <Settings size={18} />, allowed: ['Manager', 'TL', 'Employee'] },
      ]
    }
  ];

  const activeSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item => item.allowed.includes(user.role))
  })).filter(section => section.items.length > 0);

  return (
    <>
      <style>
        {`
          :root {
            --rup-bg: #1e1b4b;       
            --rup-text: #cbd5e1;     
            --rup-accent: #D4AF37;   
            --rup-hover: rgba(255, 255, 255, 0.05); 
          }

          /* --- DESKTOP STYLES (Default) --- */
          .sidebar-wrapper {
            display: flex;
            height: 100vh;
            position: sticky;
            top: 0;
            z-index: 1000;
          }

          .sidebar {
            width: 260px;
            min-width: 260px;
            background-color: var(--rup-bg);
            color: var(--rup-text);
            height: 100vh;
            display: flex;
            flex-direction: column;
            box-shadow: 4px 0 15px rgba(0,0,0,0.3);
            font-family: 'Inter', sans-serif;
            transition: transform 0.3s ease-in-out;
          }

          /* Logo Area */
          .sidebar-header {
            padding: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between; /* Adjusted for mobile close btn */
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }

          .brand-container {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .logo-box {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--rup-accent), #bfa14f);
            color: #1e1b4b;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 800;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
          }

          .brand-info { display: flex; flex-direction: column; justify-content: center; }
          .brand-name { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: 0.5px; }
          .brand-badge { font-size: 10px; font-weight: 600; text-transform: uppercase; color: var(--rup-accent); opacity: 0.9; margin-top: 2px; }

          /* Navigation */
          .nav-container { flex: 1; overflow-y: auto; padding: 20px 12px; }
          .nav-container::-webkit-scrollbar { width: 4px; }
          .nav-container::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

          .nav-section-label { padding: 15px 12px 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: rgba(255,255,255,0.3); letter-spacing: 1.2px; }

          .nav-item {
            display: flex; align-items: center; gap: 12px; padding: 12px 15px;
            color: var(--rup-text); text-decoration: none; border-radius: 8px;
            transition: all 0.2s ease; font-size: 14px; font-weight: 500;
            margin-bottom: 4px; border-left: 3px solid transparent;
          }

          .nav-item:hover { background: var(--rup-hover); color: #fff; padding-left: 18px; }
          
          .nav-item.active {
            background: rgba(212, 175, 55, 0.1); color: var(--rup-accent);
            font-weight: 600; border-left-color: var(--rup-accent);
          }
          .nav-item.active svg { filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.5)); }

          /* Footer */
          .logout-section { padding: 20px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); }
          .nav-item.logout { color: #ef4444; margin: 0; }
          .nav-item.logout:hover { background: rgba(239, 68, 68, 0.1); color: #fca5a5; }

          /* --- MOBILE RESPONSIVE STYLES --- */
          .mobile-toggle { display: none; }
          .mobile-close-btn { display: none; }
          .sidebar-overlay { display: none; }

          @media (max-width: 968px) {
            /* 1. Toggle Button (Visible only on mobile) */
            .mobile-toggle {
              display: flex;
              position: fixed;
              top: 15px;
              left: 15px;
              z-index: 1100;
              background: var(--rup-bg);
              color: var(--rup-accent);
              border: 1px solid rgba(255,255,255,0.1);
              padding: 10px;
              border-radius: 8px;
              cursor: pointer;
              box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            }

            /* 2. Sidebar Transform (Hidden by default) */
            .sidebar {
              position: fixed;
              left: 0;
              top: 0;
              height: 100vh;
              transform: translateX(-100%); /* Hide sidebar */
              z-index: 1200;
            }

            /* 3. Open State */
            .sidebar.open {
              transform: translateX(0);
            }

            /* 4. Overlay Background */
            .sidebar-overlay {
              display: block;
              position: fixed;
              top: 0; left: 0; width: 100%; height: 100%;
              background: rgba(0,0,0,0.6);
              backdrop-filter: blur(3px);
              z-index: 1150;
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.3s ease;
            }
            .sidebar-overlay.visible {
              opacity: 1;
              pointer-events: auto;
            }

            /* 5. Close Button inside Sidebar */
            .mobile-close-btn {
              display: block;
              background: none;
              border: none;
              color: rgba(255,255,255,0.5);
              cursor: pointer;
            }
          }
        `}
      </style>

      {/* Mobile Toggle Button */}
      <button className="mobile-toggle" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} 
        onClick={() => setIsOpen(false)}
      />

      <div className="sidebar-wrapper">
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
          
          {/* Header */}
          <div className="sidebar-header">
            <div className="brand-container">
              <div className="logo-box">R</div>
              <div className="brand-info">
                <span className="brand-name">SmartHR</span>
                <span className="brand-badge">{user.role} Portal</span>
              </div>
            </div>
            {/* Close Button (Mobile Only) */}
            <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <div className="nav-container">
            {activeSections.map((section, sIndex) => (
              <div key={sIndex}>
                <div className="nav-section-label">{section.label}</div>
                <nav>
                  {section.items.map((item, iIndex) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link 
                        to={item.path} 
                        key={iIndex} 
                        className={`nav-item ${isActive ? 'active' : ''}`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="logout-section">
            <Link to="/logout" className="nav-item logout">
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;