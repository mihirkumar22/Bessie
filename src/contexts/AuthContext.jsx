import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    async function register(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            return userCredential;
        } catch (error) {

            let errorMessage = "An unknown error occurred. Please try again later."

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use. Please use a different one.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters long.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            }

            throw new Error(errorMessage);
        }
    }

    async function login() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            let errorMessage = "An unknown error occurred. Please try again."

            if (error.code === "auth/user-not-found") {
                errorMessage = "No account found with this email. Please check your email or sign up.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password. Please try again.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "The email address is invalid. Please check and try again.";
            } else if (error.code === "auth/too-many-requests") {
                errorMessage = "Too many failed login attempts. Please try again later or reset your password.";
            }

            throw new Error(errorMessage);
        }
    }

    function logout() {
        return signOut(auth);
    }

    const value = {
        currentUser,
        register,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}