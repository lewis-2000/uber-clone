
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzVvhiQK_v1i1uiGLBCONDnovRrIvGnXM",
    authDomain: "ride-298f4.firebaseapp.com",
    projectId: "ride-298f4",
    storageBucket: "ride-298f4.appspot.com",
    messagingSenderId: "675603966750",
    appId: "1:675603966750:web:366723d4d4e3c9cfed370f",
    measurementId: "G-GH7Q5Y5ECT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };

