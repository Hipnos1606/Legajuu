import http from '../libs/http';
import auth from '../libs/auth';
import store from '../libs/store';

const saveDocumentURL = 'documents/upload';

export default class Directory {

    constructor() {
        this.name = "";
        this.documents = [];
        this.formattedDocuments = [];
    }

    setName(name) {
        this.name = name;
    }

    setDocuments(documents) {
        this.documents = [...documents];
        this.formattedDocuments = [...documents].map((document) => this.formatDocument(document));
    }

    setFormatedDocuments(documents) {
        this.documents = documents;
        this.formattedDocuments = documents;
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

    async storeDocument(document)  {
        try {
            const body = new FormData();
            body.append('userId', auth.instance.user.uid);
            body.append('directory', this.name);
            body.append('document', document);

            return await http.instance.post(saveDocumentURL, {
                method: 'POST',
                body,
            });

        } catch (err) {
            throw new Error(err);
        }

    }

    async storeDocuments(documents) {
        try {

            const promises = documents.map(async (document) => {

                await this.storeDocument(document);

                return ({
                    name: document.name,
                    size: document.size,
                    url: `${http.instance.baseURL}documents/${auth.instance.user.uid}/${this.name}/${document.name}`,
                });
                
            });

            return await Promise.all(promises);

        } catch (err) {

            throw new Error(err);

        }
    }

    async saveDocuments(documents) {
        try {
            return await store.saveDirectory({
                name: this.name,
                documents: documents,
            });
        } catch (err) {

            throw new Error(err);

        }
    }

    async save() {
        try {

            if (auth.currentUser()) {
                const storedDocuments = await this.storeDocuments([...this.documents]);
                console.log('documents saved in storage');

                await this.saveDocuments(storedDocuments);
                console.log('documents saved in store');

                return storedDocuments;

            } else {

                return [...this.documents];

            }
        } catch (err) {

            throw new Error("Directory class save error: " + err);

        }
    }

}