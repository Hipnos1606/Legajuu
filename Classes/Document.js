import ReadFile from './ReadFile';
import { PDFDocument } from 'pdf-lib';

export default class Document {
    constructor(file) {
        this.data = null;
        this.name = file.name;
        this.#init(file);
        this.isLocal = true;
        this.url = null;
    }
    
    async #init(file) {
        if (this.#isImage(file)) {
            file = await convertToPDF(file);
        }
        file = await this.#getBuffer(file);
        this.data = file;
    }

    #verifyIsLocal(file) {
        if (file.hasOwnProperty('url')) {
            return false;
        } 
        return true;
    }

    async #getBuffer(file) {
        const buffer = await ReadFile.getBuffer(file);
        if (this.#isImage(file)) {
            return buffer;
        }
        this.data = buffer;
    }

    #getURL(file) {
        return ReadFile.getURL(file);
    }

    #isImage(file) {
        const type = file.type;
        return type.includes('image/');
    }

    async convertToPDF(image) {
        let imageType = image.type.replace('image/', '');
        let imageBuffer = await this.#getBuffer(image);
        let PDFDoc = await PDFDocument.create();
        let embed = {
            jpg: PDFDoc.embedJpg,
            png: PDFDoc.embedPng,
        }

        await embed[imageType](imageBuffer);
        imageType = null;
        imageBuffer = null;
        return await PDFDoc.save();
    }

}