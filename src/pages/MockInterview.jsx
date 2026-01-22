import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MockInterview() {
    const [interviewState, setInterviewState] = useState('start'); // start, active, review, complete
    const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({
        communication: 0,
        logic: 0,
        optimization: 0,
        confidence: 0
    });

    const questions = [
        {
            id: 1,
            question: 'Design an LRU Cache with O(1) get and put operations.',
            category: 'Design',
            time: 300
        },
        {
            id: 2,
            question: 'Given a string, find the longest substring without repeating characters.',
            category: 'String',
            time: 300
        },
        {
            id: 3,
            question: 'Implement a function to serialize and deserialize a binary tree.',
            category: 'Tree',
            time: 300
        }
    ];

    useEffect(() => {
        if (interviewState !== 'active') return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setInterviewState('complete');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [interviewState]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startInterview = () => {
        setInterviewState('active');
        setTimeLeft(900);
        setCurrentQuestion(0);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setInterviewState('review');
        }
    };

    return (
        <div className="pt-20 pb-16 px-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                    {/* Start Screen */}
                    {interviewState === 'start' && (
                        <motion.div
                            key="start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-12">
                                <motion.h1
                                    initial={{ y: -20 }}
                                    animate={{ y: 0 }}
                                    className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-4"
                                >
                                    Mock Technical Interview
                                </motion.h1>
                                <p className="text-xl text-gray-300">
                                    Practice real interview questions with AI feedback
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="glass-panel p-6"
                                >
                                    <div className="text-4xl mb-3">⏱️</div>
                                    <h3 className="font-bold mb-2">15 Minutes</h3>
                                    <p className="text-gray-400 text-sm">
                                        {questions.length} questions, {Math.floor(900 / questions.length)} sec each
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-panel p-6"
                                >
                                    <div className="text-4xl mb-3">🤖</div>
                                    <h3 className="font-bold mb-2">AI Feedback</h3>
                                    <p className="text-gray-400 text-sm">
                                        Real-time analysis on code, approach & communication
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="glass-panel p-6"
                                >
                                    <div className="text-4xl mb-3">📊</div>
                                    <h3 className="font-bold mb-2">Scorecard</h3>
                                    <p className="text-gray-400 text-sm">
                                        Communication, Logic, Optimization & Confidence
                                    </p>
                                </motion.div>
                            </div>

                            <div className="glass-panel p-8 space-y-4">
                                <h3 className="text-xl font-bold mb-4">Interview Format</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex gap-3">
                                        <span className="text-blue-400">✓</span>
                                        <span>3 medium-level coding questions</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-400">✓</span>
                                        <span>5 minutes per question (15 minutes total)</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-400">✓</span>
                                        <span>Think out loud - explain your approach</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-400">✓</span>
                                        <span>Live AI feedback as you code</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-400">✓</span>
                                        <span>Detailed scorecard at the end</span>
                                    </li>
                                </ul>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startInterview}
                                className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-lg text-lg hover:shadow-lg hover:shadow-blue-600/50 transition-all"
                            >
                                Start Interview
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Active Interview */}
                    {interviewState === 'active' && (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid lg:grid-cols-3 gap-6"
                        >
                            {/* Main Question Panel */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Timer */}
                                <motion.div
                                    className="glass-panel p-4 flex items-center justify-between sticky top-20 z-10"
                                    animate={{
                                        backgroundColor: timeLeft < 60 ? 'rgba(220, 38, 38, 0.1)' : 'rgba(15, 23, 42, 0.4)'
                                    }}
                                >
                                    <span className="text-lg font-bold">
                                        Question {currentQuestion + 1}/{questions.length}
                                    </span>
                                    <motion.div
                                        animate={{
                                            color: timeLeft < 60 ? '#dc2626' : '#60a5fa',
                                            scale: timeLeft < 60 ? [1, 1.1, 1] : 1
                                        }}
                                        transition={{
                                            color: { duration: 0.3 },
                                            scale: { duration: 0.5, repeat: timeLeft < 60 ? Infinity : 0 }
                                        }}
                                        className="text-3xl font-bold tabular-nums"
                                    >
                                        {formatTime(timeLeft)}
                                    </motion.div>
                                </motion.div>

                                {/* Question */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-panel p-8"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className="text-3xl font-bold mb-2">
                                                {questions[currentQuestion].question}
                                            </h2>
                                            <span className="inline-block px-3 py-1 bg-blue-600/30 text-blue-300 rounded-lg text-sm">
                                                {questions[currentQuestion].category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 mt-6">
                                        <h3 className="font-bold mb-4">Your Approach</h3>
                                        <textarea
                                            className="w-full h-32 bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-gray-100 font-mono text-sm focus:outline-none focus:border-blue-500/50 resize-none"
                                            placeholder="Explain your approach and think out loud..."
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* AI Feedback Panel */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-panel p-6 sticky top-20"
                            >
                                <h3 className="text-xl font-bold mb-4">🤖 AI Feedback</h3>

                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-blue-600/20 border border-blue-500/30 p-3 rounded-lg"
                                    >
                                        <p className="text-sm text-blue-200">
                                            <span className="font-bold">Great start!</span> Your approach using a hash map is optimal. Consider edge cases.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="bg-yellow-600/20 border border-yellow-500/30 p-3 rounded-lg"
                                    >
                                        <p className="text-sm text-yellow-200">
                                            <span className="font-bold">Tip:</span> Remember to discuss time and space complexity upfront.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-green-600/20 border border-green-500/30 p-3 rounded-lg"
                                    >
                                        <p className="text-sm text-green-200">
                                            <span className="font-bold">Strong communication!</span> You explained your logic clearly.
                                        </p>
                                    </motion.div>
                                </div>

                                <button
                                    onClick={nextQuestion}
                                    className="w-full mt-6 px-4 py-3 bg-green-600/30 text-green-300 rounded-lg font-semibold hover:bg-green-600/50 transition-all"
                                >
                                    Next Question →
                                </button>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Review Screen */}
                    {interviewState === 'review' && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-8"
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="text-6xl mb-4"
                            >
                                ⏳
                            </motion.div>
                            <h2 className="text-3xl font-bold">Interview Complete!</h2>
                            <p className="text-gray-300 text-lg">
                                Processing your responses and generating detailed feedback...
                            </p>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-400 rounded-full mx-auto"
                            />
                        </motion.div>
                    )}

                    {/* Scorecard */}
                    {interviewState === 'complete' && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-12">
                                <motion.h1
                                    initial={{ y: -20 }}
                                    animate={{ y: 0 }}
                                    className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4"
                                >
                                    Interview Complete! 🎉
                                </motion.h1>
                                <p className="text-xl text-gray-300">
                                    Here's your detailed performance scorecard
                                </p>
                            </div>

                            {/* Scorecards */}
                            <div className="grid md:grid-cols-2 gap-6 mb-12">
                                {[
                                    { label: 'Communication', score: 85, icon: '💬' },
                                    { label: 'Logic', score: 92, icon: '🧠' },
                                    { label: 'Optimization', score: 78, icon: '⚡' },
                                    { label: 'Confidence', score: 88, icon: '😎' }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="glass-panel p-6"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="text-3xl mb-2">{item.icon}</div>
                                                <h3 className="text-lg font-bold">{item.label}</h3>
                                            </div>
                                            <div className="text-4xl font-bold text-blue-400">{item.score}</div>
                                        </div>

                                        <div className="bg-slate-700/30 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.score}%` }}
                                                transition={{ duration: 1, delay: idx * 0.1 }}
                                                className="h-full bg-gradient-to-r from-blue-600 to-violet-600"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Feedback */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="glass-panel p-8 space-y-6"
                            >
                                <h2 className="text-2xl font-bold">Key Feedback</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <span className="text-2xl">✅</span>
                                        <div>
                                            <h4 className="font-bold mb-1">Excellent Problem-Solving Approach</h4>
                                            <p className="text-gray-300">You demonstrated strong algorithmic thinking and optimal solution choices.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-2xl">📈</span>
                                        <div>
                                            <h4 className="font-bold mb-1">Areas to Improve</h4>
                                            <p className="text-gray-300">Work on discussing trade-offs earlier and provide more detailed complexity analysis.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-2xl">🎯</span>
                                        <div>
                                            <h4 className="font-bold mb-1">Next Steps</h4>
                                            <p className="text-gray-300">Practice more system design questions and mock interviews. You're ready for real interviews!</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setInterviewState('start')}
                                    className="flex-1 px-8 py-4 bg-blue-600/30 text-blue-300 font-bold rounded-lg hover:bg-blue-600/50 transition-all"
                                >
                                    Try Another Interview
                                </button>
                                <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-600/50 transition-all">
                                    Share Results
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
