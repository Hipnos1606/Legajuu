
export default class ReadFile {

    static async getBuffer(file, isLocal = false) {
        let url = null;
        if (isLocal) {
            url = this.getURL(file);
        } else {
            url = file.url;
        }

        const response = await fetch(url);
        const data = await response.arrayBuffer();
        return data;
    }

    static getURL(object) {
        return URL.createObjectURL(object);
    }

}