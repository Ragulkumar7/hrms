import React, { useState, useMemo } from 'react';
import { 
  Users, UserPlus, FileSearch, Megaphone, 
  Calendar, Upload, Search, Filter, MoreVertical, Plus
} from 'lucide-react';

const HRManagement = () => {
  const [activeTab, setActiveTab] = useState('directory');

  const tabs = [
    { id: 'directory', label: 'Employee Directory', icon: <Users size={18} /> },
    { id: 'hiring', label: 'Hiring & ATS', icon: <UserPlus size={18} /> },
    { id: 'attendance', label: 'Attendance Maint.', icon: <Calendar size={18} /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">HR Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your workforce, hiring, and internal communications.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id 
                ? 'border-orange-500 text-orange-500' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        {activeTab === 'directory' && <EmployeeDirectory />}
        {activeTab === 'hiring' && <HiringATS />}
        {activeTab === 'attendance' && <AttendanceMaint />}
        {activeTab === 'announcements' && <AnnouncementsPortal />}
      </div>
    </div>
  );
};

// 1. Employee Directory Component (Matches image_dd59f0.png)
const EmployeeDirectory = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-lg dark:text-white">Staff Profiles</h3>
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
        <Plus size={16} /> Add Employee
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-bold uppercase text-[11px]">
          <tr>
            <th className="p-4">Emp ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-gray-700">
          {[
            { id: '#EMP001', name: 'John Doe', role: 'Software Engineer', status: 'Active', initials: 'JD' },
            { id: '#EMP002', name: 'Jane Smith', role: 'Product Manager', status: 'Active', initials: 'JS' },
            { id: '#EMP003', name: 'Robert Johnson', role: 'UI Designer', status: 'On Leave', initials: 'RJ' }
          ].map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td className="p-4 font-medium dark:text-gray-300">{emp.id}</td>
              <td className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-xs">{emp.initials}</div>
                <span className="font-bold dark:text-white">{emp.name}</span>
              </td>
              <td className="p-4 dark:text-gray-400">{emp.role}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${emp.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {emp.status}
                </span>
              </td>
              <td className="p-4"><MoreVertical size={16} className="text-gray-400 cursor-pointer" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// 2. Hiring & ATS Component (Functional Resume Filter)
const HiringATS = () => {
  const [keyword, setKeyword] = useState('');
  const [resumes, setResumes] = useState([
    { name: 'Alex Rivers', skills: 'React, Node, Tailwind', experience: '4 Years', status: 'Screened' },
    { name: 'Sarah Connor', skills: 'UI/UX, Figma, Adobe', experience: '5 Years', status: 'Interview' },
    { name: 'Michael Scott', skills: 'Sales, Management', experience: '10 Years', status: 'Applied' },
  ]);

  const filteredResumes = useMemo(() => {
    return resumes.filter(r => 
      r.skills.toLowerCase().includes(keyword.toLowerCase()) || 
      r.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, resumes]);

  return (
    <div className="space-y-8">
      {/* Top Stats Cards (Matches image_dd598f.png) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl">
          <p className="text-sm font-bold text-orange-600">Open Positions</p>
          <h2 className="text-3xl font-bold mt-2 dark:text-white">14</h2>
        </div>
        <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl">
          <p className="text-sm font-bold text-blue-600">Resumes Screened</p>
          <h2 className="text-3xl font-bold mt-2 dark:text-white">482</h2>
        </div>
        <div className="p-6 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded-xl">
          <p className="text-sm font-bold text-purple-600">Interviews Scheduled</p>
          <h2 className="text-3xl font-bold mt-2 dark:text-white">28</h2>
        </div>
      </div>

      {/* ATS Keyword Search Tool */}
      <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold mb-4 flex items-center gap-2 dark:text-white"><FileSearch size={18} /> Resume ATS Filter</h3>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search skills (e.g. React, UI/UX)..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none focus:ring-2 ring-orange-500/20"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
            <Upload size={18} /> Bulk Upload
          </button>
        </div>
        
        {/* Results Table */}
        <div className="mt-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b dark:border-gray-700 uppercase text-[10px] font-bold">
                <th className="pb-3">Candidate</th>
                <th className="pb-3">Matched Skills</th>
                <th className="pb-3">Exp</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResumes.map((res, i) => (
                <tr key={i} className="border-b dark:border-gray-700 last:border-0">
                  <td className="py-4 font-bold dark:text-white">{res.name}</td>
                  <td className="py-4 text-orange-500 font-medium">{res.skills}</td>
                  <td className="py-4 dark:text-gray-400">{res.experience}</td>
                  <td className="py-4"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-[10px] font-bold">{res.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 3. Attendance Maintenance Component (Matches image_dd593a.png)
const AttendanceMaint = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <select className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-2 text-sm outline-none dark:text-white">
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Design</option>
        </select>
        <div className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-2 text-sm dark:text-gray-300">
          Oct 20, 2023 - Oct 27, 2023
        </div>
      </div>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold">+ Add Attendance</button>
    </div>
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 uppercase text-[10px] font-bold">
        <tr>
          <th className="p-4">Employee</th>
          <th className="p-4">Date</th>
          <th className="p-4">Clock In</th>
          <th className="p-4">Clock Out</th>
          <th className="p-4">Status</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: 'John Doe', date: 'Oct 26, 2023', in: '09:02 AM', out: '06:15 PM', status: 'Present', color: 'green' },
          { name: 'Sarah Connor', date: 'Oct 26, 2023', in: '09:45 AM', out: '06:00 PM', status: 'Late', color: 'orange' },
          { name: 'Michael Scott', date: 'Oct 26, 2023', in: '--', out: '--', status: 'Absent', color: 'red' }
        ].map((log, i) => (
          <tr key={i} className="border-b dark:border-gray-700 dark:text-gray-300">
            <td className="p-4 font-bold">{log.name}</td>
            <td className="p-4">{log.date}</td>
            <td className="p-4">{log.in}</td>
            <td className="p-4">{log.out}</td>
            <td className="p-4">
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded bg-${log.color}-100 text-${log.color}-600`}>
                {log.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// 4. Announcements Portal Component (Matches image_dd566c.png)
const AnnouncementsPortal = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-1 bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
      <h3 className="font-bold mb-4 dark:text-white">Post Announcement</h3>
      <form className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 block mb-1 uppercase">Title</label>
          <input type="text" placeholder="e.g. Town Hall Meeting" className="w-full p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-600 outline-none text-sm dark:text-white" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 block mb-1 uppercase">Message</label>
          <textarea rows="4" className="w-full p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-600 outline-none text-sm dark:text-white"></textarea>
        </div>
        <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold">Publish Now</button>
      </form>
    </div>
    <div className="lg:col-span-2 space-y-4">
      <h3 className="font-bold dark:text-white">Recent Communications</h3>
      {[
        { title: 'New Remote Work Policy - V2.0', date: 'Oct 24, 2023', cat: 'Company Update' },
        { title: 'Annual Team Retreat 2023 Registration', date: 'Oct 20, 2023', cat: 'Event' }
      ].map((post, i) => (
        <div key={i} className="p-4 border dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-orange-500 uppercase">{post.cat}</span>
              <h4 className="font-bold text-gray-800 dark:text-white mt-1">{post.title}</h4>
              <p className="text-xs text-gray-500 mt-2">{post.date}</p>
            </div>
            <MoreVertical size={16} className="text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HRManagement;