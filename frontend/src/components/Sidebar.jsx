import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // 1. Import User Context
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
  ShieldCheck, // Icon for Manager Portal
  Fingerprint
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUser(); // 2. Get current logged-in role

  // 3. Define the Menu with 'allowed' roles
  // Roles: 'Manager', 'TL', 'Employee'
  const sections = [
    {
      label: 'Main',
      items: [
        { 
          name: 'Dashboard', 
          path: '/', 
          icon: <LayoutDashboard size={18} />, 
          allowed: ['Manager', 'TL', 'Employee'] 
        },
        { 
        name: 'Team Lead Portal', 
        path: '/teamlead', 
        icon: <Users size={18} />, 
        allowed: ['TL'] // Only TLs see this specific view
      },
        { 
          name: 'HR Management', 
          path: '/hrManagement', 
          icon: <Fingerprint size={18} />, // This will now work!
          allowed: ['Manager', 'TL'] 
        },
        { 
          name: 'Employees Directory', 
          path: '/employees', 
          icon: <Users size={18} />, 
          allowed: ['Manager'] // Only Manager sees full directory
        },
        // NEW LINK: The Manager/TL Portal from your note
        { 
          name: 'Manager Portal', 
          path: '/manager', 
          icon: <ShieldCheck size={18} />, 
          allowed: ['Manager', 'TL'] // TLs and Managers see this
        },
      ]
    },
    {
      label: 'Operations',
      items: [
        { 
          name: 'Attendance', 
          path: '/attendance', 
          icon: <CalendarCheck size={18} />, 
          allowed: ['Manager', 'TL', 'Employee'] 
        },
        { 
          name: 'Task Management', 
          path: '/tasks', 
          icon: <ClipboardList size={18} />, 
          allowed: ['Manager', 'TL', 'Employee'] 
        },
        { 
          name: 'Payroll & Accounts', 
          path: '/payroll', 
          icon: <Banknote size={18} />, 
          allowed: ['Manager'] // STRICT: Manager Only
        },
        { 
          name: 'IT & Operations', 
          path: '/it', 
          icon: <Cpu size={18} />, 
          allowed: ['Manager'] // STRICT: Manager Only
        },
        { 
          name: 'Recruitment', 
          path: '/recruitment', 
          icon: <Briefcase size={18} />, 
          allowed: ['Manager'] 
        },
        { 
          name: 'Sales Pipeline', 
          path: '/sales', 
          icon: <TrendingUp size={18} />, 
          allowed: ['Manager', 'TL'] 
        },
      ]
    },
    {
      label: 'System',
      items: [
        { 
          name: 'Reports & PDF', 
          path: '/reports', 
          icon: <FileText size={18} />, 
          allowed: ['Manager', 'TL'] 
        },
        { 
          name: 'Settings', 
          path: '/settings', 
          icon: <Settings size={18} />, 
          allowed: ['Manager', 'TL', 'Employee'] 
        },
      ]
    }
  ];

  // 4. AUTOMATION LOGIC: Filter sections based on Role
  const activeSections = sections.map(section => ({
    ...section,
    // Keep only items where allowed roles include the current user role
    items: section.items.filter(item => item.allowed.includes(user.role))
  })).filter(section => section.items.length > 0); // Remove empty sections

  return (
    <aside className="sidebar">
      {/* Brand Logo Section */}
      <div className="sidebar-header">
        <div className="logo-circle">S</div>
        <div>
          <span className="brand-name">SmartHR</span>
          {/* Visual Indicator of who is logged in */}
          <div style={{fontSize: '10px', color:'#94a3b8', fontWeight:'600'}}>
             {user.role.toUpperCase()} VIEW
          </div>
        </div>
      </div>

      <div className="nav-container">
        {activeSections.map((section, sIndex) => (
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