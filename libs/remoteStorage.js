import { ref, getStorage, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export default class RemoteStorage {

    static instance = new RemoteStorage();

    documentRef = (document) => ref(getStorage(), `documents/${document.name}`)

    getDocument(document) {

        return this.documentRef(document);

    }

    async uploadDocument(document) {

        try {

            return await uploadBytes(this.documentRef(document), document);

            return true;

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

}