import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, LayoutDashboard, BookOpen, UserCircle, Menu, X } from 'lucide-react';
import { auth, googleProvider } from '../firebase'; // Import auth
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            unsubscribe();
        };
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleLogout = () => signOut(auth);

    const navLinks = [
        { name: 'Roadmap', path: '/roadmap', icon: <BookOpen size={18} /> },
        { name: 'Practice', path: '/practice', icon: <Code2 size={18} /> },
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel border-b border-white/10' : 'bg-transparent'
            }`}
            style={{ backdropFilter: isScrolled ? 'blur(12px)' : 'none' }}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                        <Code2 size={20} className="text-white" />
                    </div>
                    <span className="text-gradient">DSA Maven</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-blue-400' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Button */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-white/20" />
                            <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-white">Sign Out</button>
                        </div>
                    ) : (
                        <button onClick={handleLogin} className="btn btn-primary text-sm px-5 py-2">
                            Get Started
                        </button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0f172a] border-b border-white/10 p-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5"
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <button onClick={handleLogout} className="text-left text-slate-300 p-2">Sign Out</button>
                    ) : (
                        <button onClick={handleLogin} className="btn btn-primary w-full justify-center">Get Started</button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
