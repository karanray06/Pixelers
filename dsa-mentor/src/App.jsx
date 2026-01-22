import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Dashboard from './pages/Dashboard';
import ProblemSolver from './pages/ProblemSolver';

function App() {
  return (
    <Router>
      <div className="min-h-screen text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/solve" element={<ProblemSolver />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
