export default class User {
    constructor (userData) {
        this.displayName = userData.displayName;
        this.photoURL = userData.photoURL;
        this.emailVerified = userData.emailVerified;
        this.email = userData.email;
        this.id = userData.uid;
    }
}