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
    console.log(`Server is running on port: ${port}`);
})

app.get(`/intro`, (req, res) => {
    res.send(data);
});

app.get(`/recog`, async (req, res) => {

    try {
        const client = new vision.ImageAnnotatorClient();
        const fileName = './resources/handwritten.jpg';
        const [result] = await client.documentTextDetection(fileName);
        res.status(200).send(result);
    } catch (ex) {
        res.status(400).send(ex);
    }
})

// $env:GOOGLE_APPLICATION_CREDENTIALS="D:\Projects\DetectHandwritingInImages\restro -332705-1c2a816449c7.json"

// & web:$env:GOOGLE_APPLICATION_CREDENTIALS="https://raw.githubusercontent.com/owais-afsar/DetectHandwritingInImages/main/restro-332705-1c2a816449c7.json"

