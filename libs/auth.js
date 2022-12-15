import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';
import Storage from './storage';

class Auth {

    static instance = new Auth();
    
    currentUser() {
        return getAuth().currentUser;
    }

    async signInWithGoogle () {
        try {
            return await signInWithPopup(getAuth(), new GoogleAuthProvider());
        } catch (err) {
            throw new Error(err);
        }
    }

    async authStateChange() {
        try {

            const promise = new Promise((resolve) => {
                onAuthStateChanged(getAuth(), (user) => resolve(user));
            });

            return await promise;

        } catch (err) {
            
            console.error(err);

            throw new Error(err);

        }

    }

    async signOut() {
        return await getAuth().signOut();
    }
}

export default Auth;