import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear your authentication data
    localStorage.clear(); 
    console.log("User logged out successfully");

    // 2. Redirect to the main dashboard/admin page
    navigate('/');
  };

  return (
    <div style={styles.contentWrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Are you sure you want to logout?</h2>
        <button 
          onClick={handleLogout} 
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#c82333')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  contentWrapper: {
    // This allows the Sidebar to stay visible 
    // while centering the card in the main area
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh', // Takes up the vertical space of the content area
    width: '100%',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    border: '1px solid #eef2f1',
  },
  heading: {
    color: '#333',
    marginBottom: '30px',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  button: {
    padding: '12px 40px',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

export default Logout;