
export default class ReadFile {

    static async getBuffer(file) {
        let url = file?.url || URL.createObjectURL(file);

        const response = await fetch(url);
        const data = await response.arrayBuffer();
        return data;
    }

    static getURL(object) {
        return URL.createObjectURL(object);
    }

}