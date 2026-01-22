import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Target, Zap, Trophy, TrendingUp, CheckCircle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-20 pb-10">

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
                    >
                        🚀 AI-Powered DSA Prep
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold leading-tight mb-6"
                    >
                        Master <span className="text-gradient">DSA</span> with Your <br />
                        Personal <span className="text-gradient">AI Mentor</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto md:mx-0"
                    >
                        Learn, practice, analyze, and crack FAANG interviews faster with personalized AI guidance.
                        Get instant feedback, optimized solutions, and smart roadmaps.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <button onClick={() => navigate('/practice')} className="btn btn-primary text-lg px-8 py-3">
                            Start Learning Free
                        </button>
                        <button className="btn btn-outline text-lg px-8 py-3">
                            View Roadmap
                        </button>
                    </motion.div>
                </div>

                {/* Hero Visual/Illustration */}
                <div className="flex-1 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-violet-600 opacity-30 blur-3xl rounded-full"></div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative glass-panel p-6 md:p-8"
                    >
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs text-slate-500 font-mono">problem_solver.js</span>
                        </div>

                        <div className="font-mono text-sm md:text-base space-y-2">
                            <div className="text-pink-400">function <span className="text-blue-400">solveTwoSum</span>(nums, target) {'{'}</div>
                            <div className="pl-4 text-slate-400">// AI Hint: Try using a Hash Map for O(n)</div>
                            <div className="pl-4"><span className="text-violet-400">const</span> map = <span className="text-violet-400">new</span> Map();</div>
                            <div className="pl-4 text-slate-300">for (let i = 0; i &lt; nums.length; i++) {'{'}</div>
                            <div className="pl-8 text-slate-300">...</div>
                            <div className="pl-4 text-slate-300">{'}'}</div>
                            <div className="text-slate-300">{'}'}</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard icon={CheckCircle} value="120+" label="Problems Solved" color="blue" />
                    <StatsCard icon={Target} value="85%" label="Accuracy Score" color="green" />
                    <StatsCard icon={Zap} value="12" label="Day Streak" color="yellow" />
                    <StatsCard icon={Trophy} value="72%" label="Interview Ready" color="violet" />
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose <span className="text-gradient">DSA Mentor</span>?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Experience a new way of learning algorithms with cutting-edge AI technology designed to mimic a real human mentor.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        title="AI DSA Mentor"
                        description="Get instant help, hints, and explanations without seeing the full solution immediately."
                        icon={Brain}
                        delay={0.1}
                    />
                    <FeatureCard
                        title="Smart Roadmap"
                        description="A personalized learning path that adapts to your weak areas and progress."
                        icon={TrendingUp} // Changed icon to verify import
                        delay={0.2}
                    />
                    <FeatureCard
                        title="Code Analysis"
                        description="Get real-time time & space complexity analysis of your code snippets."
                        icon={Activity}
                        delay={0.3}
                    />
                    <FeatureCard
                        title="Mock Interviews"
                        description="Simulate real FAANG interview scenarios with AI-driven feedback."
                        icon={Code2}
                        delay={0.4}
                    />
                </div>
            </section>

        </div>
    );
};

export default Home;
