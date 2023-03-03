import Document from './Document';

export default class SelectedDocument extends Document{
    constructor(file, directory) {
        super(file, directory, "selected", URL.createObjectURL(file));
        this.fileData = file;
    }
}