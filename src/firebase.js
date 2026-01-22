import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBMZ3QxXOYGh6Tvz0A7FT77V8O8v_1O9K8",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pixelers-25003.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pixelers-25003",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pixelers-25003.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "390374134874",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:390374134874:web:9218db8a9c3298bbc5b463",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LKMBK24T0T"
};

console.log("Firebase Config:", {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    appId: firebaseConfig.appId
});

let app, analytics, auth, db, functions;

try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
    
    // Set persistence to LOCAL
    setPersistence(auth, browserLocalPersistence).catch(err => {
        console.error("Persistence error:", err);
    });
    
    db = getFirestore(app);
    functions = getFunctions(app);
    
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

export { app, analytics, auth, db, functions };
