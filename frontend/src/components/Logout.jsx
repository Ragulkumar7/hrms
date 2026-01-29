import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear your authentication data
    localStorage.clear(); 
    console.log("User logged out successfully");

    // 2. Redirect to the admin/login page
    navigate('/');
  };

  const handleCancel = () => {
    // Takes the user back to the previous page they were on
    navigate(-1);
  };

  return (
    <div style={styles.contentWrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Are you sure you want to logout?</h2>
        
        <div style={styles.buttonGroup}>
          <button 
            onClick={handleLogout} 
            style={styles.yesButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#c82333')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
          >
            Yes 
          </button>

          <button 
            onClick={handleCancel} 
            style={styles.noButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#e2e8f0')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#f8fafc')}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    width: '100%',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    maxWidth: '450px',
    width: '90%',
    border: '1px solid #eef2f1',
  },
  heading: {
    color: '#333',
    marginBottom: '30px',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  yesButton: {
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#4C1D95',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  noButton: {
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#475569',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

export default Logout;