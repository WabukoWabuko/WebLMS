// /home/wabukowabuko/Desktop/WebLMS/frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function Home() {
  return <h2 className="text-2xl font-bold text-center mt-10">Welcome to WebLMS</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold">WebLMS</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes for dashboards later */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
