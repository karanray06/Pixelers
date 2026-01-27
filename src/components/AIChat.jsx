import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateChatResponse } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Welcome to the elite core. I am Pixeler. How shall we optimize your logic today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const history = messages.filter(m => m.sender !== 'error');
            const response = await generateChatResponse(history, input);

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: response,
                sender: 'bot',
                timestamp: new Date()
            }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Signal interrupted. Please re-initialize query.",
                sender: 'error',
                timestamp: new Date()
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button - Minimalist */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-10 right-10 z-[100] w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>✕</motion.span>
                    ) : (
                        <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                            <img src="/assets/mascot.png" alt="bot" className="w-10 h-10 object-contain grayscale invert" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Interface - Sidebar style */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-[450px] max-w-full z-[90] bg-black/90 backdrop-blur-3xl border-l border-white/[0.05] shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
                    >
                        <div className="flex flex-col h-full pt-20">
                            {/* Header */}
                            <div className="px-10 py-8 border-b border-white/[0.05]">
                                <h3 className="text-2xl font-black tracking-tighter premium-text">Pixeler Interface</h3>
                                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-2">v4.0.2 • Neural Core Active</p>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10 custom-scrollbar">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-6 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        {msg.sender === 'bot' && (
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center p-2">
                                                <img src="/assets/mascot.png" alt="P" className="w-full h-full object-contain" />
                                            </div>
                                        )}
                                        <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            <div className={`prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed ${msg.sender === 'user' ? 'text-white font-bold' : ''}`}>
                                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                            </div>
                                            <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-4">
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                {loading && (
                                    <div className="flex gap-2 p-1">
                                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                                        <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-10 border-t border-white/[0.05]">
                                <form onSubmit={handleSendMessage} className="relative group">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Command Pixeler..."
                                        disabled={loading}
                                        className="w-full bg-transparent border-b border-white/10 py-4 pr-12 text-white font-medium placeholder-slate-700 focus:outline-none focus:border-white transition-all text-lg"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading || !input.trim()}
                                        className="absolute right-0 top-4 text-white opacity-40 hover:opacity-100 transition-opacity"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </form>
                                <p className="mt-8 text-[8px] font-bold text-slate-700 uppercase tracking-[0.3em] text-center">Protocol: Secure • Logic: Enforced</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
