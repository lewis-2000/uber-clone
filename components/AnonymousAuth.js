// AnonymousAuth.js
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { signInAnonymously } from 'firebase/auth'; // Import signInAnonymously
import { auth } from '../firebaseConfig'; // Import the initialized auth object

export default function AnonymousAuth({ onAuthStateChanged }) {
    const [user, setUser] = useState(null);

    const handleAnonymousSignIn = async () => {
        try {
            const userCredential = await signInAnonymously(auth); // Sign in anonymously
            setUser(userCredential.user); // Set the user state
            onAuthStateChanged(userCredential.user); // Pass the signed-in user to the parent component
        } catch (error) {
            console.error(error.message); // Log error if sign-in fails
        }
    };

    return (
        <View>
            <Button title="Sign In Anonymously" onPress={handleAnonymousSignIn} />
            {user && <Text>Anonymous User ID: {user.uid}</Text>} {/* Display anonymous user ID */}
        </View>
    );
}
