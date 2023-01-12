import { PDFDocument } from 'pdf-lib';

const fetchImage = async (urlImage) => {
    const response = await fetch(urlImage);
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
}

const handleConvertFile = async (file) => {
    try {
        const fileType = file.type;

        
        if (fileType.includes('image/')) {
            // creating the document pdf
            const docPdf = await PDFDocument.create();

            // creating methods to embed the image depending on its mime type
            const embebingMethod = {
                'image/jpeg': {
                    embedMethod: "embedJpg",
                    format: "jpg",
                },
                'image/png': {
                    embedMethod: "embedPng",
                    format: "png",
                },
            };

            // get the image url
            const imageURL = URL.createObjectURL(file);
            // fetching the image arrayBuffer
            const imageBytes = await fetchImage(imageURL);

            // embebing the image depending on the image type
            const jpgImage = await docPdf[embebingMethod[fileType].embedMethod](imageBytes);
            // get the width/height of the image scaled to 50% og its original size
            const jpgDims = jpgImage.scale(0.5);
            
            // add a blank page to the document
            const page = pdfDoc.addPage();

            // drawing the image to the center of the page
            page.drawImage(jpgImage, {
                x: page.getWidth() / 2 - jpgDims.width / 2,
                y: page.getHeight() / 2 - jpgDims.height / 2,
                width: jpgDims.width,
                height: jpgDims.height,
            });

            const pdfBytes = await pdfDoc.save();

            const convertedFile = new File([pdfBytes], `img2pdf_${file.name.replace(`.${embebingMethod[fileType].format}`, "")}`);

            return convertedFile;
            
        } else {
            return file;
        }
    } catch (error) {
        throw error;
    }   
}

export default async function convertFiles(files) {
    console.log('files to convert', files);
    let handleConvertFiles = files.map(async (file) => await handleConvertFile(file));
    return await Promise.all(handleConvertFiles);
}