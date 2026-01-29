import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; 
import { 
  ClipboardList, Plus, Calendar, CheckCircle, Clock, 
  AlertCircle, Trash2, Filter, User, X
} from 'lucide-react';

const TaskManagement = () => {
  const { user } = useUser();

  // --- MOCK DATA ---
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix Login Bug', assignedTo: 'Varshith', department: 'IT', priority: 'High', deadline: '2026-02-01', status: 'Pending', description: 'Login fails when special characters are used.' },
    { id: 2, title: 'Design Dashboard', assignedTo: 'Aditi Rao', department: 'Design', priority: 'Medium', deadline: '2026-02-05', status: 'In Progress', description: 'Create wireframes for the new admin panel.' },
    { id: 3, title: 'Server Maintenance', assignedTo: 'Sanjay', department: 'IT', priority: 'Low', deadline: '2026-01-28', status: 'Completed', description: 'Routine check of AWS instances.' },
    { id: 4, title: 'Update API Docs', assignedTo: 'Varshith', department: 'IT', priority: 'Medium', deadline: '2026-02-10', status: 'Pending', description: 'Document the new employee endpoints.' },
  ]);

  const employeesByDept = {
    IT: ['Varshith', 'Sanjay', 'Rahul'],
    Design: ['Aditi Rao', 'Meera'],
    Accounts: ['Priya', 'Amit'],
    HR: ['Kavya', 'Deepak']
  };

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', department: '', deadline: '', priority: 'Medium', description: '' });
  const [filter, setFilter] = useState('All');

  const visibleTasks = tasks.filter(task => {
    const roleMatch = (user?.role === 'Manager' || user?.role === 'TL') ? true : task.assignedTo.includes(user?.name) || task.assignedTo === 'Varshith';
    const statusMatch = filter === 'All' ? true : task.status === filter;
    return roleMatch && statusMatch;
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = { id: tasks.length + 1, ...newTask, status: 'Pending' };
    setTasks([...tasks, task]);
    setShowModal(false);
    setNewTask({ title: '', assignedTo: '', department: '', deadline: '', priority: 'Medium', description: '' });
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const stats = {
    pending: visibleTasks.filter(t => t.status === 'Pending').length,
    progress: visibleTasks.filter(t => t.status === 'In Progress').length,
    completed: visibleTasks.filter(t => t.status === 'Completed').length,
  };

  return (
    <div className="task-page-container">
      <style>{`
        .task-page-container { padding: 20px; max-width: 1400px; margin: 0 auto; }
        
        /* Stats Alignment */
        .stats-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
          gap: 20px; 
          margin-bottom: 30px; 
        }

        /* Task Grid Responsiveness */
        .task-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        /* Priority Badge Fix */
        .priority-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          height: 24px;
        }
        .priority-badge.high { background: #fee2e2; color: #ef4444; }
        .priority-badge.medium { background: #fef3c7; color: #f59e0b; }
        .priority-badge.low { background: #dcfce7; color: #10b981; }

        /* Modal Centering Fix */
        .modal-overlay {
          position: fixed; 
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6); 
          display: flex; 
          justify-content: center; 
          align-items: center; /* Ensures vertical center on all screens */
          z-index: 9999;
          padding: 20px;
        }
        .modal-content {
          background: white;
          width: 100%;
          max-width: 550px;
          border-radius: 20px;
          padding: 30px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          max-height: 90vh;
          overflow-y: auto;
        }

        .close-btn-fixed {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #f1f5f9;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          color: #64748b;
          display: flex;
          transition: 0.2s;
        }
        .close-btn-fixed:hover { background: #fee2e2; color: #ef4444; }

        @media (max-width: 768px) {
          .task-page-container { padding: 15px; }
          .task-grid { grid-template-columns: 1fr; }
          .modal-content { padding: 20px; border-radius: 15px; }
          .form-row { grid-template-columns: 1fr !important; gap: 10px !important; }
          .page-header { flex-direction: column; align-items: flex-start !important; gap: 15px; }
          .header-actions { width: 100%; }
          .btn-action { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 className="main-title" style={{ fontSize: '24px', fontWeight: '800' }}>Task Management</h2>
          <p className="sub-title" style={{ color: '#64748b' }}>Track projects, departments, and team workload.</p>
        </div>
        
        {(user?.role === 'Manager' || user?.role === 'TL') && (
          <div className="header-actions">
            <button className="btn-action" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#FF9B44', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
              <Plus size={18}/> Assign New Task
            </button>
          </div>
        )}
      </div>

      {/* --- STATS --- */}
      <div className="stats-grid">
        <div className="glass-card stat-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', background: 'white', borderRadius: '15px', border: '1px solid #f1f5f9' }}>
          <div className="icon-box orange" style={{ background: '#fff7ed', padding: '12px', borderRadius: '12px', color: '#ea580c' }}><AlertCircle size={22} /></div>
          <div><p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Pending</p><h3 style={{ margin: 0, fontSize: '20px' }}>{stats.pending}</h3></div>
        </div>
        <div className="glass-card stat-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', background: 'white', borderRadius: '15px', border: '1px solid #f1f5f9' }}>
          <div className="icon-box blue" style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', color: '#2563eb' }}><Clock size={22} /></div>
          <div><p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>In Progress</p><h3 style={{ margin: 0, fontSize: '20px' }}>{stats.progress}</h3></div>
        </div>
        <div className="glass-card stat-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', background: 'white', borderRadius: '15px', border: '1px solid #f1f5f9' }}>
          <div className="icon-box green" style={{ background: '#f0fdf4', padding: '12px', borderRadius: '12px', color: '#16a34a' }}><CheckCircle size={22} /></div>
          <div><p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Completed</p><h3 style={{ margin: 0, fontSize: '20px' }}>{stats.completed}</h3></div>
        </div>
      </div>

      {/* --- BOARD --- */}
      <div className="glass-card" style={{ background: 'white', borderRadius: '20px', padding: '25px', border: '1px solid #f1f5f9' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><ClipboardList size={20} /> Team Task Board</h4>
          <div className="filter-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px 12px', borderRadius: '10px' }}>
             <Filter size={16} color="#64748b"/>
             <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
               <option value="All">All Status</option>
               <option value="Pending">Pending</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
             </select>
          </div>
        </div>

        <div className="task-grid">
          {visibleTasks.map(task => (
            <div key={task.id} style={{ border: '1px solid #f1f5f9', borderRadius: '16px', padding: '20px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                <button onClick={() => handleDelete(task.id)} style={{ border: 'none', background: 'none', color: '#f87171', cursor: 'pointer' }}><Trash2 size={16}/></button>
              </div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '17px', fontWeight: '700' }}>{task.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px 0', lineHeight: '1.5' }}>{task.description}</p>
              
              <div style={{ fontSize: '13px', color: '#1e293b', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={14} color="#64748b"/> {task.assignedTo} ({task.department})</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={14} color="#64748b"/> Deadline: {task.deadline}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '15px', borderTop: '1px solid #f8fafc' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Status:</span>
                <select 
                  value={task.status} 
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                  style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: '600' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- ADD TASK MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn-fixed" onClick={() => setShowModal(false)}><X size={20}/></button>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '20px', fontWeight: '800' }}>Assign New Task</h3>
            
            <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Task Title</label>
                <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} 
                  value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Department</label>
                  <select required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                    value={newTask.department} onChange={e => setNewTask({...newTask, department: e.target.value, assignedTo: ''})}>
                    <option value="" disabled>Select Dept</option>
                    {Object.keys(employeesByDept).map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Assign To</label>
                  <select required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                    disabled={!newTask.department}
                    value={newTask.assignedTo} onChange={e => setNewTask({...newTask, assignedTo: e.target.value})}>
                    <option value="" disabled>Select Employee</option>
                    {newTask.department && employeesByDept[newTask.department].map(emp => <option key={emp} value={emp}>{emp}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Priority</label>
                  <select style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                    value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Deadline</label>
                  <input type="date" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                    value={newTask.deadline} onChange={e => setNewTask({...newTask, deadline: e.target.value})} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Description</label>
                <textarea rows="3" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                   value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}></textarea>
              </div>

              <button type="submit" style={{ padding: '15px', background: '#FF9B44', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '15px' }}>
                Assign Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;