import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { chatWithMentor } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';

const AIMentorChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hi! I'm your DSA Mentor. Stuck on a problem? Ask me for a hint, complexity analysis, or to explain a concept!" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMsg = { role: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await chatWithMentor(messages, text);
            setMessages(prev => [...prev, { role: 'ai', text: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const QuickAction = ({ label, prompt }) => (
        <button
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="text-xs bg-blue-500/10 text-blue-300 px-3 py-1.5 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-colors whitespace-nowrap"
        >
            {label}
        </button>
    );

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] glass-panel flex flex-col shadow-2xl z-50 overflow-hidden border-t-2 border-t-blue-500"
        >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-slate-900/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                        <Bot size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">DSA Mentor AI</h3>
                        <span className="text-xs text-green-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
                        </span>
                    </div>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                    <X size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/30">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-700 text-slate-300'
                            }`}>
                            {msg.role === 'ai' ? <Sparkles size={14} /> : <User size={14} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-slate-800 text-slate-200 rounded-bl-none border border-white/5'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                            <Sparkles size={14} />
                        </div>
                        <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-white/5 text-slate-400 text-xs italic">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-2 flex gap-2 overflow-x-auto no-scrollbar bg-slate-900/50 border-t border-white/5">
                <QuickAction label="Give me a hint" prompt="Can you give me a small hint for this problem without solving it?" />
                <QuickAction label="Time Complexity?" prompt="What would be the time complexity of the optimal solution?" />
                <QuickAction label="Explain Logic" prompt="Can you explain the logic behind this problem like I'm a beginner?" />
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-900/80 border-t border-white/10">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about your code..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-full py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 rounded-full text-white disabled:opacity-50 disabled:bg-slate-700 hover:bg-blue-500 transition-colors"
                    >
                        <Send size={14} />
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default AIMentorChat;
