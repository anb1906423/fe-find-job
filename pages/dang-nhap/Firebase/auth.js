import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.

export default function authFireBaseConfig() {
    const config = {
        apiKey: 'AIzaSyDMyLxg4v19wGPzEYV2x2RJOhFibiXXLJY',
        authDomain: 'find-job-f6dd6.firebaseapp.com',
    };

    if (!firebase.apps.length) {
        // firebase.initializeApp({});
        firebase.initializeApp(config);
    }

    const provider = new firebase.auth.GoogleAuthProvider();

    return provider;
}
