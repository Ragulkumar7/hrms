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
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 2. Functionality: Handle Layout Changes
  useEffect(() => {
    // Remove previous layout classes from body
    layouts.forEach(l => document.body.classList.remove(`layout-${l.toLowerCase().replace(/\s+/g, '-')}`));
    
    // Add current layout class
    document.body.classList.add(`layout-${activeLayout.toLowerCase().replace(/\s+/g, '-')}`);
    
    // Example: Trigger specific Sidebar changes for "Mini"
    if (activeLayout === "Mini") {
      document.documentElement.style.setProperty('--sidebar-width', '80px');
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '250px');
    }
  }, [activeLayout]);

  // 3. Functionality: Reset Settings
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
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#ff9b44] text-white p-2 rounded-l-md shadow-lg z-[9999] hover:bg-[#e68a39] transition-colors"
      >
        <Settings size={24} className="animate-spin-slow" />
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[10000]" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-[10001] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">Theme Customizer</h2>
            <p className="text-xs text-gray-400">Choose your themes & layouts etc.</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-red-400 p-1">
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-5 overflow-y-auto h-[calc(100vh-130px)] space-y-8 scrollbar-hide">
          
          {/* Layout Section */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b dark:border-gray-700 pb-2">Select Layouts</h3>
            <div className="grid grid-cols-2 gap-3">
              {layouts.map((layout) => (
                <button 
                  key={layout} 
                  onClick={() => setActiveLayout(layout)}
                  className="group flex flex-col items-center"
                >
                  <div className={`w-full aspect-video rounded border-2 transition-all relative ${activeLayout === layout ? 'border-[#ff9b44] bg-orange-50 dark:bg-orange-900/20' : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 group-hover:border-gray-300'}`}>
                    {activeLayout === layout && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="text-[#ff9b44]" size={20} />
                      </div>
                    )}
                  </div>
                  <span className={`text-[11px] mt-1 font-medium ${activeLayout === layout ? 'text-[#ff9b44]' : 'text-gray-500'}`}>
                    {layout}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Color Mode */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b dark:border-gray-700 pb-2">Color Mode</h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="mode" 
                  className="w-4 h-4 accent-[#ff9b44]" 
                  checked={!isDarkMode}
                  onChange={() => setIsDarkMode(false)}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Light Mode</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="mode" 
                  className="w-4 h-4 accent-[#ff9b44]" 
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(true)}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
              </label>
            </div>
          </section>

          {/* Sidebar Color */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b dark:border-gray-700 pb-2">Sidebar Color</h3>
            <div className="flex gap-4">
               {[
                 { name: 'white', class: 'bg-white border-gray-200' },
                 { name: 'dark', class: 'bg-gray-800 border-transparent' },
                 { name: 'blue', class: 'bg-blue-900 border-transparent' }
               ].map((color) => (
                 <button
                   key={color.name}
                   onClick={() => setSidebarColor(color.name)}
                   className={`w-10 h-10 rounded-full border-4 transition-all shadow-sm ${color.class} ${sidebarColor === color.name ? 'ring-2 ring-[#ff9b44] border-white' : 'border-transparent'}`}
                 />
               ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 grid grid-cols-2 gap-3">
          <button 
            onClick={handleReset}
            className="py-2.5 text-xs font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 transition-colors uppercase"
          >
            Reset
          </button>
          <button className="py-2.5 text-xs font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 uppercase">
            Buy Product
          </button>
        </div>
      </div>
    </>
  );
};

export default ThemeCustomizer;