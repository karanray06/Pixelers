import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import DSARoadmap from './pages/DSARoadmap';
import PracticeProblems from './pages/PracticeProblems';
import ProblemSolver from './pages/ProblemSolver';
import MockInterview from './pages/MockInterview';
import Dashboard from './pages/Dashboard';
import PixelerMentor from './pages/PixelerMentor';
import AIChat from './components/AIChat';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <AuthProvider>
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
                    <Route path="/pixeler" element={<PixelerMentor />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
