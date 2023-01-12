import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';

class Auth {

    static instance = new Auth();
    
    currentUser() {
        const sessionUser = JSON.parse(window.sessionStorage.getItem('legajuu_user'));
        const user = sessionUser ? sessionUser : getAuth().currentUser;
        return user;
    }

    async signInWithGoogle () {
        try {
            const response = signInWithPopup(getAuth(), new GoogleAuthProvider());
            window.sessionStorage.setItem('legajuu_user', JSON.stringify((await response).user));
            return response;
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
        window.sessionStorage.clear();
        return await getAuth().signOut();
    }
}

export default Auth;