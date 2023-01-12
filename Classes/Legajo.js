import Bucket from "./Bucket";

export default class Legajo extends Bucket {
    addToLegajo(dirName, doc) {
        const directory = this.findDirectory(dirName);
        if (!directory) {
            return;
        }
        directory.addDocument(doc);
    }

    removeFromLegajo(dirName, docIndex) {
        const directory = this.findDirectory(dirName);
        if (!directory) {
            return;
        }
        directory.removeDocument(docIndex);
    }
}