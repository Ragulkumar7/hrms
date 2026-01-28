import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; 
import { 
  Users, UserMinus, ArrowRightLeft, Lock, ChevronDown, ChevronRight, 
  Gift, UserPlus, AlertTriangle, FileWarning, CheckCircle
} from 'lucide-react';

const ManagerDashboard = () => {
  const { user } = useUser(); 
  
  // 1. "New Emp Comes (HR)" - This simulates the pool of people HR added but aren't assigned yet
  const [unassigned, setUnassigned] = useState([
    { id: 'EMP-NEW-1', name: 'Rohan (New)', role: 'Jr. Dev', joined: 'Yesterday' }
  ]);

  // 2. Existing Teams
  const [teamData, setTeamData] = useState([
    { 
      id: 'TL-01', name: 'Karthik (TL)', 
      members: [
        { id: 'E-101', name: 'Varshith', role: 'Dev', efficiency: 92, status: 'Active' },
        { id: 'E-102', name: 'Aditi Rao', role: 'Designer', efficiency: 88, status: 'Active' }
      ]
    },
    { 
      id: 'TL-02', name: 'Sarah (TL)', 
      members: [
        { id: 'E-103', name: 'Sanjay', role: 'DevOps', efficiency: 45, status: 'Active' } // Low efficiency
      ]
    }
  ]);

  // 3. "Automate Wishes" - Mock Data for upcoming events
  const upcomingEvents = [
    { id: 1, name: 'Varshith', type: 'Birthday', date: 'Today', status: 'Auto-Sent' },
    { id: 2, name: 'Sarah (TL)', type: 'Work Anniversary', date: 'Tomorrow', status: 'Scheduled' }
  ];

  const [expandedTL, setExpandedTL] = useState(null);

  // --- ACTIONS ---

  // Assign New Hire to a TL
  const handleAssign = (empId, tlId) => {
    if (!tlId) return;
    const employee = unassigned.find(e => e.id === empId);
    
    // Add to Team
    setTeamData(teamData.map(tl => {
      if (tl.id === tlId) {
        return { ...tl, members: [...tl.members, { ...employee, efficiency: 100, status: 'Active' }] };
      }
      return tl;
    }));

    // Remove from Unassigned
    setUnassigned(unassigned.filter(e => e.id !== empId));
  };

  // "Put Paper" Logic (Performance Low)
  const handlePutPaper = (tlId, empId) => {
    if (window.confirm("Low Performance detected. Initiate 'Put Paper' (Notice Period) protocol?")) {
      setTeamData(teamData.map(tl => {
        if (tl.id === tlId) {
          return {
            ...tl,
            members: tl.members.map(m => 
              m.id === empId ? { ...m, status: 'Notice Period', efficiency: 0 } : m
            )
          };
        }
        return tl;
      }));
    }
  };

  // Filter View based on Role
  const visibleTeams = user.role === 'TL' 
    ? teamData.filter(tl => tl.id === 'TL-01') 
    : teamData; 

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="main-title">{user.role === 'Manager' ? 'Global Manager Portal' : 'Team Lead Dashboard'}</h2>
          <p className="sub-title">Performance, Allocations & Automation</p>
        </div>
      </div>

      {/* --- SECTION 1: AUTOMATED WISHES (From Note) --- */}
      <div className="glass-card" style={{background: 'linear-gradient(to right, #fff, #fefce8)'}}>
        <div className="section-header" style={{border: 'none', marginBottom: '10px'}}>
          <h4 style={{color: '#d97706'}}><Gift size={18} /> Automated Wishes & Events</h4>
          <span className="badge-cfo" style={{background:'#fff', border:'1px solid #fcd34d'}}>System Active</span>
        </div>
        <div style={{display:'flex', gap:'20px'}}>
          {upcomingEvents.map(event => (
            <div key={event.id} style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'13px', background:'white', padding:'8px 12px', borderRadius:'8px', border:'1px solid #fde68a'}}>
              <div className="avatar-small" style={{background:'#fef3c7', color:'#d97706'}}>{event.name[0]}</div>
              <div>
                <strong>{event.name}</strong> • {event.type} ({event.date})
                <div style={{color:'#16a34a', fontSize:'11px', display:'flex', alignItems:'center', gap:'4px'}}>
                   <CheckCircle size={10}/> {event.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 2: NEW HIRES (Unassigned Pool) --- */}
      {user.role === 'Manager' && unassigned.length > 0 && (
        <div className="glass-card" style={{border:'1px dashed #2563eb'}}>
          <div className="section-header">
            <h4 style={{color: '#2563eb'}}><UserPlus size={18} /> New Hires (From HR)</h4>
            <span style={{fontSize:'12px', color:'#64748b'}}>Assign to a Team Lead</span>
          </div>
          {unassigned.map(emp => (
            <div key={emp.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px', background:'#eff6ff', borderRadius:'6px'}}>
              <div>
                <strong>{emp.name}</strong> <span style={{fontSize:'12px', color:'#64748b'}}>({emp.role})</span>
                <span style={{marginLeft:'10px', fontSize:'11px', background:'white', padding:'2px 6px', borderRadius:'4px'}}>Joined: {emp.joined}</span>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <span style={{fontSize:'12px'}}>Assign to:</span>
                <select 
                  className="admin-input" 
                  style={{padding:'5px'}}
                  onChange={(e) => handleAssign(emp.id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select TL...</option>
                  {teamData.map(tl => <option key={tl.id} value={tl.id}>{tl.name}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- SECTION 3: TEAM HIERARCHY & PERFORMANCE --- */}
      <div className="glass-card">
        <div className="section-header">
          <h4><Users size={18} /> Team Structure & Efficiency</h4>
        </div>

        {visibleTeams.map(tl => (
          <div key={tl.id} style={{marginBottom:'20px', border:'1px solid #eee', borderRadius:'8px', overflow:'hidden'}}>
            
            {/* TL Header */}
            <div 
              onClick={() => setExpandedTL(expandedTL === tl.id ? null : tl.id)}
              style={{padding:'15px', background:'#f8fafc', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center'}}
            >
              <div style={{fontWeight:'bold'}}>{tl.name} <span style={{fontSize:'12px', color:'#666'}}>({tl.members.length} Members)</span></div>
              {expandedTL === tl.id ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
            </div>
            
            {/* Members Table */}
            {expandedTL === tl.id && (
              <table className="custom-table" style={{borderTop:'1px solid #eee'}}>
                <thead>
                  <tr><th>Employee</th><th>Efficiency %</th><th>Status</th><th>Manager Action</th></tr>
                </thead>
                <tbody>
                  {tl.members.map(emp => (
                    <tr key={emp.id} style={{background: emp.status === 'Notice Period' ? '#fff1f2' : 'transparent'}}>
                      <td>
                        {emp.name}<br/><span style={{fontSize:'11px', color:'#888'}}>{emp.role}</span>
                      </td>
                      
                      {/* Efficiency Bar */}
                      <td>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                           <div style={{width:'100px', height:'6px', background:'#eee', borderRadius:'4px'}}>
                             <div style={{width: `${emp.efficiency}%`, height:'100%', background: emp.efficiency < 50 ? '#dc2626' : '#16a34a'}}></div>
                           </div>
                           <span style={{fontSize:'11px', fontWeight:'bold', color: emp.efficiency < 50 ? '#dc2626' : '#16a34a'}}>
                             {emp.efficiency}%
                           </span>
                        </div>
                        {emp.efficiency < 50 && emp.status === 'Active' && (
                          <span style={{fontSize:'10px', color:'#dc2626', display:'flex', alignItems:'center', gap:'3px', marginTop:'3px'}}>
                            <AlertTriangle size={10}/> Low Efficiency
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`status-pill ${emp.status === 'Active' ? 'active' : 'rejected'}`}>
                          {emp.status}
                        </span>
                      </td>

                      {/* Actions: Shuffle & Put Paper */}
                      <td>
                        {user.role === 'Manager' ? (
                          <div style={{display:'flex', gap:'10px'}}>
                             <button className="icon-btn-check" title="Shuffle Team"><ArrowRightLeft size={16}/></button>
                             
                             {/* The "Put Paper" Button */}
                             {emp.status === 'Active' && (
                               <button 
                                 className="icon-btn-x" 
                                 style={{color:'#dc2626', border:'1px solid #dc2626', padding:'4px 8px', borderRadius:'4px', display:'flex', gap:'5px', alignItems:'center'}}
                                 title="Initiate Notice Period"
                                 onClick={() => handlePutPaper(tl.id, emp.id)}
                               >
                                 <FileWarning size={14}/> Put Paper
                               </button>
                             )}
                          </div>
                        ) : (
                          <span style={{display:'flex', alignItems:'center', gap:'5px', color:'#94a3b8', fontSize:'12px'}}>
                            <Lock size={12}/> Locked
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;