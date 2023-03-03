import {
    getDocs,
    query,
    collection,
    where,
    doc,
    getDoc,
    setDoc,
    writeBatch,
    deleteDoc,
 } from 'firebase/firestore'
import FBConfig from './FirebaseConfig';
import Directory from './Directory';
import Auth from './Auth';
import CloudDocument from './CloudDocument';
import CloudStorage from './CloudStorage';

const { db } = FBConfig;

const Store = {
    collection: (ref = "") => {
        const userId = Auth.currentUser.uid;
        return collection(db, "users", userId, ref);
    },

    doc: (ref = "") => {
        const userId = Auth.currentUser.uid;
        return doc(db, "users", userId, ref);
    },

    docsCollection: async function (query) {
        const querySnapshot = await getDocs(query);

        const handleGetDocs = querySnapshot.docs.map((doc) => {
            return new CloudDocument(doc.data());
        });

        return handleGetDocs;
    },

    getDocuments: function() {
        return this.docsCollection(this.collection("documents"));
    },

    getDirectoryDocs: async function (directory) {
        directory = directory.toUpperCase();
        try {
            const q = query(this.collection("documents"), where("directory", '==', directory));
            return this.docsCollection(q);
        } catch (err) {
            console.error("Store>getDirectoryDocs Error: " + err);
        }
    },

    getGeneralDirectory: async function () {
        const generalDocuments = await this.getDocuments();
        return new Directory("general", generalDocuments)
    },
    
    getLegajoDirectories: async function () {
        const snap = await getDoc(this.doc());

        if (!snap.exists()) {
            return [];
        } 

        const directories = [];
        let directoriesNames = snap.data().directories;

        for (const dirName in directoriesNames) {
            if (dirName === "GENERAL") {
                continue;
            }
            const directoryDocs = await this.getDirectoryDocs(dirName);
            const directory = new Directory(dirName, directoryDocs);
            directories.push(directory);
        }

        return directories;
    },

    get batch() {
        return writeBatch(db);
    },

    saveDirectoryDocs: async function (directory) {
        let savedDocuments = await CloudStorage.uploadMultiple(directory.documents);
        savedDocuments = savedDocuments.map(async (doc) => {
            try {
                await setDoc(this.doc(`documents/${doc.name}`), doc);
            } catch (err) {
                console.error("Storage>saveDirectoryDocs>setDoc error:", err);
            }
        });
        await Promise.all(savedDocuments);
    },

    saveDirectory: async function (dir) {
        try {
            
            await setDoc(this.doc(), {
                directories: {
                    [dir.name]: true,
                }
            }, { merge: true });
        } catch (err) {
            console.error(`Store>saveDirectory>setDoc Error intentando guardar el directorio: ${err}`);
        }
    },

    save: async function (dir) {
        if (dir.name.trim() === "") {
            throw new Error("El nombre del directorio no puede estár vacío, por favor selecciona un directorio");
        }
        await this.saveDirectory(dir);
        await this.saveDirectoryDocs(dir);
    },

    moveToDirectory: async function (doc, dirName) {
        doc.directory = dirName;
        setDoc(this.doc(`documents/${doc.name}`), doc.JSON);
    },

    initialize: async function () {
        const state = {
            generalDirectory: [],
            legajoDirectories: [],
        }
        state.generalDirectory = await this.getGeneralDirectory();
        state.legajoDirectories = await this.getLegajoDirectories();
        return state;
    },
    
    deleteDoc: async function (docName) {
        deleteDoc(this.doc(`documents/${docName}`));
    },

    moveToGeneral: async function (docName) {
        setDoc(this.doc(`documents/${docName}`), {
           directory: "GENERAL",
        }, 
        {
            merge: true,
        });
    }
}

export default Store;