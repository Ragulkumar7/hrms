import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, Search, Video, Bell, Hash, ChevronDown, Send,
  Smile, Paperclip, X, Calendar, Settings, Filter, Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamsChat = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  // Tabs & Selection
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(0);

  // Chat states
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Meet states
  const [showCreateLinkPopup, setShowCreateLinkPopup] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('Meeting with Aparna M A');
  const [isScheduling, setIsScheduling] = useState(false);

  // Scheduling form states
  const [newMeetingTitle, setNewMeetingTitle] = useState('');
  const [invitee, setInvitee] = useState('');
  const [startDate, setStartDate] = useState('2026-01-30');
  const [startTime, setStartTime] = useState('15:00');
  const [endDate, setEndDate] = useState('2026-01-30');
  const [endTime, setEndTime] = useState('15:30');
  const [allDay, setAllDay] = useState(false);
  const [repeat, setRepeat] = useState('Does not repeat');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [bypassLobby, setBypassLobby] = useState('People who were invited');
  const [canPresent, setCanPresent] = useState('Everyone');

  // Sample data
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'Sarah Connor', text: 'Hi team, payroll for January is ready for review.', time: '10:12 AM', isOwn: false, teamId: 0, channelId: 0 },
    { id: 2, sender: 'Admin', text: 'Thanks Sarah! Checking now.', time: '10:15 AM', isOwn: true, teamId: 0, channelId: 0 },
    { id: 3, sender: 'HR Bot', text: 'Reminder: Submit timesheets by EOD', time: '9:45 AM', isOwn: false, teamId: 1, channelId: 0 },
  ]);

  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, title: 'Morning Standup', time: '09:00 AM', type: 'Internal' },
    { id: 2, title: 'Client Review', time: '02:00 PM', type: 'External' },
  ]);

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

  const notifications = [
    { id: 1, user: 'John Doe', action: 'mentioned you', place: 'General', time: '2h ago' },
    { id: 2, user: 'Sarah Connor', action: 'reacted to your message', place: 'Payroll', time: '5h ago' },
    { id: 3, user: 'System', action: 'scheduled a meeting', place: 'Calendar', time: 'Yesterday' },
  ];

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current && activeTab === 'chat') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, selectedChannel, selectedTeam, activeTab]);

  // Send message
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

    setChatHistory(prev => [...prev, newMessage]);
    setMessageInput('');
  };

  // Emoji picker
  const addEmoji = (emoji) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // File upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newMessage = {
      id: Date.now(),
      sender: 'Admin',
      text: `Attached file: ${file.name}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      teamId: selectedTeam,
      channelId: selectedChannel
    };

    setChatHistory(prev => [...prev, newMessage]);
    e.target.value = '';
  };

  // Create instant meeting link
  const handleCreateLink = () => {
    const fakeLink = `https://meet.example.com/${Math.random().toString(36).substring(7)}`;
    navigator.clipboard.writeText(fakeLink);
    alert(`Meeting link copied to clipboard:\n${fakeLink}`);
    setShowCreateLinkPopup(false);
  };

  // Save scheduled meeting
  const handleSaveMeeting = () => {
    const title = newMeetingTitle.trim() || 'Untitled Meeting';
    const timeStr = allDay ? 'All day' : `${startTime} – ${endTime}`;

    const newEvent = {
      id: Date.now(),
      title,
      time: timeStr,
      type: 'Scheduled Meeting'
    };

    setCalendarEvents(prev => [...prev, newEvent]);
    setIsScheduling(false);
    setActiveTab('calendar');

    // Reset form
    setNewMeetingTitle('');
    setInvitee('');
    setStartDate('2026-01-30');
    setStartTime('15:00');
    setEndDate('2026-01-30');
    setEndTime('15:30');
    setAllDay(false);
    setRepeat('Does not repeat');
    setLocation('');
    setDetails('');
  };

  const currentTeam = teams[selectedTeam];
  const currentChannel = currentTeam.channels[selectedChannel];
  const filteredMessages = chatHistory.filter(
    m => m.teamId === selectedTeam && m.channelId === selectedChannel
  );

  // ────────────────────────────────────────────────
  // RENDER FUNCTIONS
  // ────────────────────────────────────────────────

  const SectionHeader = ({ title }) => (
    <div style={{
      padding: '20px',
      borderBottom: '1px solid #e1e1e1',
      background: 'white'
    }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{title}</h2>
    </div>
  );

  const renderMeetTab = () => {
    if (isScheduling) {
      return (
        <div style={{ flex: 1, background: 'white', padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '22px' }}>New meeting</h2>
            <div>
              <button
                onClick={handleSaveMeeting}
                style={{
                  background: '#6264a7',
                  color: 'white',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '4px',
                  marginRight: '12px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
              <button
                onClick={() => setIsScheduling(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>Time zone</label><br />
            <select
              value="UTC+05:30 Chennai, Kolkata, Mumbai, New Delhi"
              style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            >
              <option>UTC+05:30 Chennai, Kolkata, Mumbai, New Delhi</option>
            </select>
          </div>

          <input
            placeholder="Add title"
            value={newMeetingTitle}
            onChange={e => setNewMeetingTitle(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '16px', fontSize: '16px' }}
          />

          <input
            placeholder="Enter name or e-mail"
            value={invitee}
            onChange={e => setInvitee(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '16px' }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
            <span>to</span>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
            <select value="30m" style={{ padding: '8px' }}>
              <option>30m</option>
              <option>1h</option>
            </select>
            <label style={{ whiteSpace: 'nowrap' }}>
              <input type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} /> All day
            </label>
          </div>

          <select
            value={repeat}
            onChange={e => setRepeat(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '16px' }}
          >
            <option>Does not repeat</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>

          <input
            placeholder="Add location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '16px' }}
          />

          <textarea
            placeholder="Type details for this new meeting"
            value={details}
            onChange={e => setDetails(e.target.value)}
            style={{ width: '100%', height: '120px', padding: '12px', marginBottom: '20px' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label>Who can bypass the lobby?</label>
              <select
                value={bypassLobby}
                onChange={e => setBypassLobby(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '6px' }}
              >
                <option>People who were invited</option>
                <option>Everyone</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label>Who can present</label>
              <select
                value={canPresent}
                onChange={e => setCanPresent(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '6px' }}
              >
                <option>Everyone</option>
                <option>Organizers & co-organizers</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, background: '#f8f9fa', padding: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '32px' }}>Meet</h1>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowCreateLinkPopup(true)}
            style={{
              background: '#6264a7',
              color: 'white',
              padding: '14px 28px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Create a meeting link
          </button>

          <button
            onClick={() => setIsScheduling(true)}
            style={{
              background: 'white',
              color: '#6264a7',
              padding: '14px 28px',
              border: '1px solid #6264a7',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Schedule a meeting
          </button>

          <div style={{ flex: 1, minWidth: '220px' }}>
            <input
              placeholder="Join with a meeting ID"
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        {showCreateLinkPopup && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            zIndex: 1000,
            width: '420px',
            maxWidth: '90%'
          }}>
            <h3 style={{ marginTop: 0 }}>Give your meeting a title</h3>
            <input
              value={meetingTitle}
              onChange={e => setMeetingTitle(e.target.value)}
              style={{ width: '100%', padding: '12px', margin: '16px 0', fontSize: '16px' }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCreateLinkPopup(false)}
                style={{ padding: '10px 20px', border: 'none', background: '#eee', borderRadius: '6px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLink}
                style={{
                  padding: '10px 20px',
                  background: '#6264a7',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px'
                }}
              >
                Create and copy link
              </button>
            </div>
          </div>
        )}

        <h3 style={{ margin: '40px 0 16px', fontSize: '20px' }}>Scheduled meetings</h3>

        {calendarEvents.length === 0 ? (
          <div style={{ color: '#666', fontStyle: 'italic' }}>
            You don't have anything scheduled.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {calendarEvents.map(ev => (
              <div
                key={ev.id}
                style={{
                  background: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <strong>{ev.title}</strong>
                <div style={{ color: '#555', fontSize: '14px', marginTop: '4px' }}>
                  {ev.time}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '24px' }}>
          <button
            onClick={() => setActiveTab('calendar')}
            style={{
              color: '#6264a7',
              background: 'none',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            View in calendar →
          </button>
        </div>
      </div>
    );
  };

  const renderChat = () => (
    <>
      {/* Teams & Channels Sidebar */}
      <div style={{
        width: '300px',
        background: '#f0f0f0',
        borderRight: '1px solid #d1d1d1',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Teams</h2>
          <Filter size={18} style={{ color: '#616161' }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {teams.map((team, idx) => (
            <div key={team.id}>
              <div
                onClick={() => { setSelectedTeam(idx); setSelectedChannel(0); }}
                style={{
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  background: selectedTeam === idx ? '#ffffff' : 'transparent'
                }}
              >
                <ChevronDown
                  size={16}
                  style={{
                    marginRight: '8px',
                    transform: selectedTeam === idx ? 'rotate(0deg)' : 'rotate(-90deg)'
                  }}
                />
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: team.color,
                  borderRadius: '4px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginRight: '12px'
                }}>
                  {team.icon}
                </div>
                <span style={{ fontWeight: selectedTeam === idx ? 'bold' : 'normal' }}>
                  {team.name}
                </span>
              </div>

              {selectedTeam === idx && (
                <div>
                  {team.channels.map((ch, cIdx) => (
                    <div
                      key={ch.id}
                      onClick={() => setSelectedChannel(cIdx)}
                      style={{
                        padding: '8px 16px 8px 64px',
                        cursor: 'pointer',
                        background: selectedChannel === cIdx ? '#e2e2e2' : 'transparent',
                        fontWeight: selectedChannel === cIdx ? '700' : '400',
                        color: selectedChannel === cIdx ? '#6264a7' : '#333'
                      }}
                    >
                      {/* Replace # with channel logo */}
    <img
      src={`https://ui-avatars.com/api/?name=${ch.name}&background=random&size=128&bold=true`}
      alt={ch.name}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '4px',
        objectFit: 'cover'
      }}
    />
    <span>{ch.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          height: '64px',
          borderBottom: '1px solid #e1e1e1',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
    src={`https://ui-avatars.com/api/?name=${currentChannel.name}&background=random&size=128&bold=true&rounded=true`}
    alt={currentChannel.name}
    style={{
      width: '24px',
      height: '24px',
      borderRadius: '6px'
    }}
  />
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '600' }}>
              {currentChannel.name}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: '#616161' }}>
            <Video size={20} />
            <Search size={20} />
            <button
              onClick={() => navigate(-1)}
              style={{
                background: '#6264a7',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Exit
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            background: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {filteredMessages.map(msg => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.isOwn ? 'flex-end' : 'flex-start',
                maxWidth: '70%'
              }}
            >
              <div style={{
                fontSize: '12px',
                color: '#888',
                marginBottom: '4px',
                textAlign: msg.isOwn ? 'right' : 'left'
              }}>
                {msg.sender} • {msg.time}
              </div>
              <div style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: msg.isOwn ? '#e7eaf6' : 'white',
                border: '1px solid #e0e0e0',
                lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={{ padding: '16px 24px', background: 'white', borderTop: '1px solid #e1e1e1' }}>
          <div style={{
            border: '1px solid #d1d1d1',
            borderRadius: '8px',
            background: '#fcfcfc'
          }}>
            <input
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend(e))}
              placeholder={`Message #${currentChannel.name}`}
              style={{
                width: '100%',
                padding: '16px',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '15px'
              }}
            />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 16px',
              borderTop: '1px solid #e1e1e1'
            }}>
              <div style={{ display: 'flex', gap: '20px', color: '#616161' }}>
                <Smile
                  size={20}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />

                {showEmojiPicker && (
                  <div style={{
                    position: 'absolute',
                    bottom: '80px',
                    left: '20px',
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    gap: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    {['😊', '😂', '👍', '❤️', '🔥', '🎉', '👏'].map(em => (
                      <span
                        key={em}
                        style={{ fontSize: '24px', cursor: 'pointer' }}
                        onClick={() => addEmoji(em)}
                      >
                        {em}
                      </span>
                    ))}
                  </div>
                )}

                <Paperclip
                  size={20}
                  style={{ cursor: 'pointer' }}
                  onClick={() => fileInputRef.current?.click()}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </div>

              <button
                onClick={handleSend}
                disabled={!messageInput.trim()}
                style={{
                  background: 'none',
                  border: 'none',
                  color: messageInput.trim() ? '#6264a7' : '#aaa',
                  cursor: messageInput.trim() ? 'pointer' : 'default'
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderCalendar = () => (
    <div style={{ flex: 1, background: '#f8f9fa', padding: '24px' }}>
      <SectionHeader title="Calendar" />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '8px',
        marginTop: '20px'
      }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              padding: '12px',
              background: 'white',
              borderRadius: '6px'
            }}
          >
            {day}
          </div>
        ))}

        {calendarEvents.map(event => (
          <div
            key={event.id}
            style={{
              background: '#e7eaf6',
              padding: '12px',
              borderRadius: '6px',
              borderLeft: '4px solid #6264a7',
              gridColumn: 'span 1'
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{event.title}</div>
            <div style={{ fontSize: '13px', color: '#555' }}>{event.time}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#f5f5f5',
      overflow: 'hidden',
      fontFamily: '"Segoe UI", system-ui, sans-serif',
      borderRadius: '16px',
      border: '1px solid #d1d1d1',
      margin: '8px'
    }}>
      {/* Left Navigation Bar */}
      <div style={{
        width: '72px',
        background: '#1e213a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        color: '#aaa'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: '#6264a7',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '32px'
        }}>
          T
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <Bell
            size={26}
            onClick={() => setActiveTab('activity')}
            style={{ cursor: 'pointer', color: activeTab === 'activity' ? 'white' : '#aaa' }}
          />

          <MessageSquare
            size={26}
            onClick={() => setActiveTab('chat')}
            style={{
              cursor: 'pointer',
              color: activeTab === 'chat' ? 'white' : '#aaa',
              borderLeft: activeTab === 'chat' ? '4px solid white' : 'none',
              paddingLeft: activeTab === 'chat' ? '4px' : '0'
            }}
          />

          <Calendar
            size={26}
            onClick={() => setActiveTab('calendar')}
            style={{ cursor: 'pointer', color: activeTab === 'calendar' ? 'white' : '#aaa' }}
          />

          <Video
            size={26}
            onClick={() => setActiveTab('meet')}
            style={{ cursor: 'pointer', color: activeTab === 'meet' ? 'white' : '#aaa' }}
          />
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: '24px' }}>
          <Settings
            size={26}
            onClick={() => setActiveTab('settings')}
            style={{ cursor: 'pointer', color: activeTab === 'settings' ? 'white' : '#aaa' }}
          />
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'meet' && renderMeetTab()}
      {activeTab === 'chat' && renderChat()}
      {activeTab === 'calendar' && renderCalendar()}

      {/* You can add other tabs (activity, settings, etc.) similarly */}
    </div>
  );
};

export default TeamsChat;