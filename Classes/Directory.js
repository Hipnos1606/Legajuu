
export default class Directory {
    constructor(name, files = []) {
        name = name;
        documents = files.map(file => new Document(file));
    }

    addDocument(document) {
        this.documents = this.documents.concat(document);    
    }

    removeDocument(docIndex) {
        this.documents = this.documents.splice(docIndex, 1);
    }
}