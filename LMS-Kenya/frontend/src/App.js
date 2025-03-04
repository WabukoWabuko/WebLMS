import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('student1');
  const [password, setPassword] = useState('pass123');
  const [error, setError] = useState('');

  // Login function to get JWT token
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json', // Ensure JSON format
        },
      });
      setToken(response.data.access);
      setUser({ role: 'student', username: username }); // Mock user role
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Login failed: Invalid username or password');
      console.error('Login error:', err);
    }
  };

  // Fetch courses with token
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8000/api/courses/', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setCourses(res.data))
        .catch(err => console.error('Courses fetch error:', err));
    }
  }, [token]);

  // Enroll in a course
  const handleEnroll = (courseId) => {
    if (!token) {
      setError('Please log in first!');
      return;
    }
    axios.post('http://localhost:8000/api/enroll/', { course_id: courseId }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => alert('Enrolled!'))
      .catch(err => {
        setError('Enrollment failed: ' + (err.response?.data?.error || 'Unknown error'));
        console.error('Enroll error:', err);
      });
  };

  // Initial login on mount (remove this for a real app, add a form instead)
  useEffect(() => {
    handleLogin();
  }, []);

  if (!user) return <div>{error || 'Loading...'}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl">Welcome, {user.username} ({user.role})</h1>
      {error && <p className="text-red-500">{error}</p>}
      {user.role === 'student' && (
        <div>
          <h2 className="text-xl mt-4">Available Courses</h2>
          <ul>
            {courses.map(course => (
              <li key={course.id} className="my-2">
                {course.name} - {course.teacher}
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="ml-4 bg-blue-500 text-white p-1 rounded"
                >
                  Enroll
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {user.role === 'teacher' && <p>Create courses here (coming soon!)</p>}
    </div>
  );
}

export default App;
