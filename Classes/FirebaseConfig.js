import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAvK0AcalEJVDueVD0xpNai6QLYBpkGFXs",
    authDomain: "proyecto-docentes.firebaseapp.com",
    projectId: "proyecto-docentes",
    storageBucket: "proyecto-docentes.appspot.com",
    messagingSenderId: "135597392035",
    appId: "1:135597392035:web:055891231fbb5750f5bf16",
    measurementId: "G-WW5P038NWR",
}

export default class FirebaseConfig {
    static app = initializeApp(firebaseConfig);

    static auth = getAuth(this.app);

    static db = getFirestore();
}
