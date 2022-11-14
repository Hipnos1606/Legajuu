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

    async getUser() {
        try {

            const storedUser = localStorage.getItem('legajuu-user');

            return JSON.parse(storedUser);

        } catch(err) {
            
            console.error(err);

            throw new Error(err);
        }
    }

    async setDocument(item) {
        try {

            const key = `legajuu-document-${item.id}`;

            localStorage.setItem(key, JSON.stringify(item));

            return true;

        } catch(err) {

            console.error("Storage setDocument error ", err);

            return false;

        }
    }

    async getDocument(key) {
        try {

            const storedItem = localStorage.getItem(key);

            return JSON.parse(storedItem);

        } catch(err) {

            console.error("Storage getDocument error", err);

            throw Error(err);

        }
    }

    async setDirectory(directoryName) {
        try {

            localStorage.setItem("legajoo-directory-" + directoryName);

            return true;

        } catch (err) {

            console.error(err);

            return false;

        }
    }

    async getAll() {
        try {

            const keys = Object.keys(localStorage);

            const legajooKeys = keys.filter((key) => key.includes("legajoo"));

            return legajooKeys;

        } catch (err) {
            
            console.error("Storage getAll error", err);

            throw Error(err);

        }
    }

    async getAllDocuments() {
        try {

            const keys = await this.getAll();

            const documentsKeys = keys.filter((key) => key.includes("document"));

            var documents = [];

            documentsKeys.forEach(async (key) => {

                const document = await this.getDocument(key);

                documents.concat(document);

            });

            return documents;

        } catch(err) {

            console.error("Storage getAllDocuments", err);

            throw Error(err);

        }
    }

    async remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            return false;
        }
    }

}

export default Storage;