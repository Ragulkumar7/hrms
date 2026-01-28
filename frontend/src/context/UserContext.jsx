import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const UserContext = createContext();

// 2. Create the Provider Component
export const UserProvider = ({ children }) => {
  // Default User State (Start as Manager to see everything)
  const [user, setUser] = useState({ 
    name: 'Admin User', 
    role: 'Manager', // OPTIONS: 'Manager', 'TL', 'Employee'
    id: 'M-001' 
  });

  // Function to switch roles (Simulate Login)
  const login = (role, id = 'EMP-001') => {
    let name = 'Employee User';
    if (role === 'Manager') name = 'Admin User';
    if (role === 'TL') name = 'Karthik (TL)';

    setUser({ name, role, id });
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom Hook to use the context easily
export const useUser = () => useContext(UserContext);