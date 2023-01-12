import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, query, where, deleteDoc } from 'firebase/firestore';
import config from '../res/firebase/config';
import auth from './auth';
import Storage from './storage';
import Directory from './directory';

const app = initializeApp(config);
const db = getFirestore(app);

export default class Store {

    static async getAllDocs() {
        try {
            const user = auth.instance.currentUser();

            if (user) {
                const querySnapshot = await getDocs(collection(db, "users", user.uid, "documents"));
                var cloudDocuments = [];
                querySnapshot.forEach(doc => {
                    cloudDocuments = cloudDocuments.concat(doc.data());
                });
                const localDocuments = Storage.instance.getAllDocs();
                return localDocuments.concat(cloudDocuments);
            } else {
                const localDocuments = Storage.instance.getAllDocs();
                return localDocuments;
            }
        } catch(err) {
            return new Error("Store getAllDocs error: " + err);
        }
    }

    static async saveDocument(docName, data) {
        try {
            
            const docRef = doc(db, 'users', auth.instance.currentUser().uid, `documents/${docName}`);
    
            return await setDoc(docRef, data, { merge: true });

        } catch (err) {

            console.error("Store saveDocument error ", err);
        }
        
    }

    static async saveMultiple(documents) {
        const handleSaveDocuments = documents.map(async () => {
            await this.saveDocument(document.name, document);
        });

        await Promise.all(handleSaveDocuments);
    }

    static async saveDirectoryDocuments(directory) {
        try {
            
            const handleSaveDocuments = directory.documents.map(async (document) => {
                
                document.local && delete document.local;

                await this.saveDocument(document.name, {
                    ...document,
                    directory: directory.name,
                });

            });

            await Promise.all(handleSaveDocuments);

            return true;

        } catch(err) {

            console.error(err);

        }
    }


    static async saveDirectory(directory) {
        try {
            if (directory.name.length) {
                await setDoc(doc(db, 'users', auth.instance.currentUser().uid), {
                    directories: {
                        [directory.name]: true,
                    },
                }, { merge: true });
            }

            await this.saveDirectoryDocuments(directory);

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
            const user = auth.instance.currentUser();
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    var allDirectories = [];
                    const cloudDirectories = Object.keys(docSnap.data().directories);
                    const localDirectories = Storage.instance.getDirectories();
                    const mergedDirectories = new Set([...cloudDirectories, ...localDirectories]);
                    allDirectories = [...mergedDirectories];
    
                    const handleGetDocuments = allDirectories.map(async (directory) => {
                        const directoryInstance = new Directory();
                        directoryInstance.name = directory;
                        const localDocuments = Storage.instance.getDocumentsFrom(directory); 
                        const cloudDocuments = await this.getDocumentsFrom(directory);
                        directoryInstance.documents = [...localDocuments, ...cloudDocuments];
                        return directoryInstance;
                    });

                    return Promise.all(handleGetDocuments);
                }
            } else {
                let directories = Storage.instance.getDirectories();
                directories = directories.map(directory => {
                    const documents = Storage.instance.getDocumentsFrom(directory);
                    return ({
                        name: directory,
                        documents,
                    });
                });
                return directories;
            }
        } catch(e) {
            console.error('store getDirectories error', e);
            return [];

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

    static async removeFromDirectory(document) {
        document = {
            ...document,
            directory: "",
        }
        
        if (auth.instance.currentUser()) {
            const docRef = doc(db, 'users', auth.instance.currentUser().uid, 'documents', document.name);
            await setDoc(docRef, document);
        } else {
            Storage.instance.removeFromDirectory(document);
        }
    }

    static async moveToDirectory(document, directory) {
        document = {
            ...document,
            directory: directory,
        }
        
        if (auth.instance.currentUser()) {
            const docRef = doc(db, 'users', auth.instance.currentUser().uid, 'documents', document.name);
            await setDoc(docRef, document);
        } else {
            Storage.instance.moveToDirectory(document);
        }
    }
}