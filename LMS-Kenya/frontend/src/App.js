import React, { useEffect, useState } from 'react';
function App() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/courses/')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl">WABUKOWABUKO SCHOOL LMS</h1>
      <ul>{courses.map(course => <li key={course.id}>{course.name}</li>)}</ul>
    </div>
  );
}
export default App;
