import { 
    uploadBytes, 
    getStorage,
    ref as fbRef,
    getDownloadURL,
} from 'firebase/storage';
import Auth from './Auth';

const CloudStorage = {

    uploadMultiple: async function (documents) {
        documents = documents.map(async (doc) => await this.uploadDoc(doc));
        documents = await Promise.all(documents);
        return documents;
    },
    
    ref: function (ref) {
        const userId = Auth.currentUser.uid;
        return fbRef(getStorage(), `documents/${userId}/${ref}`);
    },

    getCloudURL: async function (ref) {
        try {
            return await getDownloadURL(this.ref(ref));
        } catch (err) {
            console.log("CloudStorage>getCloudURL>getDownloadURL " + err);
        }
    },

    uploadDoc: async function (doc) {
        try {
            await uploadBytes(this.ref(doc.name), doc.blob);
            const url = await this.getCloudURL(doc.name);
            return {
                name: doc.name,
                directory: doc.directory,
                url,
            };
        } catch (err) {
            console.error("CloudStorage>uploadDoc>uploadBytes error: " + err.message);
        }
    },
};

export default CloudStorage;

