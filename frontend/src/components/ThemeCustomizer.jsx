import React, { useState, useEffect } from 'react';
import { Settings, X, Check } from 'lucide-react';

const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // State for functionality
  const [activeLayout, setActiveLayout] = useState("Default");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarColor, setSidebarColor] = useState("white");

  const layouts = [
    "Default", "Mini", "Horizontal", "Horizontal Single", 
    "Detached", "Two Column", "Without Header", "Overlay", 
    "Menu Aside", "Menu Stacked", "Modern", "Transparent"
  ];

  // 1. Functionality: Handle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // 2. Functionality: Handle Layout Changes
  useEffect(() => {
    // Remove previous layout classes
    layouts.forEach(l => document.body.classList.remove(`layout-${l.toLowerCase().replace(/\s+/g, '-')}`));
    
    // Add current layout class
    const layoutClass = `layout-${activeLayout.toLowerCase().replace(/\s+/g, '-')}`;
    document.body.classList.add(layoutClass);
    
    // Update Sidebar Variable for CSS
    if (activeLayout === "Mini") {
      document.documentElement.style.setProperty('--sidebar-width', '80px');
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '250px');
    }
  }, [activeLayout]);

  // 3. Reset Settings
  const handleReset = () => {
    setActiveLayout("Default");
    setIsDarkMode(false);
    setSidebarColor("white");
  };

  return (
    <>
      {/* Floating Settings Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="theme-float-btn"
      >
        <Settings size={24} className="spin-icon" />
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="theme-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Side Panel */}
      <div className={`theme-panel ${isOpen ? 'open' : ''}`}>
        
        {/* Header */}
        <div className="theme-header">
          <div>
            <h2>Theme Customizer</h2>
            <p>Choose your themes & layouts</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="theme-body">
          
          {/* Layout Section */}
          <section className="theme-section">
            <h3>SELECT LAYOUTS</h3>
            <div className="layout-grid">
              {layouts.map((layout) => (
                <button 
                  key={layout} 
                  onClick={() => setActiveLayout(layout)}
                  className={`layout-btn ${activeLayout === layout ? 'active' : ''}`}
                >
                  <div className="layout-preview">
                    {activeLayout === layout && <Check size={20} className="check-icon" />}
                  </div>
                  <span>{layout}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Color Mode */}
          <section className="theme-section">
            <h3>COLOR MODE</h3>
            <div className="mode-toggles">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="mode" 
                  checked={!isDarkMode}
                  onChange={() => setIsDarkMode(false)}
                />
                Light Mode
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="mode" 
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(true)}
                />
                Dark Mode
              </label>
            </div>
          </section>

          {/* Sidebar Color */}
          <section className="theme-section">
            <h3>SIDEBAR COLOR</h3>
            <div className="color-options">
               {[
                 { name: 'white', color: '#ffffff' },
                 { name: 'dark', color: '#1f2937' },
                 { name: 'blue', color: '#1e3a8a' }
               ].map((c) => (
                 <button
                   key={c.name}
                   onClick={() => setSidebarColor(c.name)}
                   className={`color-btn ${sidebarColor === c.name ? 'active' : ''}`}
                   style={{backgroundColor: c.color}}
                 />
               ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="theme-footer">
          <button onClick={handleReset} className="reset-btn">RESET</button>
          <button className="buy-btn">BUY PRODUCT</button>
        </div>
      </div>
    </>
  );
};

export default ThemeCustomizer;