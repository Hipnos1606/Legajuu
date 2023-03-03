import Directory from "./Directory";

export default class Bucket {
    constructor(name, directories = []) {
        this.name = name;
        this.directories = directories;
        this.length = directories.length;
    }

    addDirectory(directory) {
        this.directorires = this.directories.concat(new Directory(directory));
    }

    removeDirectory(dirIndex) {
        this.directories = this.directories.slice(dirIndex, 1);
    }

    findDirectory(dirName) {
        return this.directories.find((dir) => dir.name === dirName);
    }   

    moveDocument(document, bucket) {
        bucket.addDirectory(document);
    }
}