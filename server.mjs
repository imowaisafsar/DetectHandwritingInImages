import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import * as vision from '@google-cloud/vision';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.json({ limit: '100mb' }));
app.use(morgan('short'));

const port = process.env.PORT || 3000;
const data = 'Welcome to Heroku App.';

app.use((req, res, next) => {
    console.log(`New request comes`);
    console.log(req.body);
    next();
});
// app.use(bodyParser.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get(`/intro`, (req, res) => {
    res.send(data);
});

app.post(`/recog`, express.json({ limit: 104857600 }), async (req, res) => {

    console.log(req.body);
    try {
        const client = new vision.ImageAnnotatorClient();
        // console.log(client);
        const fileName = './blob/main/resources/handwritten.jpg';
        // const fileName = req.body.image;
        console.log(fileName);
        const [result] = await client.documentTextDetection(fileName);
        console.log(result);
        res.status(200).send(result);
    } catch (ex) {
        res.status(400).send(ex);
    }
})

// $env:GOOGLE_APPLICATION_CREDENTIALS="D:\Projects\DetectHandwritingInImages\restro -332705-1c2a816449c7.json"

// & web:$env:GOOGLE_APPLICATION_CREDENTIALS="https://raw.githubusercontent.com/owais-afsar/DetectHandwritingInImages/main/restro-332705-1c2a816449c7.json"

