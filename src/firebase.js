import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyAI284MTWzhKMNef5H863y6U6S7C2PHXDM',
    authDomain: 'react-todo-app-c3694.firebaseapp.com',
    databaseURL: 'https://react-todo-app-c3694.firebaseio.com',
    projectId: 'react-todo-app-c3694',
    storageBucket: 'react-todo-app-c3694.appspot.com',
    messagingSenderId: '362830641503',
    appId: '1:362830641503:web:87b97f11ba837610c65eea',
    measurementId: 'G-TNGZ1NG703'
});

const db = firebaseApp.firestore();

export default db;