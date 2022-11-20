import auth from '../libs/auth';
import store from '../libs/store';
import RemoteStorage from '../libs/remoteStorage';
import Storage from '../libs/storage';

export default class Directory {

    constructor() {
        this.name = "";
        this.documents = [];
    }

    setName(name) {
        this.name = name.toUpperCase();
    }

    setDocuments(documents) {
        documents = [...documents];
        this.documents = documents;
    }

    toJSON() {
        return {
            name: this.name,
            documents: this.formattedDocuments,
        };
    }

    formatDocument(document) {
        return ({
            name: document.name,
            size: document.size,
            url: document.url || URL.createObjectURL(document),
        });
    }

    getFormattedDocuments() {
        return this.documents.map((document) =>  this.formatDocument(document));
    }

    async saveDocumentsInStorage(documents) {
        try {
            
            return await RemoteStorage.instance.uploadMultiples(documents);

        } catch (err) {

            console.error("Directory saveDocumentsInStorage", err);
            
            return false;

        }
    }

    async saveDocumentsInDB(documents) {
        try {

            await store.saveDirectory({
                name: this.name,
                documents: documents,
            });

        } catch (err) {

            console.error("Directory saveDocumentsInDB", err);

            return false;

        }
    }

    nameIsEmpty() {
        return this.name.trim() === "";
    }

    async save() {
        try {

            if (this.nameIsEmpty()) {

                alert("Por favor dale un nombre al directorio.");

            } else {
                if (auth.instance.currentUser()) {
    
                    const storedDocuments = await this.saveDocumentsInStorage(this.documents);
    
                    return await this.saveDocumentsInDB(storedDocuments);
    
                } else {

                    Storage.instance.saveMultiple(this.documents);
                    
                }
            }


        } catch (err) {
            
            console.error("Directory save error", err);

            return false;

        }
    }

    static async deleteDoc(document) { 
        try {

            await RemoteStorage.instance.deleteDocument(document);

            await store.deleteDoc(document);

        } catch(err) {

            console.error(err);
            
            return false;
        }
    }

}