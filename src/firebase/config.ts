import firebase from 'firebase'
import { FirebaseConfig } from '../types/firebase';


export function initFirebase() {
  const config: FirebaseConfig = {
      apiKey: process.env.F_APIKEY,
      authDomain: process.env.F_AUTHDOMAIN,
      databaseURL: process.env.F_DATABASEURL,
      projectId: process.env.F_PROJECTID,
      storageBucket: process.env.F_STORAGEBUCKET,
      messagingSenderId: process.env.F_MESSAGINGSENDERID,
      appId: process.env.F_APPID,
      measurementId: process.env.F_MEASUREMENTID
    };
    firebase.initializeApp(config)
}