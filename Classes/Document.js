import StoreMan from './StoreMan';

export default class Document {
    constructor(data, directory, type, url) {
        this.name = data.name;
        this.directory = directory || "GENERAL";
        this.url = data?.url || url;
        this.type = type;
    }

    getURL

    get JSON() {
        return {
            name: this.name,
            url: this.url,
            directory: this.directory,
        }
    }

    delete() {
        StoreMan.deleteDoc(this.name, this.type);
    }

    removeFromLegajo() {
        StoreMan.removeFromLegajo(this.name, this.type);
    }

}