import Document from './Document';
import CloudDocument from './CloudDocument';

export default class LocalDocument extends Document{
    constructor(data) {
        super(data, data.directory, "local");
    }

    convertToCloud() {
        return new CloudDocument(this.JSON, this.directory);
    }
}