import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { 
  User, Lock, Bell, Building, Save, Camera, Globe, Moon 
} from 'lucide-react';

const Settings = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');

  // --- MOCK STATES ---
  const [profile, setProfile] = useState({ 
    name: user.name, 
    email: 'user@smarthr.com', 
    phone: '+91 98765 43210',
    bio: 'Senior Developer with 5 years of experience.'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    offers: true
  });

  // Admin Only Settings
  const [companySettings, setCompanySettings] = useState({
    name: 'SmartHR Solutions',
    wfhAllowed: true,
    ipRestriction: false
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="main-title">Account & System Settings</h2>
          <p className="sub-title">Manage your profile, security, and preferences.</p>
        </div>
      </div>

      <div className="settings-layout">
        
        {/* --- LEFT SIDEBAR: TABS --- */}
        <div className="glass-card settings-sidebar">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} 
            onClick={() => setActiveTab('profile')}
          >
            <User size={18}/> My Profile
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} 
            onClick={() => setActiveTab('security')}
          >
            <Lock size={18}/> Security
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`} 
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18}/> Notifications
          </button>

          {/* MANAGER ONLY TAB */}
          {user.role === 'Manager' && (
            <button 
              className={`tab-btn ${activeTab === 'company' ? 'active' : ''}`} 
              onClick={() => setActiveTab('company')}
            >
              <Building size={18}/> Company Settings
            </button>
          )}
        </div>

        {/* --- RIGHT SIDE: CONTENT AREA --- */}
        <div className="glass-card settings-content">
          
          {/* 1. PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="fade-in">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="profile-upload">
                <div className="avatar-large">{profile.name.charAt(0)}</div>
                <button className="btn-secondary"><Camera size={16}/> Change Photo</button>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="standard-input" 
                    value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="standard-input" value={profile.email} disabled style={{opacity: 0.7}} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" className="standard-input" 
                    value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" className="standard-input" value={user.role} disabled style={{opacity: 0.7}} />
                </div>
                <div className="form-group full">
                  <label>Bio</label>
                  <textarea className="standard-input" rows="3" 
                    value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})}></textarea>
                </div>
              </div>
            </div>
          )}

          {/* 2. SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="fade-in">
              <h3 className="section-title">Password & Security</h3>
              <div className="form-group" style={{maxWidth: '400px'}}>
                <label>Current Password</label>
                <input type="password" class="standard-input" placeholder="••••••••" />
              </div>
              <div className="form-group" style={{maxWidth: '400px'}}>
                <label>New Password</label>
                <input type="password" class="standard-input" placeholder="Enter new password" />
              </div>
              <div className="form-group" style={{maxWidth: '400px'}}>
                <label>Confirm Password</label>
                <input type="password" class="standard-input" placeholder="Confirm new password" />
              </div>
            </div>
          )}

          {/* 3. NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="fade-in">
              <h3 className="section-title">Preferences</h3>
              
              <div className="toggle-row">
                <div>
                  <h4>Email Alerts</h4>
                  <p>Receive daily summaries and leave updates via email.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={notifications.email} 
                    onChange={() => setNotifications({...notifications, email: !notifications.email})}/>
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="toggle-row">
                <div>
                  <h4>Browser Push Notifications</h4>
                  <p>Get real-time alerts on your desktop.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={notifications.browser} 
                    onChange={() => setNotifications({...notifications, browser: !notifications.browser})}/>
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          )}

          {/* 4. COMPANY SETTINGS (MANAGER ONLY) */}
          {activeTab === 'company' && user.role === 'Manager' && (
            <div className="fade-in">
              <h3 className="section-title">Global Configuration</h3>
              <div className="alert-box">
                Changes here will affect all employees in the organization.
              </div>

              <div className="form-group" style={{marginTop: '20px'}}>
                <label>Company Name</label>
                <input type="text" className="standard-input" 
                  value={companySettings.name} onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})} />
              </div>

              <div className="toggle-row">
                <div>
                  <h4>Allow Work From Home (WFH)</h4>
                  <p>Enable employees to mark attendance from remote locations.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={companySettings.wfhAllowed} 
                    onChange={() => setCompanySettings({...companySettings, wfhAllowed: !companySettings.wfhAllowed})}/>
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="toggle-row">
                <div>
                  <h4>Strict IP Restriction</h4>
                  <p>Only allow login from office network IPs.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={companySettings.ipRestriction} 
                    onChange={() => setCompanySettings({...companySettings, ipRestriction: !companySettings.ipRestriction})}/>
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          )}

          {/* GLOBAL SAVE BUTTON */}
          <div className="settings-footer">
            <button className="btn-action" onClick={handleSave}>
              <Save size={16}/> Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;