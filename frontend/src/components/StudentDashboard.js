// /home/wabukowabuko/Desktop/WebLMS/frontend/src/components/StudentDashboard.js
import React from 'react';

function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <p>Welcome, Student! Access your lessons and track progress here.</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Lessons
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
          Check Progress
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
