import LocalDocument from "../Classes/LocalDocument";
import CloudDocument from "../Classes/CloudDocument";
import SelectedDocument from "../Classes/SelectedDocument";

const DocumentsUtil = {
    clasifyDocument: (doc, dir) => {
        if (doc.hasOwnProperty('url')) {
            if (doc.url.includes("blob")) {
                return new LocalDocument(doc, dir);
            } else {
                return new CloudDocument(doc, dir);
            }
        } else {
            return new SelectedDocument(doc, dir);
        }
    },  
}

export default DocumentsUtil;