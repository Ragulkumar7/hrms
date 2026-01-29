  import React, { useState } from 'react';
  import { 
    Users, UserPlus, Search, Briefcase, X, Calendar, Filter 
  } from 'lucide-react';

  const Employees = () => {
    // --- STATE ---
    const [employees, setEmployees] = useState([
      { id: 'EMP001', name: 'Varshith', role: 'Sr. Developer', dept: 'Engineering', status: 'Active', joinDate: '2023-01-15', email: 'varshith@smarthr.com' },
      { id: 'EMP002', name: 'Aditi Rao', role: 'UI/UX Designer', dept: 'Design', status: 'Active', joinDate: '2023-03-10', email: 'aditi@smarthr.com' },
      { id: 'EMP003', name: 'Sanjay Kumar', role: 'DevOps Engineer', dept: 'Engineering', status: 'On Leave', joinDate: '2023-06-22', email: 'sanjay@smarthr.com' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newEmp, setNewEmp] = useState({ 
      customId: '', name: '', role: '', dept: '', joinDate: '', email: '', salary: '' 
    });

    // --- HANDLERS ---
    const handleAddEmployee = (e) => {
      e.preventDefault();
      const finalId = newEmp.customId || `EMP00${employees.length + 1}`;
      const finalDate = newEmp.joinDate || new Date().toISOString().split('T')[0];
      
      const entry = {
        id: finalId,
        name: newEmp.name,
        role: newEmp.role,
        dept: newEmp.dept,
        status: 'Active', 
        joinDate: finalDate,
        email: newEmp.email || `${newEmp.name.split(' ')[0].toLowerCase()}@smarthr.com`
      };

      setEmployees([...employees, entry]);
      setShowModal(false);
      setNewEmp({ customId: '', name: '', role: '', dept: '', joinDate: '', email: '', salary: '' }); 
    };

    return (
      <div className="fade-in">
        
        {/* --- PREMIUM RESPONSIVE CSS --- */}
        <style>
          {`
            :root {
              --primary-purple: #4C1D95;
              --text-dark: #1E293B;
              --text-grey: #64748B;
              --border-color: #E2E8F0;
              --card-radius: 16px;
            }

            /* Header */
            .page-header {
              display: flex; justify-content: space-between; align-items: flex-end;
              margin-bottom: 24px; flex-wrap: wrap; gap: 16px;
            }
            .main-title { font-size: 24px; font-weight: 800; color: var(--text-dark); margin: 0 0 6px 0; }
            .sub-title { font-size: 14px; color: var(--text-grey); margin: 0; }

            /* Controls Bar */
            .controls-bar {
              background: white; padding: 16px; border-radius: 16px;
              border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02);
              display: flex; justify-content: space-between; align-items: center; gap: 16px;
              margin-bottom: 24px; flex-wrap: wrap;
            }
            
            .search-wrap {
              position: relative; flex: 1; min-width: 250px;
            }
            .search-input {
              width: 100%; padding: 10px 10px 10px 40px; border-radius: 10px;
              border: 1px solid var(--border-color); font-size: 14px; outline: none;
              transition: border 0.2s; color: var(--text-dark);
            }
            .search-input:focus { border-color: var(--primary-purple); }
            .search-icon { position: absolute; left: 12px; top: 11px; color: #94A3B8; }

            .btn-primary {
              background: var(--primary-purple); color: white; padding: 10px 20px;
              border-radius: 10px; border: none; font-weight: 700; font-size: 13px;
              display: flex; align-items: center; gap: 8px; cursor: pointer;
              transition: all 0.2s; white-space: nowrap;
            }
            .btn-primary:hover { background: #3C157A; transform: translateY(-1px); }

            /* Responsive Table Container */
            .table-container {
              background: white; border-radius: 16px; border: 1px solid var(--border-color);
              box-shadow: 0 4px 20px rgba(0,0,0,0.03); overflow: hidden;
            }
            .table-scroll { overflow-x: auto; } /* Key for mobile responsiveness */

            .custom-table { width: 100%; border-collapse: collapse; min-width: 700px; }
            .custom-table th {
              text-align: left; padding: 16px 24px; background: #F8FAFC;
              color: var(--text-grey); font-size: 12px; font-weight: 700; text-transform: uppercase;
              border-bottom: 1px solid var(--border-color); white-space: nowrap;
            }
            .custom-table td {
              padding: 16px 24px; border-bottom: 1px solid #F1F5F9;
              color: var(--text-dark); font-size: 14px; font-weight: 500;
            }
            .custom-table tr:last-child td { border-bottom: none; }
            .custom-table tr:hover { background: #FAFAFA; }

            /* Badges */
            .badge-dept { 
              background: #F3E8FF; color: #7C3AED; padding: 4px 10px; 
              border-radius: 20px; font-size: 12px; font-weight: 600; 
            }
            .badge-status { 
              padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase;
            }
            .status-active { background: #DCFCE7; color: #166534; }
            .status-leave { background: #FFEDD5; color: #C2410C; }

            /* Modal Overlay */
            .modal-overlay {
              position: fixed; top: 0; left: 0; width: 100%; height: 100%;
              background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(5px);
              display: flex; justify-content: center; align-items: center; z-index: 1200;
              padding: 20px;
            }
            .modal-card {
              background: white; width: 100%; max-width: 550px;
              border-radius: 20px; padding: 30px;
              box-shadow: 0 20px 50px rgba(0,0,0,0.2);
              animation: slideUp 0.3s ease-out;
              max-height: 90vh; overflow-y: auto; /* Scrollable on small screens */
            }
            @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

            /* Form Styles */
            .form-group { margin-bottom: 16px; }
            .form-label { display: block; font-size: 12px; font-weight: 700; color: var(--text-grey); margin-bottom: 6px; }
            .form-input {
              width: 100%; padding: 12px; border-radius: 10px;
              border: 1px solid #CBD5E1; font-size: 14px;
              transition: border 0.2s;
            }
            .form-input:focus { border-color: var(--primary-purple); outline: none; }
            .form-row { display: flex; gap: 16px; }
            
            @media (max-width: 600px) {
              .form-row { flex-direction: column; gap: 16px; }
              .controls-bar { flex-direction: column; align-items: stretch; }
              .btn-primary { justify-content: center; }
            }
          `}
        </style>

        {/* --- HEADER --- */}
        <div className="page-header">
          <div>
            <h2 className="main-title">Employee Directory</h2>
            <p className="sub-title">Manage your workforce, track status & hiring.</p>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <UserPlus size={18}/> Add New Employee
          </button>
        </div>

        {/* --- CONTROLS --- */}
        <div className="controls-bar">
          <div className="search-wrap">
            <Search size={18} className="search-icon"/>
            <input type="text" className="search-input" placeholder="Search by name, ID, or role..." />
          </div>
          <button className="btn-primary" style={{background:'white', color:'#64748B', border:'1px solid #E2E8F0'}}>
            <Filter size={16}/> Filter
          </button>
        </div>

        {/* --- TABLE (Responsive) --- */}
        <div className="table-container">
          <div className="table-scroll">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>Employee Profile</th>
                  <th>Department</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td style={{fontWeight:'700', color:'var(--primary-purple)'}}>{emp.id}</td>
                    <td>
                      <div style={{fontWeight:'700', color:'#1E293B'}}>{emp.name}</div>
                      <div style={{fontSize:'12px', color:'#64748B', marginTop:'2px'}}>{emp.role}</div>
                    </td>
                    <td><span className="badge-dept">{emp.dept}</span></td>
                    <td>{emp.joinDate}</td>
                    <td>
                      <span className={`badge-status ${emp.status === 'Active' ? 'status-active' : 'status-leave'}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td style={{fontSize:'12px', color:'#64748B'}}>{emp.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- MODAL --- */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-card">
              
              {/* Modal Header */}
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px'}}>
                <h3 style={{margin:0, fontSize:'20px', fontWeight:'800', color:'#1E293B'}}>Onboard New Hire</h3>
                <button onClick={() => setShowModal(false)} style={{background:'none', border:'none', cursor:'pointer', color:'#94A3B8'}}>
                  <X size={24}/>
                </button>
              </div>

              <form onSubmit={handleAddEmployee}>
                
                {/* ID & Date Row */}
                <div className="form-row">
                  <div className="form-group" style={{flex:1}}>
                    <label className="form-label">Employee ID (Optional)</label>
                    <input 
                      type="text" className="form-input" placeholder="Auto-generated if empty"
                      value={newEmp.customId} onChange={e => setNewEmp({...newEmp, customId: e.target.value})}
                    />
                  </div>
                  <div className="form-group" style={{flex:1}}>
                    <label className="form-label">Joining Date</label>
                    <input 
                      type="date" className="form-input" required
                      value={newEmp.joinDate} onChange={e => setNewEmp({...newEmp, joinDate: e.target.value})}
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" className="form-input" placeholder="e.g. John Doe" required
                    value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})}
                  />
                </div>

                {/* Role & Dept Row */}
                <div className="form-row">
                  <div className="form-group" style={{flex:1}}>
                    <label className="form-label">Designation</label>
                    <input 
                      type="text" className="form-input" placeholder="e.g. Senior Developer" required
                      value={newEmp.role} onChange={e => setNewEmp({...newEmp, role: e.target.value})}
                    />
                  </div>
                  <div className="form-group" style={{flex:1}}>
                    <label className="form-label">Department</label>
                    <select 
                      className="form-input" required
                      value={newEmp.dept} onChange={e => setNewEmp({...newEmp, dept: e.target.value})}
                    >
                      <option value="">Select...</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>
                </div>

                {/* Salary */}
                <div className="form-group">
                  <label className="form-label">Annual Salary (CTC)</label>
                  <input 
                    type="number" className="form-input" placeholder="₹ 0.00"
                    value={newEmp.salary} onChange={e => setNewEmp({...newEmp, salary: e.target.value})}
                  />
                </div>

                {/* Actions */}
                <div style={{display:'flex', gap:'10px', marginTop:'30px'}}>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #E2E8F0', background:'white', fontWeight:'700', cursor:'pointer', color:'#64748B'}}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{flex:1, justifyContent:'center', fontSize:'14px'}}
                  >
                    Confirm Onboarding
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    );
  };

  export default Employees;