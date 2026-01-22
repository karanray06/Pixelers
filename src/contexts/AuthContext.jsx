import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        return signInWithPopup(auth, provider).then(async (result) => {
            // Create user document in Firestore if doesn't exist
            const userRef = doc(db, 'users', result.user.uid);
            const userDoc = await getDoc(userRef);
            
            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    createdAt: new Date(),
                    problems: [],
                    stats: {
                        totalProblems: 0,
                        topicStats: {},
                        difficultyStats: {}
                    }
                });
            }
            return result;
        }).catch(error => {
            console.error("Google Sign-in Error:", error.code, error.message);
            throw error;
        });
    }

    function logout() {
        localStorage.removeItem('demoUser');
        return signOut(auth).catch(error => {
            console.error("Sign out error:", error);
        });
    }

    useEffect(() => {
        // Check for demo user first
        const demoUser = localStorage.getItem('demoUser');
        if (demoUser) {
            try {
                setCurrentUser(JSON.parse(demoUser));
                setLoading(false);
                return;
            } catch (e) {
                console.error("Demo user parse error:", e);
            }
        }

        // Then check Firebase auth
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        }, (error) => {
            console.error("Auth state change error:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loginWithGoogle,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
