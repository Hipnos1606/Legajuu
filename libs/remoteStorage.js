import { ref, getStorage, uploadBytes, getDownloadURL, getBytes, deleteObject } from 'firebase/storage';

export default class RemoteStorage {

    static instance = new RemoteStorage();

    documentRef = (document) => ref(getStorage(), `documents/${document.name}`)

    async uploadDocument(document) {

        try {

            return await uploadBytes(this.documentRef(document), document);

        } catch (err) {

            console.error("RemoteStorage uploadDocument error", err);

            return false;

        }


    }

    async uploadMultiples(documentsList) {
        try {

            const allPromises = documentsList.map(async (document) => {

                let url = null;

                if (!document.hasOwnProperty('url')) {

                    await this.uploadDocument(document);
                    
                    url = await getDownloadURL(this.documentRef(document));

                } else {

                    url = document.url;

                }
                
                return ({
                    name: document.name,
                    url,
                });


            });
    
            return await Promise.all(allPromises);

        } catch (e) {

            console.error("RemoteStorage uploadMultiples error", e);

        }
    }

    async deleteDocument(document) {
        try {

            await deleteObject(this.documentRef(document));

            return true;

        } catch (e) {

            console.error("remoteStorage deleteDocument error", e);

            return false;
        }
    }

    async getDocumentBytes(document) {
        return getBytes(this.documentRef(document));
    }

    async getMultiple(documentsNameList) {
        const fetchDocuments = documentsNameList.map(async (document) => {
            return await this.getDocumentBytes(document);
        });

        return await Promise.all(fetchDocuments);
    }

    async getDocumentURL(document) {
        return getDownloadURL(this.documentRef(document));
    }

}