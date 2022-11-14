import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc, getDocs } from 'firebase/firestore';
import config from '../res/firebase/config';
import auth from './auth';

const app = initializeApp(config);
const db = getFirestore(app);

// firestore refs

const userRef = () => doc(db, 'user', auth.instance.currentUser().uid);

const legajoRef = () => doc(this.userRef, 'legajo');

const documentsRef = () => doc(this.userRef, 'documents');

//

export default class Store {


    static async saveMultiple(directory, urls) {

        const allPromises = Promise.all(urls.map(async (url, index) => {

            const document = directory.documents[index];

            const docRef = doc('users', auth.currentUser().uid, directory.name);

            return await setDoc(docRef, {

                ...document,

                url,
                directories: {
                    [directory.name]: true,
                }

            }, { merge: true });

        }));

        return await allPromises;
    }

    static async saveDirectory(directory) {
        try {

            await setDoc(doc('users', auth.currentUser().uid), 'legajo', {
                [directory.name] : true,
            })

            FbStorage.instance.uploadMultiples(directory.documents).then(async (urls) => {

                await this.saveMultiple(directory, urls);

            });

            return true;

        } catch(e) {
            console.log(e);
            throw new Error(e);
        }
    }

    static async getDirectories() {
        return await getDocs(collection(db, 'users', auth.currentUser().uid, 'directories'));
    }
}