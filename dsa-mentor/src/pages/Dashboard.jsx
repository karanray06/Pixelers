import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/StatsCard';
import { Trophy, Target, Zap, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2'; // Would need chart.js, but I'll use simple CSS bars for now to avoid dependency hell if not needed.
// Actually, simple CSS bars are safer.

const Dashboard = () => {
    // Mock Data
    const weakAreas = [
        { topic: 'Dynamic Programming', score: 45 },
        { topic: 'Graphs', score: 55 },
        { topic: 'Heaps', score: 60 }
    ];

    const strengthAreas = [
        { topic: 'Arrays', score: 95 },
        { topic: 'Strings', score: 90 },
        { topic: 'Hash Maps', score: 88 }
    ];

    return (
        <div className="container mx-auto px-4 py-24">
            <h1 className="text-3xl font-bold mb-8">Performance Dashboard</h1>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatsCard icon={Trophy} value="1,250" label="Global Rank" color="yellow" />
                <StatsCard icon={Zap} value="12" label="Current Streak" color="blue" />
                <StatsCard icon={Target} value="85%" label="Accuracy" color="green" />
                <StatsCard icon={Clock} value="45h" label="Practice Time" color="violet" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weakness Analysis */}
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <AlertCircle className="text-red-400" /> Areas for Improvement
                    </h3>
                    <div className="space-y-6">
                        {weakAreas.map((area) => (
                            <div key={area.topic}>
                                <div className="flex justify-between mb-2 text-sm">
                                    <span>{area.topic}</span>
                                    <span className="text-red-400">{area.score}% Mastery</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-red-400 rounded-full"
                                        style={{ width: `${area.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-outline w-full mt-6 text-sm">Generate Practice Plan</button>
                </div>

                {/* Strengths */}
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <TrendingUp className="text-green-400" /> Strongest Topics
                    </h3>
                    <div className="space-y-6">
                        {strengthAreas.map((area) => (
                            <div key={area.topic}>
                                <div className="flex justify-between mb-2 text-sm">
                                    <span>{area.topic}</span>
                                    <span className="text-green-400">{area.score}% Mastery</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-400 rounded-full"
                                        style={{ width: `${area.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-outline w-full mt-6 text-sm">Challenge Mode (Hard)</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
