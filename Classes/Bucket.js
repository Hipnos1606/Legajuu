import Directory from "./Directory";

export default class Bucket {
    constructor(name, directories = [], files = []) {
        this.name = name;
        this.directories = directories.map(dir => new Directory(dir, files));
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