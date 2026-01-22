import React from 'react';

const CodeEditor = ({ code, setCode, language = 'javascript' }) => {
    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10 font-mono text-sm">
            <div className="flex justify-between items-center px-4 py-2 bg-[#252526] border-b border-white/5">
                <span className="text-slate-400 text-xs">main.{language === 'javascript' ? 'js' : 'py'}</span>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
            </div>
            <div className="flex-1 relative">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full bg-transparent text-slate-300 p-4 resize-none outline-none font-mono leading-relaxed"
                    spellCheck="false"
                />
                {/* Placeholder for line numbers or syntax highlighting overlay if we were fancy */}
            </div>
        </div>
    );
};

export default CodeEditor;
