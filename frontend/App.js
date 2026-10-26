import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Pointing API requests to your live Render backend
const API_BASE_URL = "https://student-database-7xik.onrender.com";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', department: '', gpa: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/students/${editingId}`, {
          ...formData,
          gpa: parseFloat(formData.gpa) || 0.0
        });
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE_URL}/api/students`, {
          ...formData,
          gpa: parseFloat(formData.gpa) || 0.0
        });
      }
      setFormData({ name: '', email: '', department: '', gpa: '' });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Operation failed. Check inputs or unique email!");
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({ name: student.name, email: student.email, department: student.department, gpa: student.gpa });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Filter students based on search
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats safely by parsing GPA into floats
  const totalStudents = students.length;
  const avgGpa = totalStudents > 0 
    ? (students.reduce((acc, s) => acc + parseFloat(s.gpa || 0), 0) / totalStudents).toFixed(2) 
    : '0.00';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white border border-slate-200 shadow-sm rounded-2xl p-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎓</span>
              <h1 className="text-2xl font-bold text-slate-900">Student Cloud Management System</h1>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Cloud Connected (AWS RDS & Render)
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Enrolled Students</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{totalStudents}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Average Department GPA</p>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{avgGpa}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              {editingId ? 'Edit Student Details' : 'Add New Student'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                <input type="text" name="name" placeholder="e.g. Jane Doe" value={formData.name} onChange={handleInputChange} required 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address</label>
                <input type="email" name="email" placeholder="e.g. jane@university.edu" value={formData.email} onChange={handleInputChange} required 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Department</label>
                <input type="text" name="department" placeholder="e.g. Computer Science" value={formData.department} onChange={handleInputChange} required 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">GPA</label>
                <input type="number" step="0.01" name="gpa" placeholder="e.g. 3.85" value={formData.gpa} onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-white text-sm transition shadow-sm ${editingId ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                  {editingId ? 'Update Student' : 'Save Student'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', email: '', department: '', gpa: '' }); }} 
                    className="py-2.5 px-4 bg-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-300 transition">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-lg font-bold text-slate-900">Student Directory</h2>
              <input 
                type="text" 
                placeholder="Search by name or department..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Name & Email</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">GPA</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400 text-sm">
                        No students found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-800 text-sm">{s.name}</p>
                          <p className="text-xs text-slate-400">{s.email}</p>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">
                          <span className="bg-slate-100 px-2.5 py-1 rounded-md text-xs font-medium text-slate-700">
                            {s.department}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-indigo-600">
                          {parseFloat(s.gpa).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button onClick={() => handleEdit(s)} className="px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md text-xs font-medium transition">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(s.id)} className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-md text-xs font-medium transition">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;