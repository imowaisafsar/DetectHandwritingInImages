import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import * as vision from '@google-cloud/vision';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

const port = process.env.PORT || 3000;
const data = 'Welcome to Heroku App.';

app.use((req, res, next) => {
    console.log(`Request comes, ${req.body}`);
    next();
})

app.listen(port, () => {
    console.log(`Server is running.`)
})

app.get(`/intro`, (req, res) => {
    res.send(data);
});

app.get(`/recog`, async (req, res) => {

    console.log(req);

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const fileName = './resources/handwritten.jpg';
    // Read a local image as a text document
    const [result] = await client.documentTextDetection(fileName);

    res.send(result);
})

// $env:GOOGLE_APPLICATION_CREDENTIALS="D:\Projects\DetectHandwritingInImages\restro -332705-1c2a816449c7.json"

// & web:$env:GOOGLE_APPLICATION_CREDENTIALS="https://raw.githubusercontent.com/owais-afsar/DetectHandwritingInImages/main/restro-332705-1c2a816449c7.json"

