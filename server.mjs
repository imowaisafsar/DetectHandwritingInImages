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
app.get(`/get-all`, (req, res) => {
    res.send(data);
})

