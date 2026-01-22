import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DSARoadmap from './pages/DSARoadmap';
import PracticeProblems from './pages/PracticeProblems';
import ProblemSolver from './pages/ProblemSolver';
import MockInterview from './pages/MockInterview';
import Dashboard from './pages/Dashboard';
import AIChat from './components/AIChat';

function App() {
    return (
        <Router basename="/Pixelers">
            <Navbar />
            <AIChat />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/roadmap" element={<DSARoadmap />} />
                <Route path="/practice" element={<PracticeProblems />} />
                <Route path="/problem/:problemId" element={<ProblemSolver />} />
                <Route path="/interview" element={<MockInterview />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
