// /home/wabukowabuko/Desktop/WebLMS/frontend/src/components/AdminDashboard.js
import React from 'react';

function AdminDashboard({ userCode }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! Your User Code: {userCode}. Manage users, settings, and reports here.</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Manage Users
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
          View Reports
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
