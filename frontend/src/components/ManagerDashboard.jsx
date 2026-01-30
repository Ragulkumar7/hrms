import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; 
import { 
  Users, UserMinus, ArrowRightLeft, Lock, ChevronDown, ChevronRight, 
  Gift, UserPlus, AlertTriangle, FileWarning, CheckCircle, X, ArrowUpRight, 
  MapPin, Briefcase, Smartphone, Search, Edit2, Check
} from 'lucide-react';

const ManagerDashboard = () => {
  const { user } = useUser(); 
  
  // 1. New Hires Pool (From HR)
  const [unassigned, setUnassigned] = useState([
    { id: 'EMP-NEW-1', name: 'Rohan (New)', role: 'Jr. Dev', joined: 'Yesterday' }
  ]);

  // 2. Existing Teams Data
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
        { id: 'E-103', name: 'Sanjay', role: 'DevOps', efficiency: 45, status: 'Active' }
      ]
    }
  ]);

  // 3. Automated Wishes Data
  const [events, setEvents] = useState([
    { 
      id: 1, name: 'Varshith', type: 'Birthday', role: 'Software Developer',
      location: 'Coimbatore Office', date: '30-Jan-2026', status: 'Auto-Sent', phone: '+91 98765 43210'
    },
    { 
      id: 2, name: 'Sarah (TL)', type: 'Work Anniversary', role: 'Team Lead',
      location: 'Remote', date: '31-Jan-2026', status: 'Scheduled', phone: '+91 98989 12345'
    }
  ]);

  // UI States
  const [expandedTL, setExpandedTL] = useState(null);
  const [wishSearch, setWishSearch] = useState("");
  const [editingEfficiency, setEditingEfficiency] = useState(null); // Tracks {tlId, empId}

  // --- ACTIONS ---

  // Update Efficiency Logic
  const handleEfficiencyChange = (tlId, empId, newValue) => {
    const val = Math.min(100, Math.max(0, parseInt(newValue) || 0));
    setTeamData(teamData.map(tl => {
      if (tl.id === tlId) {
        return {
          ...tl,
          members: tl.members.map(m => m.id === empId ? { ...m, efficiency: val } : m)
        };
      }
      return tl;
    }));
  };

  const handleSwapTeam = (empId, currentTlId, newTlId) => {
    if (!newTlId || currentTlId === newTlId) return;
    const sourceTL = teamData.find(t => t.id === currentTlId);
    const employeeToMove = sourceTL.members.find(m => m.id === empId);
    const updatedTeams = teamData.map(tl => {
      if (tl.id === currentTlId) return { ...tl, members: tl.members.filter(m => m.id !== empId) };
      if (tl.id === newTlId) return { ...tl, members: [...tl.members, employeeToMove] };
      return tl;
    });
    setTeamData(updatedTeams);
    setExpandedTL(newTlId); 
  };

  const handleAssign = (empId, tlId) => {
    if (!tlId) return;
    const employee = unassigned.find(e => e.id === empId);
    setTeamData(teamData.map(tl => {
      if (tl.id === tlId) return { ...tl, members: [...tl.members, { ...employee, efficiency: 100, status: 'Active' }] };
      return tl;
    }));
    setUnassigned(unassigned.filter(e => e.id !== empId));
    setExpandedTL(tlId);
  };

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(wishSearch.toLowerCase())
  );

  const visibleTeams = user.role === 'TL' ? teamData.filter(tl => tl.id === 'TL-01') : teamData;

  return (
    <div style={{padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif'}}>
      <div style={{marginBottom: '25px'}}>
        <h2 style={{fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0}}>Global Manager Portal</h2>
        <p style={{color: '#64748b', fontSize: '14px', marginTop: '4px'}}>Performance, Allocations & Automation</p>
      </div>

      {/* --- AUTOMATED WISHES & EVENTS --- */}
      <div style={{ background: '#fffdf5', border: '1px solid #fde68a', borderRadius: '16px', padding: '24px', marginBottom: '25px' }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px'}}>
          <Gift size={20} color="#d97706" />
          <h4 style={{margin: 0, color: '#d97706', fontSize: '17px', fontWeight: '700'}}>Automated Wishes & Events</h4>
        </div>
        <div style={{position: 'relative', width: '320px', marginBottom: '20px'}}>
          <Search size={16} color="#d97706" style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)'}}/>
          <input type="text" placeholder="Search employee..." value={wishSearch} onChange={(e) => setWishSearch(e.target.value)} style={{width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #fde68a', outline: 'none'}} />
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px'}}>
          {filteredEvents.map(event => (
            <div key={event.id} style={{background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #fef3c7', display: 'flex', gap: '15px'}}>
              <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800'}}>{event.name[0]}</div>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}><strong style={{fontSize: '14px'}}>{event.name}</strong></div>
                <div style={{fontSize: '12px', color: '#64748b', marginTop: '4px'}}>
                  <div><Briefcase size={12}/> {event.role}</div>
                  <div style={{fontWeight: '700', color: '#1e293b'}}>📅 {event.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- NEW HIRES --- */}
      {user.role === 'Manager' && unassigned.length > 0 && (
        <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '1px dashed #2563eb', marginBottom: '25px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}><UserPlus size={18} color="#2563eb" /><h4 style={{margin: 0, color: '#2563eb'}}>New Hires (From HR)</h4></div>
          {unassigned.map(emp => (
            <div key={emp.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#eff6ff', padding: '12px', borderRadius: '8px', marginBottom: '8px'}}>
              <span style={{fontWeight: '600'}}>{emp.name} <small>({emp.role})</small></span>
              <select style={{padding: '5px', borderRadius: '6px', fontSize: '12px'}} onChange={(e) => handleAssign(emp.id, e.target.value)} defaultValue=""><option value="" disabled>Assign TL...</option>{teamData.map(tl => <option key={tl.id} value={tl.id}>{tl.name}</option>)}</select>
            </div>
          ))}
        </div>
      )}

      {/* --- TEAM STRUCTURE --- */}
      <div style={{background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}><Users size={18}/><h4 style={{margin: 0}}>Team Structure & Efficiency</h4></div>
        {visibleTeams.map(tl => (
          <div key={tl.id} style={{marginBottom: '10px', border: '1px solid #f1f5f9', borderRadius: '12px'}}>
            <div onClick={() => setExpandedTL(expandedTL === tl.id ? null : tl.id)} style={{padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'}}>
              <span style={{fontWeight: '700'}}>{tl.name} <small>({tl.members.length} Members)</small></span>
              {expandedTL === tl.id ? <ChevronDown size={18}/> : <ChevronRight size={18}/>}
            </div>
            {expandedTL === tl.id && (
              <div style={{padding: '0 16px 16px'}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead style={{textAlign: 'left', fontSize: '11px', color: '#64748b', borderBottom: '1px solid #f1f5f9'}}>
                    <tr>
                      <th style={{padding: '10px'}}>Employee</th>
                      <th style={{padding: '10px'}}>Efficiency %</th>
                      <th style={{padding: '10px'}}>Status</th>
                      <th style={{padding: '10px'}}>Action</th>
                      <th style={{padding: '10px'}}>Swap Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tl.members.map(emp => (
                      <tr key={emp.id} style={{borderBottom: '1px solid #f8fafc'}}>
                        <td style={{padding: '12px 10px'}}><div style={{fontWeight: '600'}}>{emp.name}</div><div style={{fontSize: '11px'}}>{emp.role}</div></td>
                        <td style={{padding: '12px 10px'}}>
                          {editingEfficiency?.empId === emp.id ? (
                            <input 
                              type="number" 
                              value={emp.efficiency} 
                              onChange={(e) => handleEfficiencyChange(tl.id, emp.id, e.target.value)}
                              style={{width: '60px', padding: '4px', borderRadius: '4px', border: '1px solid #3b82f6'}}
                            />
                          ) : (
                            <>
                              <div style={{width: '60px', height: '4px', background: '#f1f5f9', borderRadius: '10px'}}><div style={{width: `${emp.efficiency}%`, height: '100%', background: '#22c55e', borderRadius: '10px'}}/></div>
                              <span style={{fontSize: '11px'}}>{emp.efficiency}%</span>
                            </>
                          )}
                        </td>
                        <td style={{padding: '12px 10px'}}><span style={{fontSize: '10px', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px'}}>{emp.status}</span></td>
                        
                        {/* --- ACTION BUTTON: TOGGLES EDIT MODE --- */}
                        <td style={{padding: '12px 10px'}}>
                          <button 
                            onClick={() => setEditingEfficiency(editingEfficiency?.empId === emp.id ? null : { tlId: tl.id, empId: emp.id })}
                            style={{border: 'none', background: editingEfficiency?.empId === emp.id ? '#dcfce7' : '#f1f5f9', padding: '6px', borderRadius: '6px', cursor: 'pointer'}}
                          >
                            {editingEfficiency?.empId === emp.id ? <Check size={14} color="#166534"/> : <Edit2 size={14}/>}
                          </button>
                        </td>

                        <td style={{padding: '12px 10px'}}>
                          {user.role === 'Manager' && (
                            <select style={{fontSize: '11px', padding: '4px', borderRadius: '4px', border: '1px solid #e2e8f0'}} onChange={(e) => handleSwapTeam(emp.id, tl.id, e.target.value)} defaultValue="">
                              <option value="" disabled>Switch to...</option>
                              {teamData.filter(target => target.id !== tl.id).map(target => <option key={target.id} value={target.id}>{target.name}</option>)}
                            </select>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;