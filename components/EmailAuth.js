import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { setError } from '../slices/navSlice';
import tw from "tailwind-react-native-classnames";

export default function EmailAuth({ onAuthStateChanged }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            onAuthStateChanged(userCredential.user);
        } catch (error) {
            dispatch(setError(error.message)); // Dispatch the error to Redux
        }
    };

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            onAuthStateChanged(userCredential.user);
        } catch (error) {
            dispatch(setError(error.message)); // Dispatch the error to Redux
        }
    };

    return (
        <View style={tw`bg-white p-4 rounded-lg shadow-md w-full`}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
            />
            <View style={tw`flex flex-row justify-around w-full px-4`}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={tw`bg-gray-400 text-white py-2 px-4 shadow-lg`}>
                    <Text style={tw`text-white text-lg`}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignIn}
                    style={tw`bg-gray-400 text-white py-2 px-4 shadow-lg`}>
                    <Text style={tw`text-white text-lg`}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
