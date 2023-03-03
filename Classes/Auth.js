import {
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';
import User from './User';
import FBConfig from './FirebaseConfig';

const { auth } = FBConfig;

export default class Auth {

    static _authStatePromise = new Promise((resolve) => {
        onAuthStateChanged(auth, (session) => {
            resolve(session);
        });
    });

    static async signIn() {
        try {
            const response = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = new User(response.user);
            return user;
        } catch (err) {
            console.error("Auth>signIn: Error", err);
            return null;
        }
    }

    static get currentUser () {
        let currentUser = auth.currentUser;
        !currentUser && (currentUser = JSON.parse(window.sessionStorage.getItem("legajuu_user")));

        return currentUser;
    }

    static async onAuthStateChanged() {
        return await this._authStatePromise;   
    }

    static async signOut () {
        await auth.signOut();
    }
}
