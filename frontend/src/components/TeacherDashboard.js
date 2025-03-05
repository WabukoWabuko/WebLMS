// /home/wabukowabuko/Desktop/WebLMS/frontend/src/components/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/courses/', {
      headers: { Authorization: `Token ${token}` },
    })
    .then(response => {
      setCourses(response.data);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to load courses. Check your connection or login.');
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-100 p-6">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-100 p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      <p>Welcome, Teacher! Create courses, manage classes, and send notifications.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p>{course.description}</p>
            <p className="text-gray-600">Created: {new Date(course.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Course
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
          View Classes
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2">
          Notify Parents
        </button>
      </div>
    </div>
  );
}

export default TeacherDashboard;
