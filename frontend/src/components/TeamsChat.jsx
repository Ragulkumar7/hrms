import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, Search, Video, Phone, Users, Bell, MoreHorizontal,
  Hash, ChevronDown, Send, Smile, Paperclip, X, Calendar, Settings,
  Filter, MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamsChat = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // --- STATE MANAGEMENT ---
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [messageInput, setMessageInput] = useState('');
  
  // Dynamic Message State
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'Sarah Connor', text: 'Hi team, payroll for January is ready for review.', time: '10:12 AM', isOwn: false, teamId: 0, channelId: 0 },
    { id: 2, sender: 'Admin', text: 'Thanks Sarah! Checking now.', time: '10:15 AM', isOwn: true, teamId: 0, channelId: 0 },
    { id: 3, sender: 'HR Bot', text: 'Reminder: Submit timesheets by EOD', time: '9:45 AM', isOwn: false, teamId: 1, channelId: 0 },
  ]);

  // --- MOCK DATA ---
  const teams = [
    {
      id: 0,
      name: 'TSInfo Technologies',
      icon: 'TT',
      color: '#107c10',
      channels: [{ id: 0, name: 'General' }, { id: 1, name: 'Project Alpha' }, { id: 2, name: 'Announcements' }]
    },
    {
      id: 1,
      name: 'HR Group',
      icon: 'HR',
      color: '#c4314b',
      channels: [{ id: 0, name: 'General' }, { id: 1, name: 'Leave & Policies' }, { id: 2, name: 'Onboarding' }]
    }
  ];

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, selectedChannel, selectedTeam]);

  // --- HANDLERS ---
  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'Admin',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      teamId: selectedTeam,
      channelId: selectedChannel
    };

    setChatHistory([...chatHistory, newMessage]);
    setMessageInput('');
  };

  const currentTeam = teams[selectedTeam];
  const currentChannel = currentTeam.channels[selectedChannel];
  
  // Filter messages based on current view
  const filteredMessages = chatHistory.filter(
    m => m.teamId === selectedTeam && m.channelId === selectedChannel
  );

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f5f5f5', overflow: 'hidden', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', borderRadius: '20px',margin: '4.4px',border: '1px solid #d1d1d1'}}>
      
      {/* 1. LEFT ACTIVITY BAR (DARK) */}
      <div style={{ width: '68px', background: '#1b1d30ff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: '20px', color: '#adadad' }}>
        <div style={{ background: '#6264a7', width: '32px', height: '32px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', marginBottom: '10px' }}>T</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px', width: '100%' }}>
          <Bell size={24} style={{ cursor: 'pointer' }} />
          <MessageSquare size={24} style={{ color: 'white', borderLeft: '3px solid white', paddingLeft: '2px', cursor: 'pointer' }} />
          <Users size={24} style={{ cursor: 'pointer' }} />
          <Calendar size={24} style={{ cursor: 'pointer' }} />
          <Phone size={24} style={{ cursor: 'pointer' }} />
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Settings size={24} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      {/* 2. CHANNELS SIDEBAR */}
      <div style={{ width: '300px', background: '#f0f0f0', borderRight: '1px solid #d1d1d1', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Teams</h2>
          <Filter size={18} style={{ color: '#616161' }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {teams.map((team, tIdx) => (
            <div key={team.id} style={{ marginBottom: '8px' }}>
              <div 
                onClick={() => { setSelectedTeam(tIdx); setSelectedChannel(0); }}
                style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', cursor: 'pointer', background: selectedTeam === tIdx ? '#fff' : 'transparent' }}
              >
                <ChevronDown size={16} style={{ marginRight: '8px', transform: selectedTeam === tIdx ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
                <div style={{ width: '32px', height: '32px', background: team.color, borderRadius: '4px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '12px' }}>
                  {team.icon}
                </div>
                <span style={{ fontWeight: selectedTeam === tIdx ? 'bold' : 'normal', fontSize: '14px' }}>{team.name}</span>
                <MoreHorizontal size={16} style={{ marginLeft: 'auto', color: '#616161' }} />
              </div>

              {selectedTeam === tIdx && (
                <div style={{ marginTop: '4px' }}>
                  {team.channels.map((ch, cIdx) => (
                    <div
                      key={ch.id}
                      onClick={() => setSelectedChannel(cIdx)}
                      style={{ 
                        padding: '8px 16px 8px 54px', cursor: 'pointer', fontSize: '14px',
                        background: (selectedTeam === tIdx && selectedChannel === cIdx) ? '#e2e2e2' : 'transparent',
                        fontWeight: (selectedTeam === tIdx && selectedChannel === cIdx) ? '700' : '400',
                        color: (selectedTeam === tIdx && selectedChannel === cIdx) ? '#6264a7' : '#242424'
                      }}
                    >
                      <img 
    src={`https://ui-avatars.com/api/?name=${ch.name}&background=random`} 
    alt="logo" 
    style={{ width: '20px', height: '20px', borderRadius: '4px', marginRight: '8px' }} 
  />
  <span style={{ fontSize: '14px' }}>{ch.name}</span>
                      {ch.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid #d1d1d1', display: 'flex', alignItems: 'center', gap: '10px', color: '#6264a7', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
          <Users size={18} /> Join or create a team
        </div>
      </div>

      {/* 3. CHAT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
        
        {/* Header */}
        <div style={{ height: '60px', borderBottom: '1px solid #e1e1e1', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Hash size={20} style={{ color: '#616161' }} />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{currentChannel.name}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#616161' }}>
            <Video size={20} style={{ cursor: 'pointer' }} />
            <Phone size={20} style={{ cursor: 'pointer' }} />
            <Search size={20} style={{ cursor: 'pointer' }} />
            <MoreVertical size={20} style={{ cursor: 'pointer' }} />
            <button onClick={() => navigate(-1)} style={{ background: '#6264a7', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Exit Chat</button>
          </div>
        </div>

        {/* Message Container */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#f5f5f5' }}>
          {filteredMessages.length > 0 ? filteredMessages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignSelf: msg.isOwn ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', justifyContent: msg.isOwn ? 'flex-end' : 'flex-start' }}>
                {!msg.isOwn && <span style={{ fontWeight: '700', fontSize: '12px', color: '#616161' }}>{msg.sender}</span>}
                <span style={{ fontSize: '11px', color: '#8a8a8a' }}>{msg.time}</span>
              </div>
              <div style={{ 
                padding: '12px 16px', borderRadius: '8px', fontSize: '14px', lineHeight: '1.5',
                background: msg.isOwn ? '#e7eaf6' : 'white',
                color: '#242424',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                border: msg.isOwn ? '1px solid #d1d1d1' : '1px solid #e1e1e1'
              }}>
                {msg.text}
              </div>
            </div>
          )) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', color: '#8a8a8a' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#e1e1e1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MessageSquare size={48} />
              </div>
              <h3>Welcome to the {currentChannel.name} channel</h3>
              <p>Start a conversation with your team</p>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '20px', background: 'white' }}>
          <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', background: '#fcfcfc' }}>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
              placeholder={`Reply to #${currentChannel.name}`}
              style={{ width: '100%', padding: '15px', border: 'none', background: 'transparent', outline: 'none', fontSize: '14px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 15px', borderTop: '1px solid #e1e1e1', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '15px', color: '#616161' }}>
                <Smile size={18} style={{ cursor: 'pointer' }} />
                <Paperclip size={18} style={{ cursor: 'pointer' }} />
                <Calendar size={18} style={{ cursor: 'pointer' }} />
              </div>
              <button 
                onClick={handleSend}
                disabled={!messageInput.trim()}
                style={{ background: 'none', border: 'none', color: messageInput.trim() ? '#6264a7' : '#adadad', cursor: messageInput.trim() ? 'pointer' : 'default' }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamsChat;