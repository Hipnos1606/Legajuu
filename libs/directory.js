import auth from '../libs/auth';
import store from '../libs/store';
import RemoteStorage from '../libs/remoteStorage';
import Storage from '../libs/storage';
import { PDFDocument } from 'pdf-lib';

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
            ...(auth.instance.currentUser() ? null : { local: true }),
            name: document.name,
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

    async getDocumentsForLocalStorage () {
        const allPromises = this.documents.map(async (document) => {
            const promise = new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({
                        name: document.name,
                        url: reader.result,
                    });
                };
                reader.readAsDataURL(document);
            });
            return await promise;
        });

        return await Promise.all(allPromises);
    }

    async save() {
        try {
            if (auth.instance.currentUser()) {
                const storedDocuments = await this.saveDocumentsInStorage(this.documents);
                return await this.saveDocumentsInDB(storedDocuments);
            } else {
                Storage.instance.saveDirectory({
                    name: this.name,
                    documents: await this.getDocumentsForLocalStorage(),
                });
            }

        } catch (err) {
            console.error("Directory save error", err);
            return false;

        }
    }

    async removeFromDirectory(document) {
        await store.removeFromDirectory(document);
    }

    async joinDirectory() {
        try {
            const PDFDoc = await PDFDocument.create();
            
            const handleMergeDocuments = this.documents.map(async (document) => {
                const docSource = await fetch(document.url).then(res => res.arrayBuffer());
                const docSourcePDF = await PDFDocument.load(docSource);
                const copyPages = await PDFDoc.copyPages(docSourcePDF, docSourcePDF.getPageIndices());
                copyPages.forEach(page => PDFDoc.addPage(page));
                store.removeFromDirectory(document);
            });

            await Promise.all(handleMergeDocuments);

            const mergedDocsBytes = await PDFDoc.save();

            const date = new Date().toDateString().replace(" ", "_");

            const file = new File([mergedDocsBytes], `${this.name}_merged_documents_${date}_${Date.now()}`, {
                type: 'application/pdf',
            });

            this.documents = [file];

            
            return this.save();

        } catch (err) {
            console.error("Directory joinDirectory error", err);
        }
    }

    async deleteDoc() {
        try {

            if (auth.instance.currentUser()) {
                await RemoteStorage.instance.deleteDocument(document);
                await store.deleteDoc(document);
            } else {
                Storage.instance.removeDocument(document);
            }

        } catch(err) {

            console.error(err);
            
            return false;
        }
    }

    static async deleteDoc(document) { 
        try {

            if (auth.instance.currentUser()) {
                await RemoteStorage.instance.deleteDocument(document);
                await store.deleteDoc(document);
            } else {
                Storage.instance.removeDocument(document);
            }

        } catch(err) {

            console.error(err);
            
            return false;
        }
    }

}