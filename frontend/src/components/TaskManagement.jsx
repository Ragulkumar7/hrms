import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; 
import { 
  ClipboardList, Plus, Calendar, CheckCircle, Clock, 
  AlertCircle, Trash2, Filter, User 
} from 'lucide-react';

const TaskManagement = () => {
  const { user } = useUser();

  // --- MOCK DATA ---
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix Login Bug', assignedTo: 'Varshith', priority: 'High', deadline: '2026-02-01', status: 'Pending', description: 'Login fails when special characters are used.' },
    { id: 2, title: 'Design Dashboard', assignedTo: 'Aditi Rao', priority: 'Medium', deadline: '2026-02-05', status: 'In Progress', description: 'Create wireframes for the new admin panel.' },
    { id: 3, title: 'Server Maintenance', assignedTo: 'Sanjay', priority: 'Low', deadline: '2026-01-28', status: 'Completed', description: 'Routine check of AWS instances.' },
    { id: 4, title: 'Update API Docs', assignedTo: 'Varshith', priority: 'Medium', deadline: '2026-02-10', status: 'Pending', description: 'Document the new employee endpoints.' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', deadline: '', priority: 'Medium', description: '' });
  const [filter, setFilter] = useState('All');

  // --- LOGIC: FILTER TASKS BASED ON ROLE ---
  // Managers/TLs see ALL tasks. Employees see only THEIR tasks.
  const visibleTasks = tasks.filter(task => {
    const roleMatch = (user.role === 'Manager' || user.role === 'TL') ? true : task.assignedTo.includes(user.name) || task.assignedTo === 'Varshith'; // Mocking 'Varshith' as the logged-in employee for demo
    const statusMatch = filter === 'All' ? true : task.status === filter;
    return roleMatch && statusMatch;
  });

  // --- ACTIONS ---
  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'Pending'
    };
    setTasks([...tasks, task]);
    setShowModal(false);
    setNewTask({ title: '', assignedTo: '', deadline: '', priority: 'Medium', description: '' });
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  // Stats for the top cards
  const stats = {
    pending: visibleTasks.filter(t => t.status === 'Pending').length,
    progress: visibleTasks.filter(t => t.status === 'In Progress').length,
    completed: visibleTasks.filter(t => t.status === 'Completed').length,
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="main-title">Task Management</h2>
          <p className="sub-title">Track projects, deadlines, and individual workload.</p>
        </div>
        
        {/* Only Manager/TL can create tasks */}
        {(user.role === 'Manager' || user.role === 'TL') && (
          <div className="header-actions">
            <button className="btn-action" onClick={() => setShowModal(true)}>
              <Plus size={16}/> Assign New Task
            </button>
          </div>
        )}
      </div>

      {/* --- STATS ROW --- */}
      <div className="stats-grid">
        <div className="glass-card stat-item">
          <div className="icon-box orange"><AlertCircle size={20} /></div>
          <div><p className="stat-label">Pending</p><h3 className="stat-value">{stats.pending}</h3></div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box blue"><Clock size={20} /></div>
          <div><p className="stat-label">In Progress</p><h3 className="stat-value">{stats.progress}</h3></div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box green"><CheckCircle size={20} /></div>
          <div><p className="stat-label">Completed</p><h3 className="stat-value">{stats.completed}</h3></div>
        </div>
      </div>

      {/* --- TASK LIST SECTION --- */}
      <div className="glass-card">
        <div className="section-header">
          <h4><ClipboardList size={18} /> {user.role === 'Employee' ? 'My Assigned Tasks' : 'Team Task Board'}</h4>
          
          {/* Status Filter */}
          <div className="filter-wrapper">
             <Filter size={14} color="#64748b"/>
             <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
               <option value="All">All Status</option>
               <option value="Pending">Pending</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
             </select>
          </div>
        </div>

        <div className="task-grid">
          {visibleTasks.length > 0 ? (
            visibleTasks.map(task => (
              <div key={task.id} className={`task-card ${task.priority.toLowerCase()}-priority`}>
                <div className="task-header">
                  <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                  {(user.role === 'Manager' || user.role === 'TL') && (
                    <button className="delete-btn" onClick={() => handleDelete(task.id)}><Trash2 size={14}/></button>
                  )}
                </div>
                
                <h3 className="task-title">{task.title}</h3>
                <p className="task-desc">{task.description}</p>
                
                <div className="task-meta">
                  <div className="meta-item">
                    <User size={14}/> <span>{task.assignedTo}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={14}/> <span>{task.deadline}</span>
                  </div>
                </div>

                <div className="task-footer">
                  <label>Status:</label>
                  <select 
                    className={`status-select ${task.status.toLowerCase().replace(' ', '-')}`}
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No tasks found for this filter.</div>
          )}
        </div>
      </div>

      {/* --- ADD TASK MODAL (Manager Only) --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <div className="section-header">
              <h4>Assign New Task</h4>
              <button className="icon-btn-x" onClick={() => setShowModal(false)}><Plus size={20} style={{transform:'rotate(45deg)'}}/></button>
            </div>
            <form onSubmit={handleAddTask} className="task-form">
              <div className="form-group">
                <label>Task Title</label>
                <input type="text" required className="standard-input" 
                  value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Assign To</label>
                  <select className="standard-input" 
                    value={newTask.assignedTo} onChange={e => setNewTask({...newTask, assignedTo: e.target.value})}>
                    <option value="" disabled>Select Employee</option>
                    <option value="Varshith">Varshith</option>
                    <option value="Aditi Rao">Aditi Rao</option>
                    <option value="Sanjay">Sanjay</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select className="standard-input"
                    value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input type="date" required className="standard-input"
                   value={newTask.deadline} onChange={e => setNewTask({...newTask, deadline: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="standard-input" rows="3"
                   value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}></textarea>
              </div>
              <button type="submit" className="btn-action full-width">Assign Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;