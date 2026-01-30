// src/components/TeamsChat.jsx
import React, { useState } from 'react';
import {
  MessageSquare, Search, Video, Phone, Users, Bell, MoreHorizontal,
  Hash, ChevronDown, Send, Smile, Paperclip, X,
  Calendar  // ← ADD THIS
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamsChat = () => {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [messageInput, setMessageInput] = useState('');

  // Mock data - teams & channels
  const teams = [
    {
      name: 'TSInfo Technologies',
      icon: 'TT',
      channels: [
        { name: 'General', isSelected: true },
        { name: 'Announcements' },
        { name: 'Project Alpha' },
        { name: 'Random' },
      ]
    },
    {
      name: 'HR Group',
      icon: 'HR',
      channels: [
        { name: 'General' },
        { name: 'Leave & Policies' },
        { name: 'Onboarding' },
      ]
    },
  ];

  // Mock messages
  const messages = [
    { sender: 'Sarah Connor', text: 'Hi team, payroll for January is ready for review.', time: '10:12 AM', isOwn: false },
    { sender: 'You', text: 'Thanks Sarah! Checking now.', time: '10:15 AM', isOwn: true },
    { sender: 'HR Bot', text: 'Reminder: Submit timesheets by EOD', time: '9:45 AM', isOwn: false },
  ];

  const currentTeam = teams[selectedTeam];
  const currentChannel = currentTeam?.channels?.[selectedChannel];

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    // In real app → send to backend / add to state
    console.log('Sent:', messageInput);
    setMessageInput('');
  };

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 85px)', // adjust based on your top bar height
      background: '#fff',
      overflow: 'hidden',
    }}>
      {/* 1. Very left - App icons bar (like Teams activity bar) */}
      <div style={{
        width: '60px',
        background: '#4a154b', // classic Teams purple
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '16px',
        gap: '32px',
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>T</div>
        <MessageSquare size={28} />
        <Bell size={28} />
        <Users size={28} />
        <Calendar size={28} />
        <Phone size={28} />
        <MoreHorizontal size={28} style={{ marginTop: 'auto', marginBottom: '24px' }} />
      </div>

      {/* 2. Left sidebar - Teams & Channels */}
      <div style={{
        width: '280px',
        background: '#f3f2f1',
        borderRight: '1px solid #e5e7eb',
        overflowY: 'auto',
      }}>
        {/* Teams list */}
        <div style={{ padding: '16px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Your teams</h3>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6264a7',
            }}>+</button>
          </div>

          {teams.map((team, tIdx) => (
            <div key={tIdx}>
              <div
                onClick={() => {
                  setSelectedTeam(tIdx);
                  setSelectedChannel(0);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  background: selectedTeam === tIdx ? '#e0e7ff' : 'transparent',
                  borderRadius: '6px',
                  marginBottom: '4px',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#6264a7',
                  color: 'white',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}>
                  {team.icon}
                </div>
                <span style={{ fontWeight: selectedTeam === tIdx ? 600 : 400 }}>
                  {team.name}
                </span>
                <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
              </div>

              {/* Channels under selected team */}
              {selectedTeam === tIdx && (
                <div style={{ paddingLeft: '20px' }}>
                  {team.channels.map((ch, cIdx) => (
                    <div
                      key={cIdx}
                      onClick={() => setSelectedChannel(cIdx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        background: selectedChannel === cIdx ? '#d1d5db' : 'transparent',
                        borderRadius: '4px',
                        color: selectedChannel === cIdx ? '#000' : '#5e5e5e',
                      }}
                    >
                      <Hash size={16} />
                      <span style={{ fontSize: '14px' }}>{ch.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom - Join or create */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e5e7eb',
          marginTop: 'auto',
        }}>
          <button style={{
            width: '100%',
            padding: '10px',
            background: '#6264a7',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}>
            Join or create a team
          </button>
        </div>
      </div>

      {/* 3. Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          height: '64px',
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#6264a7',
              borderRadius: '8px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}>
              {currentTeam?.icon}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>{currentChannel?.name}</h2>
              <small style={{ color: '#6b7280' }}>{currentTeam?.name}</small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', color: '#6b7280' }}>
            <Search size={20} />
            <Video size={20} />
            <Phone size={20} />
            <button
              onClick={() => navigate(-1)}
              style={{
                background: '#6264a7',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          background: '#f8f9fa',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.isOwn ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
              }}
            >
              <div style={{
                background: msg.isOwn ? '#6264a7' : 'white',
                color: msg.isOwn ? 'white' : '#1f2937',
                padding: '12px 16px',
                borderRadius: msg.isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              }}>
                {!msg.isOwn && (
                  <div style={{
                    fontWeight: 600,
                    fontSize: '13px',
                    marginBottom: '4px',
                    color: '#6264a7',
                  }}>
                    {msg.sender}
                  </div>
                )}
                <p style={{ margin: 0 }}>{msg.text}</p>
                <div style={{
                  fontSize: '11px',
                  opacity: 0.8,
                  marginTop: '6px',
                  textAlign: 'right',
                }}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div style={{
          padding: '16px 24px',
          background: 'white',
          borderTop: '1px solid #e5e7eb',
        }}>
          <form onSubmit={handleSend} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#f1f5f9',
            borderRadius: '24px',
            padding: '8px 16px',
          }}>
            <input
              type="text"
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '15px',
              }}
            />
            <Smile size={20} style={{ color: '#6b7280', cursor: 'pointer' }} />
            <Paperclip size={20} style={{ color: '#6b7280', cursor: 'pointer' }} />
            <button
              type="submit"
              style={{
                background: '#6264a7',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamsChat;