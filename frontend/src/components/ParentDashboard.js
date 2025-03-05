// /home/wabukowabuko/Desktop/WebLMS/frontend/src/components/ParentDashboard.js
import React from 'react';

function ParentDashboard({ userCode }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Parent Dashboard</h1>
      <p>Welcome, Parent! Your User Code: {userCode}. View your child’s progress and receive updates.</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Child’s Progress
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
          Check Updates
        </button>
      </div>
    </div>
  );
}

export default ParentDashboard;
