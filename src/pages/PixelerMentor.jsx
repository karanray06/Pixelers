import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PixelerMentor() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am your Pixeler AI Mentor. What topic in DSA shall we explore today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');

    const topics = [
        { name: 'Arrays', status: 'Mastered' },
        { name: 'Strings', status: 'In Progress' },
        { name: 'Linked Lists', status: 'Not Started' },
        { name: 'Trees', status: 'Not Started' }
    ];

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
        setInput('');
    };

    return (
        <div className="pt-28 pb-20 bg-[#f7f7f7] min-h-screen">
            <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 h-[750px]">

                {/* Left Sidebar: Learning Context */}
                <aside className="hidden lg:flex flex-col gap-6 h-full">
                    <div className="edu-panel p-6 flex-1 overflow-y-auto bg-white">
                        <h3 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-xs">Curriculum</h3>
                        <div className="space-y-2">
                            {topics.map(t => (
                                <button key={t.name} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-[#2f8d46]/5 hover:text-[#2f8d46] rounded-md transition-all group">
                                    <div className="flex justify-between items-center">
                                        <span>{t.name}</span>
                                        <span className="text-[8px] opacity-0 group-hover:opacity-100 uppercase tracking-widest">{t.status}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content: Chat Interface */}
                <main className="lg:col-span-2 edu-panel bg-white flex flex-col h-full overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#2f8d46] flex items-center justify-center text-white font-black">AI</div>
                            <div>
                                <h2 className="font-black text-slate-800">Pixeler Mentor</h2>
                                <p className="text-[10px] font-bold text-[#2f8d46] uppercase tracking-widest">Online • AI Assistant</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#fcfcfc]">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-5 rounded-2xl ${msg.sender === 'user' ? 'bg-[#2f8d46] text-white shadow-md' : 'bg-white border border-gray-100 shadow-sm text-slate-700'
                                    }`}>
                                    <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-white">
                        <form className="flex gap-4" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                            <input
                                type="text"
                                placeholder="Ask a question about DSA..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="input-edu"
                            />
                            <button type="submit" className="btn-edu-primary px-8">Send</button>
                        </form>
                    </div>
                </main>

                {/* Right Sidebar: Resources */}
                <aside className="hidden lg:flex flex-col gap-6 h-full">
                    <div className="edu-panel p-6 bg-[#2f8d46]/5 border-[#2f8d46]/10 h-full overflow-y-auto bg-white">
                        <h3 className="font-black text-[#2f8d46] mb-4 uppercase tracking-widest text-xs">AI Suggested Resources</h3>
                        <div className="space-y-4">
                            {['Understanding O(n)', 'Visualizing Graphs', 'Greedy vs DP', 'Heaps in depth'].map(r => (
                                <div key={r} className="p-4 bg-white rounded-lg border border-[#2f8d46]/10 hover:border-[#2f8d46]/30 cursor-pointer transition-all">
                                    <p className="text-sm font-bold text-slate-800 mb-1">{r}</p>
                                    <p className="text-[10px] font-bold text-[#2f8d46] uppercase tracking-widest">5 min read</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
