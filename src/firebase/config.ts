import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAynONaE6Kpxs0iGPQEbHzG1DOJmzm33LQ",
    authDomain: "authenticationservice-c1e91.firebaseapp.com",
    databaseURL: "https://authenticationservice-c1e91.firebaseio.com",
    projectId: "authenticationservice-c1e91",
    storageBucket: "authenticationservice-c1e91.appspot.com",
    messagingSenderId: "254159053392",
    appId: "1:254159053392:web:c05522ac28a68ce124e755",
    measurementId: "G-2MW6B0D90J"
  };
  
export function initFirebase() {
    firebase.initializeApp(config)
}