import Directory from './directory';

class Storage {

    static instance = new Storage();

    saveDocument(document) {
        const stringifiedDocument = JSON.stringify(document);
        localStorage.setItem(`legajuu-document-${document.name}`, stringifiedDocument);
    }

    getDirectotyDocuments(directory) {
        return this.getDirectories().find(storedDirectory => storedDirectory.name === `legajuu-document-${directory.name}`).documents
    }

    saveDirectory(directory) {

        localStorage.setItem(`legajuu-directory-${directory.name}`, JSON.stringify(directory.name));

        directory.documents.forEach((document) => {

            document = {
                ...document,
                directory: directory.name,
                local: true,
            };

            this.saveDocument(document);

        });

    }

    getDocumentsFrom(directory) {
        const keys = Object.keys(localStorage)
        const documentsKeys = keys.filter((key) => key.includes("legajuu-document"));
        const allDocuments = documentsKeys.map((documentKey) => this.getItem(documentKey));
        const directoryDocuments = allDocuments.filter((document) =>  document.directory === directory);
        return directoryDocuments;
    }

    getDirectories() {
        const keys = Object.keys(localStorage);
        let directoriesKeys = keys.filter((key) => key.includes("legajuu-directory"));
        let directories = directoriesKeys.map((directoryKey) => this.getItem(directoryKey));
        return directories;
    }

    getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    getAllDocs() {
        const keys = Object.keys(localStorage);
        return keys.filter((key) => key.includes("legajuu-document")).map(key => this.getItem(key));
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

    removeFromDirectory(document) {
        this.saveDocument(document);
    }

    saveMultiple(documents) {
        documents.forEach((document) => {

            document = {
                ...document,
                directory: "",
                local: true,
            };

            this.saveDocument(document);

        });
    }

}

export default Storage;