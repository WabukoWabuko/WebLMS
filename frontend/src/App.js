// /home/wabukowabuko/Desktop/WebLMS/frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginRegister from './components/LoginRegister';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import ParentDashboard from './components/ParentDashboard';

function App() {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [userCode, setUserCode] = useState(null);

  // Check localStorage on mount for persisted login
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUserCode = localStorage.getItem('user_code');
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setUserCode(storedUserCode);
    }
  }, []);

  const handleLogin = (role, token, userCode) => {
    setRole(role);
    setToken(token);
    setUserCode(userCode);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user_code', userCode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_code');
    setRole(null);
    setToken(null);
    setUserCode(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">WebLMS</h1>
          {role && (
            <div className="flex items-center">
              <span className="mr-4">User Code: {userCode}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
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
                  <LoginRegister onLogin={(role, token, userCode) => handleLogin(role, token, userCode)} />
                )
              }
            />
            <Route path="/admin" element={role === 'admin' ? <AdminDashboard userCode={userCode} /> : <Navigate to="/" />} />
            <Route path="/teacher" element={role === 'teacher' ? <TeacherDashboard userCode={userCode} /> : <Navigate to="/" />} />
            <Route path="/student" element={role === 'student' ? <StudentDashboard userCode={userCode} /> : <Navigate to="/" />} />
            <Route path="/parent" element={role === 'parent' ? <ParentDashboard userCode={userCode} /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
