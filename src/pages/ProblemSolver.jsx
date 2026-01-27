import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProblemSolver() {
    const [code, setCode] = useState('function solution(arr, target) {\n    // Write your code here using a Hash Map for O(n)\n    const map = new Map();\n    for (let i = 0; i < arr.length; i++) {\n        const complement = target - arr[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(arr[i], i);\n    }\n    return [];\n}');

    return (
        <div className="pt-28 pb-20 bg-[#f7f7f7] min-h-screen">
            <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-140px)]">

                {/* Left Column: Problem Description */}
                <aside className="lg:col-span-1 edu-panel p-8 overflow-y-auto bg-white">
                    <div className="mb-6 flex gap-2">
                        <span className="breadcrumb-item">Arrays</span>
                        <span className="text-slate-300">/</span>
                        <span className="breadcrumb-item text-[#2f8d46]">Two Sum</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 mb-6 font-bold tracking-tight">1. Two Sum</h1>
                    <div className="space-y-6 text-sm leading-relaxed text-slate-600 font-medium">
                        <p>Given an array of integers <code className="text-[#2f8d46] bg-gray-50 px-1 rounded">nums</code> and an integer <code className="text-[#2f8d46] bg-gray-50 px-1 rounded">target</code>, return indices of the two numbers such that they add up to <code className="text-[#2f8d46] bg-gray-50 px-1 rounded">target</code>.</p>

                        <div className="edu-section p-4 rounded-lg my-6">
                            <p className="font-black text-slate-800 mb-2 uppercase text-[10px] tracking-widest">Example 1:</p>
                            <pre className="text-xs bg-white p-3 border border-gray-100 rounded font-mono">
                                Input: nums = [2,7,11,15], target = 9{"\n"}
                                Output: [0,1]{"\n"}
                                Explanation: nums[0] + nums[1] == 9
                            </pre>
                        </div>

                        <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
                        <p>You can return the answer in any order.</p>
                    </div>
                </aside>

                {/* Center Column: Code Editor */}
                <main className="lg:col-span-2 edu-panel bg-[#1e1e1e] flex flex-col overflow-hidden relative shadow-lg">
                    <div className="p-4 bg-[#252526] flex items-center justify-between border-b border-white/5">
                        <div className="flex gap-4">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">solution.js</span>
                            <span className="text-[10px] font-black text-[#2f8d46] uppercase tracking-widest">Javascript</span>
                        </div>
                        <button className="text-[10px] font-black uppercase text-white/40 hover:text-white transition-colors">Copy Code</button>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-1 bg-transparent p-8 text-[#d4d4d4] font-mono text-sm focus:outline-none resize-none leading-relaxed"
                        spellCheck="false"
                    />
                    <div className="p-4 bg-[#252526] border-t border-white/5 flex justify-end gap-4">
                        <button className="px-6 py-2 bg-transparent border border-gray-600 text-gray-400 font-bold rounded hover:text-white hover:border-white transition-all text-[10px] uppercase tracking-widest">Run Code</button>
                        <button className="px-6 py-2 bg-[#2f8d46] text-white font-bold rounded hover:bg-[#256f36] transition-all text-[10px] uppercase tracking-widest">Submit</button>
                    </div>
                </main>

                {/* Right Column: Similar & Notes */}
                <aside className="lg:col-span-1 space-y-6 overflow-y-auto h-full pb-4">
                    <div className="edu-panel p-6 bg-white">
                        <h3 className="font-black text-slate-800 mb-4 uppercase tracking-widest text-xs">Similar Problems</h3>
                        <div className="space-y-4">
                            {['Three Sum', 'Two Sum II', 'Four Sum'].map(p => (
                                <div key={p} className="p-3 bg-[#f7f7f7] rounded-lg border border-transparent hover:border-[#2f8d46]/20 cursor-pointer transition-all">
                                    <p className="text-xs font-bold text-slate-700">{p}</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Medium</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="edu-panel p-6 bg-[#2f8d46]/5 border-[#2f8d46]/10">
                        <h3 className="font-black text-[#2f8d46] mb-3 uppercase tracking-widest text-xs">AI Hint</h3>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                            "Using a Hash Map allows you to check for the existing complement in O(1) time, bringing the total complexiy down from quadratic to linear."
                        </p>
                        <button className="mt-4 text-[10px] font-black uppercase text-[#2f8d46] hover:underline">Show Another Hint</button>
                    </div>

                    <div className="edu-panel p-6 bg-white">
                        <h3 className="font-black text-slate-800 mb-4 uppercase tracking-widest text-xs">My Notes</h3>
                        <textarea
                            placeholder="Store your logic here..."
                            className="w-full h-32 bg-[#f7f7f7] border-0 rounded-lg p-3 text-xs text-slate-600 focus:ring-1 focus:ring-[#2f8d46]/20 outline-none resize-none"
                        />
                    </div>
                </aside>
            </div>
        </div>
    );
}
