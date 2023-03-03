import Directory from './Directory';
import LocalDocument from './LocalDocument';

const LocalStorage = {

    saveDocument: (document) => {
        const stringifiedDoc = JSON.stringify(document.JSON);
        try {
            localStorage.setItem(`legajuu-document-${document.name}`, stringifiedDoc);
        } catch(e) {
            console.error("Couldn't set localStorage document");
        }
    },

    saveDirectory: function (directory) {
        var directories = null;
        try {
            directories = localStorage.getItem("legajuu-directories");
        } catch(e) {
            console.error("Couldn't get directory from localStorage");
        }

        directories = JSON.parse(directories);
        directories = {
            ...directories,
            [directory.name]: true,
        }
        
        try {
            localStorage.setItem("legajuu-directories", JSON.stringify(directories));
        } catch(e) {
        }

        directory.documents.forEach(doc => this.saveDocument(doc));
    },

    getDocuments: function () {
        var documents = [];
        for (const key in localStorage) {
            if (!key.includes("legajuu-document")) {
                continue;
            }
            const doc = this.getDocument(key);
            documents.push(doc);
        }
        return documents;
    },

    getDirectories: function () {
        let directories = JSON.parse(localStorage.getItem("legajuu-directories"));
        directories = Object.keys(directories);
        directories = directories.map(dir => this.getDirectory(dir));
        return directories;
    },

    filteredDocs: function (dir) {
        const documents =  this.getDocuments();
        return documents;
    },

    getDirectory: function (name) {
        return new Directory(name, this.filteredDocs(name));
    },

    getDocument: (key) => {
        var doc = null;
        try {
            doc = JSON.parse(localStorage.getItem(key));
        } catch(e) {
            console.error("Couldn't get document from localStorage");
        }
        doc = new LocalDocument(doc);
        return doc;
    },

    getGeneralDirectory: function () {
        return this.getDirectory("GENERAL");
    },

    getLegajoDirectories: function () {
        let directories = this.getDirectories();
        directories = directories.filter(dir => dir.name !== "GENERAL");
        return directories;
    },

    initialize: function() {
        let state = {
            generalDirectory: null,
            legajoDirectories: [],
        };

        state.generalDirectory = this.getGeneralDirectory();
        state.legajoDirectories = this.getLegajoDirectories();
        return state;
    },
} 

export default LocalStorage;