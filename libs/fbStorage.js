import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import auth from './auth';

const storage = getStorage();

export default class FbStorage {

    static instace = new FbStorage();

    storageRef = ref(storage, auth.currentUser().uid || 'non-user    ', 'documents');

    getDocument(document) {
        return ref(this.storageRef, document.name);
    }

    async uploadDocument(document) {
        return await uploadBytes(this.storageRef, document);
    }

    async uploadMultiples(documentsList) {
        const allPromises = documentsList.map(async (document) => {
            await this.uploadDocument(document);
            return await getDownloadURL(this.getDocument(document));
        });

        return await Promise.all(allPromises);
    }

}