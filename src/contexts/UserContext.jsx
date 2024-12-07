import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe = null;

        async function setupListener() {
            try {
                if (currentUser) {
                    const userDocRef = doc(db, 'users', currentUser.uid);

                    // Check if user document exists
                    const docSnapshot = await getDoc(userDocRef);
                    if (docSnapshot.exists()) {
                        // Listen for real-time updates
                        unsubscribe = onSnapshot(userDocRef, (snapshot) => {
                            if (snapshot.exists()) {
                                setUserData(snapshot.data());
                            } else {
                                console.warn('User document no longer exists');
                                setUserData(null);
                            }
                            setLoading(false); // Data loaded
                        });
                    } else {
                        console.warn('User document not found');
                        setUserData(null);
                        setLoading(false);
                    }
                } else {
                    // No user signed in
                    setUserData(null);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error setting up Firestore listener:', error);
                setUserData(null);
                setLoading(false);
            }
        }

        setupListener();

        // Cleanup subscription on unmount
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [currentUser]);

    async function updateUserData(updates) {
        if (!currentUser) {
            throw new Error('No user is signed in.');
        }
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, updates);
        } catch (error) {
            console.error('Failed to update user data:', error);
            throw new Error('Could not update user data. Please try again later.');
        }
    }

    const value = {
        userData,
        loading,
        updateUserData,
    };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}
