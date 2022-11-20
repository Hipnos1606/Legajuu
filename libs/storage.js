import { getLocalTimeZone } from "@internationalized/date";

class Storage {

    static instance = new Storage();

    async setUser(user) {
        try {

            localStorage.setItem('legajuu-user', JSON.stringify(user));

            return true;

        } catch(err) {

            console.error("Storage serUser error", err);

            return false;
        }
    }

    getUser() {

        const storedUser = localStorage.getItem('legajuu-user');

        return JSON.parse(storedUser);
    }

    saveDocument(document) {
        try {

            const stringifiedDocument = JSON.stringify(document);
            
            const documentkey = Date.now();

            localStorage.setItem(`legajuu-document-${documentkey}`, stringifiedDocument);

        } catch (err) {

            console.error("Storage saveDocument error", err);

        }
    }

    saveDirectory(directory) {

        localStorage.setItem(`legajuu-directory-${Date.now()}`, JSON.stringify(directory.name));

        directory.documents.forEach((document) => {

            document = {
                name: document.name,
                url: document.url || URL.createObjectURL(document),
                directory: directory.name,
            };

            this.saveDocument(document);

        });

    }

    getDirectories() {

        const keys = Object.keys(localStorage);
        
        let directoriesKeys = keys.filter((key) => key.includes("legajuu-directory"));
        const documentsKeys = keys.filter((key) => key.includes("legajuu-document"));

        const allDocuments = documentsKeys.map((documentKey) => this.getItem(documentKey));

        let directories = directoriesKeys.map((directoryKey) => this.getItem(directoryKey));

        directories = directories.map((directory) => {
            
            const directoryDocuments = allDocuments.filter((document) =>  document.directory === directory);

            return {
                directory: directory,
                documents: directoryDocuments,
            }
        });

        return directories;

    }

    getItem(key) {

        return JSON.parse(key);

    }

    getAll() {

        const keys = Object.keys(localStorage);

        return keys.map((key) => {

            return getItem(key);

        });

    }

    removeDocument(document) {
        const keys = Object.keys(localStorage);

        let documentToDelete = keys.find((key) => {

            const storedDocument = this.getItem(key);

            return JSON.stringify(storedDocument) === JSON.stringify(document);

        });

        if (documentToDelete.length > 0) {
            localStorage.removeItem(documentToDelete);
        }

    }

}

export default Storage;