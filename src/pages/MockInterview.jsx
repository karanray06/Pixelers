import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MockInterview() {
    const [selectedInterviewer, setSelectedInterviewer] = useState(null);

    const interviewers = [
        { id: 1, name: 'Google Alpha', role: 'Software Engineer III', cost: 'Free', rating: 4.9, icon: '🔍' },
        { id: 2, name: 'Meta Core', role: 'Staff Engineer', cost: 'Free', rating: 4.8, icon: '📱' },
        { id: 3, name: 'Amazon Prime', role: 'SDE II', cost: 'Free', rating: 4.7, icon: '📦' },
        { id: 4, name: 'Netflix Flow', role: 'Senior Architect', cost: 'Free', rating: 4.9, icon: '🎬' }
    ];

    const upcomingSessions = [
        { id: 1, type: 'Technical Round', date: 'Tomorrow, 10:00 AM', status: 'Confirmed' },
        { id: 2, type: 'System Design', date: 'Oct 28, 4:00 PM', status: 'Pending' }
    ];

    return (
        <div className="pt-28 pb-20 bg-[#f7f7f7] min-h-screen">
            <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Sidebar: Prep Progress */}
                <aside className="space-y-6">
                    <div className="edu-panel p-6">
                        <h3 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-xs">Interview Prep</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#f7f7f7] rounded-lg">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Success Meta</p>
                                <p className="text-xl font-black text-slate-800">87th Percentile</p>
                            </div>
                            <div className="p-4 bg-[#f7f7f7] rounded-lg">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mock Sessions</p>
                                <p className="text-xl font-black text-slate-800">12 Completed</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content: Interviewers Grid */}
                <main className="lg:col-span-2 space-y-8">
                    <div className="edu-panel p-8">
                        <h1 className="text-3xl font-black text-slate-800 mb-2">Technical Mock Interviews</h1>
                        <p className="text-sm font-bold text-slate-500 mb-10">Select an AI profile to begin your mock session.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {interviewers.map(interviewer => (
                                <div
                                    key={interviewer.id}
                                    className="edu-card group relative overflow-hidden"
                                    onClick={() => setSelectedInterviewer(interviewer)}
                                >
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="w-16 h-16 rounded-xl bg-[#f7f7f7] flex items-center justify-center text-3xl group-hover:bg-[#2f8d46]/10 transition-colors">
                                            {interviewer.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-[#333333] group-hover:text-[#2f8d46] transition-colors">{interviewer.name}</h3>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{interviewer.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                        <span className="text-xs font-black text-[#2f8d46] uppercase tracking-widest">{interviewer.cost}</span>
                                        <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                                            <span className="text-amber-400">★</span> {interviewer.rating}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar: Upcoming */}
                <aside className="space-y-6">
                    <div className="edu-panel p-6">
                        <h3 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-xs">Upcoming Sessions</h3>
                        <div className="space-y-4">
                            {upcomingSessions.map(session => (
                                <div key={session.id} className="p-4 border border-gray-100 rounded-lg group cursor-pointer hover:border-[#2f8d46]/30 transition-all">
                                    <h4 className="font-black text-slate-800 text-sm mb-1">{session.type}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{session.date}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${session.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                            }`}>
                                            {session.status}
                                        </span>
                                        <button className="text-[8px] font-black uppercase text-[#2f8d46] hover:underline">Reschedule</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 btn-edu-outline h-10 text-xs">Schedule New</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
