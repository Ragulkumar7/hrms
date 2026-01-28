import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Filter, MoreHorizontal, X, Briefcase 
} from 'lucide-react';

const Employees = () => {
  // State for List
  const [employees, setEmployees] = useState([
    { id: 'EMP001', name: 'Varshith', role: 'Sr. Developer', dept: 'Engineering', status: 'Active', joinDate: '2023-01-15' },
    { id: 'EMP002', name: 'Aditi Rao', role: 'UI/UX Designer', dept: 'Design', status: 'Active', joinDate: '2023-03-10' },
  ]);

  // State for Modal & New Employee Form
  const [showModal, setShowModal] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', role: '', dept: '', email: '', salary: '' });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newId = `EMP00${employees.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    
    const entry = {
      id: newId,
      name: newEmp.name,
      role: newEmp.role,
      dept: newEmp.dept,
      status: 'Active', // Default status for new hire
      joinDate: today
    };

    setEmployees([...employees, entry]);
    setShowModal(false);
    setNewEmp({ name: '', role: '', dept: '', email: '', salary: '' }); // Reset form
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="main-title">Employee Management</h2>
          <p className="sub-title">HR Portal: Hiring & Profile Management</p>
        </div>
        <div className="header-actions">
          {/* Trigger Modal */}
          <button className="btn-action" onClick={() => setShowModal(true)}>
            <UserPlus size={16}/> Add New Hire
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="glass-card">
        <div className="section-header">
          <h4><Users size={18} /> Team Directory</h4>
          <div className="search-box">
             <Search size={14} color="#999"/>
             <input type="text" placeholder="Search..." />
          </div>
        </div>

        <table className="custom-table">
          <thead>
            <tr><th>ID</th><th>Employee</th><th>Department</th><th>Joined</th><th>Status</th></tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={{ fontWeight: 'bold', color: '#64748b' }}>{emp.id}</td>
                <td>
                  <div style={{fontWeight: '600'}}>{emp.name}</div>
                  <div style={{fontSize: '12px', color: '#94a3b8'}}>{emp.role}</div>
                </td>
                <td><span className="badge-cfo" style={{background:'#f1f5f9', color:'#475569', border:'none'}}>{emp.dept}</span></td>
                <td>{emp.joinDate}</td>
                <td><span className="status-pill active">{emp.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ADD EMPLOYEE MODAL --- */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
        }}>
          <div className="glass-card" style={{ width: '450px', margin: 0, padding: '25px' }}>
            <div className="section-header">
              <h4><Briefcase size={18} /> Onboard New Employee</h4>
              <button onClick={() => setShowModal(false)} className="icon-btn-x"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleAddEmployee} className="form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{fontSize:'13px', color:'#64748b'}}>Full Name</label>
                <input type="text" className="admin-input" style={{width:'100%'}} required 
                   value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} />
              </div>
              
              <div style={{display:'flex', gap:'10px'}}>
                <div style={{flex:1}}>
                   <label style={{fontSize:'13px', color:'#64748b'}}>Role / Designation</label>
                   <input type="text" className="admin-input" style={{width:'100%'}} required 
                      value={newEmp.role} onChange={e => setNewEmp({...newEmp, role: e.target.value})} />
                </div>
                <div style={{flex:1}}>
                   <label style={{fontSize:'13px', color:'#64748b'}}>Department</label>
                   <select className="admin-input" style={{width:'100%'}} 
                      value={newEmp.dept} onChange={e => setNewEmp({...newEmp, dept: e.target.value})}>
                      <option value="">Select...</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                   </select>
                </div>
              </div>

              <div>
                <label style={{fontSize:'13px', color:'#64748b'}}>Base Salary (CTC)</label>
                <input type="number" className="admin-input" style={{width:'100%'}} placeholder="₹" 
                   value={newEmp.salary} onChange={e => setNewEmp({...newEmp, salary: e.target.value})} />
                <p style={{fontSize:'11px', color:'#94a3b8', marginTop:'5px'}}>* This data will automatically reflect in Accounts.</p>
              </div>

              <button type="submit" className="btn-action" style={{marginTop:'10px', justifyContent:'center'}}>Confirm Hiring</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;