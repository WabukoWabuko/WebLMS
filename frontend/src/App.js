// WebLMS/frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function Home() {
  return <h2>Welcome to WebLMS</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>WebLMS</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
