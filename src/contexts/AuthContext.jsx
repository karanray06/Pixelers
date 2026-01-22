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

    async function loginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            
            console.log("Initiating Google Sign-In...");
            const result = await signInWithPopup(auth, provider);
            
            console.log("Google Sign-In successful:", result.user.email);
            
            // Create user document in Firestore if doesn't exist
            try {
                const userRef = doc(db, 'users', result.user.uid);
                const userDoc = await getDoc(userRef);
                
                if (!userDoc.exists()) {
                    console.log("Creating new user document...");
                    await setDoc(userRef, {
                        uid: result.user.uid,
                        email: result.user.email,
                        displayName: result.user.displayName || 'User',
                        photoURL: result.user.photoURL || '',
                        createdAt: new Date(),
                        problems: [],
                        stats: {
                            totalProblems: 0,
                            topicStats: {},
                            difficultyStats: {}
                        }
                    });
                    console.log("User document created successfully");
                } else {
                    console.log("User document already exists");
                }
            } catch (firestoreError) {
                console.error("Firestore error:", firestoreError.code, firestoreError.message);
                // Don't throw - user is already authenticated
            }
            
            return result;
        } catch (error) {
            console.error("Google Sign-in Error:", error.code, error.message);
            throw error;
        }
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
                const parsedUser = JSON.parse(demoUser);
                setCurrentUser(parsedUser);
                console.log("Demo user loaded:", parsedUser.displayName);
                setLoading(false);
                return;
            } catch (e) {
                console.error("Demo user parse error:", e);
                localStorage.removeItem('demoUser');
            }
        }

        // Then check Firebase auth
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    console.log("Firebase user authenticated:", user.email);
                    setCurrentUser(user);
                } else {
                    console.log("No Firebase user found");
                    setCurrentUser(null);
                }
                setLoading(false);
            },
            (error) => {
                console.error("Auth state change error:", error.code, error.message);
                setCurrentUser(null);
                setLoading(false);
            }
        );

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
