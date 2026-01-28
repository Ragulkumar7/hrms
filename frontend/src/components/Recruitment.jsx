import React, { useState } from 'react';
import { 
  Briefcase, Users, Calendar, TrendingUp, Plus, 
  Search, Filter, MoreVertical, CheckCircle, Clock 
} from 'lucide-react';

const Recruitment = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: <TrendingUp size={18} /> },
    { id: 'jobs', label: 'Job Board', icon: <Briefcase size={18} /> },
    { id: 'pipeline', label: 'Candidate Pipeline', icon: <Users size={18} /> },
    { id: 'interviews', label: 'Interviews', icon: <Calendar size={18} /> },
  ];

  return (
    <div className="rec-container fade-in">
      {/* Header */}
      <div className="rec-header">
        <div>
          <h1 className="main-title">Recruitment & ATS</h1>
          <p className="sub-title">Streamline hiring, track candidates, and schedule interviews.</p>
        </div>
        <button className="btn-action">
          <Plus size={16} /> Post New Job
        </button>
      </div>

      {/* Tabs */}
      <div className="rec-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rec-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="rec-content glass-card">
        {activeTab === 'dashboard' && <RecruitmentDashboard />}
        {activeTab === 'jobs' && <JobBoard />}
        {activeTab === 'pipeline' && <CandidatePipeline />}
        {activeTab === 'interviews' && <InterviewSchedule />}
      </div>
    </div>
  );
};

// 1. Dashboard Component
const RecruitmentDashboard = () => (
  <div className="rec-dashboard">
    <div className="rec-stats-grid">
      {[
        { label: 'Active Jobs', value: '08', color: 'blue', icon: <Briefcase size={20}/> },
        { label: 'Total Applicants', value: '245', color: 'purple', icon: <Users size={20}/> },
        { label: 'In Interview', value: '14', color: 'orange', icon: <Calendar size={20}/> },
        { label: 'Hired This Month', value: '06', color: 'green', icon: <CheckCircle size={20}/> },
      ].map((stat, i) => (
        <div key={i} className={`stat-box ${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div>
            <p className="stat-label">{stat.label}</p>
            <h2 className="stat-val">{stat.value}</h2>
          </div>
        </div>
      ))}
    </div>

    <div className="rec-split-grid">
      {/* Recent Activity */}
      <div className="rec-section-card">
        <h3 className="section-title">Recent Activities</h3>
        <div className="activity-feed">
          {[
            { text: 'John Doe applied for Senior Developer', time: '2 hours ago' },
            { text: 'Sarah Connor moved to Interview Stage', time: '4 hours ago' },
            { text: 'Offer Letter sent to Mike Ross', time: 'Yesterday' },
          ].map((act, i) => (
            <div key={i} className="activity-item">
              <div className="dot"></div>
              <div>
                <p className="act-text">{act.text}</p>
                <p className="act-time">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rec-section-card">
        <h3 className="section-title">Pending Actions</h3>
        <div className="action-list">
          {[
            { label: 'Review 12 new resumes', urgent: true },
            { label: 'Schedule final round for UI Designer', urgent: true },
            { label: 'Update job description for QA Tester', urgent: false },
          ].map((task, i) => (
            <div key={i} className="action-item">
              <span>{task.label}</span>
              {task.urgent && <span className="badge-urgent">URGENT</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 2. Job Board Component
const JobBoard = () => (
  <div className="job-board">
    <div className="rec-filter-bar">
      <div className="search-wrapper">
        <Search size={16} className="search-icon"/>
        <input type="text" placeholder="Search jobs..." className="standard-input" />
      </div>
      <button className="btn-secondary"><Filter size={16}/></button>
    </div>

    <div className="job-grid">
      {[
        { title: 'Senior React Developer', dept: 'Engineering', type: 'Full-time', apps: 45, status: 'Active' },
        { title: 'UI/UX Designer', dept: 'Design', type: 'Remote', apps: 28, status: 'Active' },
        { title: 'Product Manager', dept: 'Product', type: 'Full-time', apps: 12, status: 'Closed' },
        { title: 'Marketing Specialist', dept: 'Marketing', type: 'Contract', apps: 34, status: 'Active' },
      ].map((job, i) => (
        <div key={i} className="job-card">
          <div className="job-header">
            <span className={`status-pill ${job.status === 'Active' ? 'active' : 'rejected'}`}>
              {job.status}
            </span>
            <MoreVertical size={16} className="more-icon" />
          </div>
          <h3 className="job-title">{job.title}</h3>
          <p className="job-meta">{job.dept} • {job.type}</p>
          
          <div className="job-footer">
            <div className="applicant-count">
              <Users size={14} /> {job.apps} Applicants
            </div>
            <button className="link-btn">View Details</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 3. Candidate Pipeline
const CandidatePipeline = () => (
  <div className="pipeline-wrapper">
    {[
      { label: 'Applied', count: 12, color: 'blue' },
      { label: 'Screening', count: 5, color: 'purple' },
      { label: 'Interview', count: 3, color: 'orange' },
      { label: 'Offer Sent', count: 1, color: 'green' },
      { label: 'Rejected', count: 8, color: 'red' },
    ].map((stage, i) => (
      <div key={i} className="pipeline-col">
        <div className={`pipeline-header border-${stage.color}`}>
          <h4>{stage.label}</h4>
          <span className={`count-pill bg-${stage.color}`}>{stage.count}</span>
        </div>
        <div className="pipeline-body">
          <div className="candidate-card">
            <div className="cand-header">
              <h5>Candidate Name</h5>
              <MoreVertical size={14} color="#999"/>
            </div>
            <p className="cand-role">Sr. React Developer</p>
            <div className="cand-tags">
               <span>4y Exp</span><span>Remote</span>
            </div>
          </div>
          {/* Duplicate for demo */}
          <div className="candidate-card">
            <div className="cand-header">
              <h5>Jane Doe</h5>
              <MoreVertical size={14} color="#999"/>
            </div>
            <p className="cand-role">Sr. React Developer</p>
            <div className="cand-tags">
               <span>2y Exp</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// 4. Interview Schedule
const InterviewSchedule = () => (
  <div className="rec-split-grid">
    <div className="rec-section-card">
      <h3 className="section-title">Upcoming Interviews</h3>
      <div className="interview-list">
        {[
          { name: 'Alice Walker', role: 'UI Designer', time: '10:00 AM', date: '28', type: 'Technical Round' },
          { name: 'Bob Martin', role: 'Backend Dev', time: '02:00 PM', date: '28', type: 'HR Round' },
          { name: 'Charlie Day', role: 'Product Manager', time: '11:00 AM', date: '29', type: 'Final Round' },
        ].map((int, i) => (
          <div key={i} className="interview-item">
            <div className="date-badge">
              {int.date}
            </div>
            <div className="int-details">
              <h4>{int.name}</h4>
              <p>{int.role} • <span>{int.type}</span></p>
            </div>
            <div className="int-time">
              <span><Clock size={14} /> {int.time}</span>
              <button>Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="rec-section-card">
      <h3 className="section-title">Quick Schedule</h3>
      <form className="schedule-form">
        <div className="form-group">
          <label>Candidate</label>
          <select className="standard-input"><option>Select...</option></select>
        </div>
        <div className="form-group">
          <label>Date & Time</label>
          <input type="datetime-local" className="standard-input" />
        </div>
        <div className="form-group">
           <label>Type</label>
           <select className="standard-input"><option>Technical</option></select>
        </div>
        <button className="btn-action full-width">Schedule</button>
      </form>
    </div>
  </div>
);

export default Recruitment;