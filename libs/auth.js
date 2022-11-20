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
        let user = Storage.instance.getUser();

        if (!user) {
            user = getAuth().currentUser;
            
            Storage.instance.setUser(user);
        }
        return user;
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

    signOut() {
        getAuth().signOut();
        location.reload();
    }
}

export default Auth;