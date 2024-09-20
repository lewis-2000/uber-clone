// AccountScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import EmailAuth from '../components/EmailAuth';
import { auth } from '../firebaseConfig'; // Import the initialized auth object
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import necessary methods from firebase/auth
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

export default function AccountScreen() {
    const [user, setUser] = useState(null);  // User state

    useEffect(() => {
        // Monitor authentication state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Update user state
        });
        return () => unsubscribe();  // Clean up subscription on unmount
    }, []);

    const handleAuthStateChanged = (user) => {
        setUser(user);  // Update user state when sign-in/sign-out occurs
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth); // Sign out using Firebase v9 method
            setUser(null); // Reset user state
        } catch (error) {
            console.error('Sign out error:', error); // Log any sign-out errors
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white p-4`}>
            <View style={tw`flex-1 justify-center items-center`}>
                {user ? (
                    <>
                        <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>
                            Welcome, {user.email ? user.email : 'Anonymous User'}
                        </Text>
                        <Button title="Log Out" onPress={handleSignOut} color="#FF3D00" /> {/* Uber-like accent color */}
                    </>
                ) : (
                    <>
                        <Text style={tw`text-lg text-gray-600 mb-4 font-bold`}>
                            Please log in or sign up:
                        </Text>
                        <EmailAuth onAuthStateChanged={handleAuthStateChanged} />
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}
