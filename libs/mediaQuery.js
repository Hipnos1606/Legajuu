
export default class MediaQueries {
    mediaQueries() {
        const clientWidth = window.document.body.clientWidth;

        if (clientWidth < 768) {
            return "xs";
        } 
        if (clientWidth > 768 && clientWidth < 1024) {
            return "md";
        }
        if (clientWidth > 1024) {
            return "lg";
        }
    }
}