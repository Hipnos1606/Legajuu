import DocumentsUtil from "../libs/DocumentsUtil";

const getDocs = (files, dir) => files.map((file) => DocumentsUtil.clasifyDocument(file, dir));

export default class Directory {

    constructor(name, docs = [], type = "docs") {
        this.name = name; 
        this.documents = getDocs(docs, name);
    }

    addDocument(document) {
        this.documents.push(document);
    }

    addDocuments(docs) {
        docs.forEach(doc => this.addDocument(doc));
    }

    removeDocument(docIndex) {
        this.documents = this.documents.splice(docIndex, 1);
    }

    moveToAnotherDirectory(doc, index, prevDirectory, newDirectory) {
        prevDirectory.removeDocument(index);
        newDirectory.addDocument(doc);
    }   

}