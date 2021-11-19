import express from "express";
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

const port = process.env.PORT || 3000;
let data = 'Success request.';

app.use((req, res, next) => {
    console.log(`Request comes, ${req.body}`);
    next();
})

app.listen(port, () => {
    console.log(`Server is running.`)
})

// Get API
app.get(`/get`, (req, res) => {

    res.send(data);

    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const fileName = '/src/imp.png';

    // Read a local image as a text document
    const [result] = await client.documentTextDetection(fileName);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(`Full text: ${fullTextAnnotation.text}`);
    fullTextAnnotation.pages.forEach(page => {
        page.blocks.forEach(block => {
            console.log(`Block confidence: ${block.confidence}`);
            block.paragraphs.forEach(paragraph => {
                console.log(`Paragraph confidence: ${paragraph.confidence}`);
                paragraph.words.forEach(word => {
                    const wordText = word.symbols.map(s => s.text).join('');
                    console.log(`Word text: ${wordText}`);
                    console.log(`Word confidence: ${word.confidence}`);
                    word.symbols.forEach(symbol => {
                        console.log(`Symbol text: ${symbol.text}`);
                        console.log(`Symbol confidence: ${symbol.confidence}`);
                    });
                });
            });
        });
    });
    // [END vision_fulltext_detection]

});

// async function detectFulltext(fileName) {
//     // [START vision_fulltext_detection]

//     // Imports the Google Cloud client library
//     const vision = require('@google-cloud/vision');

//     // Creates a client
//     const client = new vision.ImageAnnotatorClient();

//     /**
//      * TODO(developer): Uncomment the following line before running the sample.
//      */
//     // const fileName = 'Local image file, e.g. /path/to/image.png';

//     // Read a local image as a text document
//     const [result] = await client.documentTextDetection(fileName);
//     const fullTextAnnotation = result.fullTextAnnotation;
//     console.log(`Full text: ${fullTextAnnotation.text}`);
//     fullTextAnnotation.pages.forEach(page => {
//         page.blocks.forEach(block => {
//             console.log(`Block confidence: ${block.confidence}`);
//             block.paragraphs.forEach(paragraph => {
//                 console.log(`Paragraph confidence: ${paragraph.confidence}`);
//                 paragraph.words.forEach(word => {
//                     const wordText = word.symbols.map(s => s.text).join('');
//                     console.log(`Word text: ${wordText}`);
//                     console.log(`Word confidence: ${word.confidence}`);
//                     word.symbols.forEach(symbol => {
//                         console.log(`Symbol text: ${symbol.text}`);
//                         console.log(`Symbol confidence: ${symbol.confidence}`);
//                     });
//                 });
//             });
//         });
//     });
//     // [END vision_fulltext_detection]
// }

