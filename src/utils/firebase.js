import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCXX4T0kj-g7FzoP6w7UiYNsnjJomqmLxQ",
    authDomain: "arquitectura-de-la-informacion.firebaseapp.com",
    databaseURL: "https://arquitectura-de-la-informacion.firebaseio.com",
    projectId: "arquitectura-de-la-informacion",
    storageBucket: "arquitectura-de-la-informacion.appspot.com",
    messagingSenderId: "352311957679",
    appId: "1:352311957679:web:87ee4e27cfa7e394775c5a"
  };

const primaryApp = firebase.initializeApp(firebaseConfig);

export const db = primaryApp.firestore();
export const auth = primaryApp.auth();