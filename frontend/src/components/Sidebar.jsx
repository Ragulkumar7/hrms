import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  // Unified navigation structure with Categories
  const sections = [
    {
      label: 'Main',
      items: [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
        { name: 'Employees', path: '/employees', icon: <Users size={18} /> },
      ]
    },
    {
      label: 'Operations',
      items: [
        { name: 'Attendance', path: '/attendance', icon: <CalendarCheck size={18} /> },      // Section 3
        { name: 'Task Management', path: '/tasks', icon: <ClipboardList size={18} /> },     // Section 4
        { name: 'Payroll & Accounts', path: '/payroll', icon: <Banknote size={18} /> },     // Section 5
        { name: 'IT & Operations', path: '/it', icon: <Cpu size={18} /> },                  // Section 6
        { name: 'Recruitment', path: '/recruitment', icon: <Briefcase size={18} /> },
        { name: 'Sales Pipeline', path: '/sales', icon: <TrendingUp size={18} /> },
      ]
    },
    {
      label: 'System',
      items: [
        { name: 'Reports & PDF', path: '/reports', icon: <FileText size={18} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Logo Section */}
      <div className="sidebar-header">
        <div className="logo-circle">S</div>
        <span className="brand-name">SmartHR</span>
      </div>

      <div className="nav-container">
        {sections.map((section, sIndex) => (
          <div key={sIndex} className="nav-section">
            <p className="nav-section-label">{section.label}</p>
            <nav className="nav-menu">
              {section.items.map((item, iIndex) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link 
                    to={item.path} 
                    key={iIndex} 
                    className={`nav-item ${isActive ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
        
        {/* Logout at bottom */}
        <div className="nav-menu" style={{marginTop: 'auto', paddingBottom: '20px'}}>
           <Link to="/logout" className="nav-item logout">
             <LogOut size={18} />
             <span>Logout</span>
           </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;