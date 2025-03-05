// /home/wabukowabuko/Desktop/WebLMS/frontend/src/components/LoginRegister.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginRegister({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    user_code: '',
    password: '',
    email: '',
    phone_number: '',
    role: 'student',  // Default role, user can change
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login with username, user_code, or both
        const response = await axios.post('http://localhost:8000/api/login/', {
          username: credentials.username || undefined,
          user_code: credentials.user_code || undefined,
          password: credentials.password,
        });
        const { token, role, user_code } = response.data;
        onLogin(role, token, user_code);
      } else {
        // Register new user
        const response = await axios.post('http://localhost:8000/api/register/', {
          username: credentials.username,
          password: credentials.password,
          email: credentials.email,
          phone_number: credentials.phone_number,
          role: credentials.role,
          user_code: credentials.user_code || undefined,  // Optional if auto-generated
        });
        const { token, role, user_code } = response.data.user;
        onLogin(role, token, user_code);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login to WebLMS' : 'Register for WebLMS'}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Action</label>
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); setCredentials({ username: '', user_code: '', password: '', email: '', phone_number: '', role: 'student' }); }}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={credentials.phone_number}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Optional"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  value={credentials.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">User Code (Optional, leave blank for auto-generate)</label>
                <input
                  type="text"
                  name="user_code"
                  value={credentials.user_code}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., T-1234"
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">User Code (Optional)</label>
              <input
                type="text"
                name="user_code"
                value={credentials.user_code}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., T-1234"
              />
            </div>
          )}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
