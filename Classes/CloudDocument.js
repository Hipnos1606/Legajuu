import Document from "./Document";
import LocalDocument from "./LocalDocument";

export default class CloudDocument extends Document{
    constructor(data) {
        super(data, data.directory, "cloud", data.url);
    }

    convertToCloud() {
        return new LocalDocument(this.JSON, this.directory);
    }
}