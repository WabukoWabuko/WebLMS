// /home/wabukowabuko/Desktop/WebLMS/frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import ParentDashboard from './components/ParentDashboard';

function App() {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  // Check localStorage on mount for persisted login
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (role, token) => {
    setRole(role);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole(null);
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">WebLMS</h1>
          {role && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to={`/${role.toLowerCase()}`} />
                ) : (
                  <Login onLogin={(role, token) => handleLogin(role, token)} />
                )
              }
            />
            <Route path="/admin" element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/teacher" element={role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/" />} />
            <Route path="/student" element={role === 'student' ? <StudentDashboard /> : <Navigate to="/" />} />
            <Route path="/parent" element={role === 'parent' ? <ParentDashboard /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
