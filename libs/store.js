import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, query, where, deleteDoc } from 'firebase/firestore';
import config from '../res/firebase/config';
import auth from './auth';

const app = initializeApp(config);
const db = getFirestore(app);

export default class Store {

    static async saveDocument(docName, data) {
        try {
            
            const docRef = doc(db, 'users', auth.instance.currentUser().uid, `documents/${docName}`);
    
            return await setDoc(docRef, data, { merge: true });

        } catch (err) {

            console.error("Store saveDocument error ", err);
        }
        
    }

    static async saveMultiple(directory) {
        try {
            
            const allPromises = Promise.all(directory.documents.map(async (document) => {

                await this.saveDocument(document.name, {
                    ...document,
                    directory: directory.name,
                });

            }));

            await allPromises;

            return true;

        } catch(err) {

            console.error(err);

        }
    }


    static async saveDirectory(directory) {
        try {

            await setDoc(doc(db, 'users', auth.instance.currentUser().uid), {
                directories: {
                    [directory.name]: true,
                },
            }, { merge: true });

            await this.saveMultiple(directory);

            return true;

        } catch(e) {

            console.error("Store SaveDirectory error", e);

        }
    }

    static async getDocumentsFrom(directory) {
        try {

            const q = query(collection(db, 'users', auth.instance.currentUser().uid, "documents"), where("directory", "==", directory));

            const querySnapshot = await getDocs(q);

            let documents = querySnapshot.docs.map((doc) => doc.data());

            return documents;

        } catch(err) {

            console.error(err);

        }
    }

    static async getDirectories() {
        try {
            
            const docRef = doc(db, 'users', auth.instance.currentUser().uid);
            
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let directories = docSnap.data().directories;

                const allPromises = Promise.all(Object.keys(directories).map(async (directory) => {

                    return ({
                        name: directory,
                        documents: await this.getDocumentsFrom(directory),
                    });
                }));

                directories = await allPromises;
                
                return directories;

            } else {

                console.error("documento no existe");

                return [];

            }
        } catch(e) {

            console.error('store getDirectories error', e);

        }
    }

    static async deleteDoc(document) {
        try {

            const docRef = doc(db, 'users', auth.instance.currentUser().uid, 'documents', document.name);

            await deleteDoc(docRef);

            return true;


        } catch(err) {
            
            console.error(err);

            return false;

        }
    }
}