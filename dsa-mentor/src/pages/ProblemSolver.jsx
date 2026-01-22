import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import AIMentorChat from '../components/AIMentorChat';
import { Play, Send, MessageSquare, ChevronLeft, Settings, Maximize2 } from 'lucide-react';

const ProblemSolver = () => {
    //   const { id } = useParams();
    const [code, setCode] = useState('// Write your solution here...\n\nfunction solve() {\n  \n}');
    const [isChatOpen, setIsChatOpen] = useState(true);

    return (
        <div className="h-screen pt-16 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="h-14 bg-[#1e1e1e] border-b border-white/10 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Link to="/practice" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm">
                        <ChevronLeft size={16} /> Problem List
                    </Link>
                    <div className="h-4 w-[1px] bg-white/10"></div>
                    <h2 className="font-semibold text-sm text-white">Two Sum</h2>
                </div>

                <div className="flex items-center gap-3">
                    <button className="btn btn-outline py-1.5 px-4 text-xs flex items-center gap-2">
                        <Play size={14} /> Run
                    </button>
                    <button className="btn btn-primary py-1.5 px-4 text-xs flex items-center gap-2">
                        <Send size={14} /> Submit
                    </button>
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className={`p-2 rounded-lg transition-colors ${isChatOpen ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                        <MessageSquare size={18} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Problem Description */}
                <div className="w-1/3 min-w-[300px] bg-[#0f172a] border-r border-white/10 p-6 overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-4 text-white">1. Two Sum</h1>
                    <div className="flex gap-2 mb-6">
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30">Easy</span>
                        <span className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded">Arrays</span>
                        <span className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded">Hash Table</span>
                    </div>

                    <div className="prose prose-invert prose-sm max-w-none">
                        <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
                        <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>

                        <h3 className="text-white font-bold mt-6 mb-2">Example 1:</h3>
                        <pre className="bg-slate-900 p-3 rounded-lg border border-white/5">
                            Input: nums = [2,7,11,15], target = 9{'\n'}
                            Output: [0,1]{'\n'}
                            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                        </pre>

                        <h3 className="text-white font-bold mt-6 mb-2">Constraints:</h3>
                        <ul className="list-disc pl-4 space-y-1 text-slate-400">
                            <li>2 &lt;= nums.length &lt;= 10^4</li>
                            <li>-10^9 &lt;= nums[i] &lt;= 10^9</li>
                            <li>-10^9 &lt;= target &lt;= 10^9</li>
                        </ul>
                    </div>
                </div>

                {/* Right Panel: Editor */}
                <div className="flex-1 bg-[#1e1e1e] relative">
                    <CodeEditor code={code} setCode={setCode} />
                </div>
            </div>

            {/* Floating Chat */}
            <AnimatePresence>
                {isChatOpen && <AIMentorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default ProblemSolver;
