import express from "express";
import morgan from "morgan";
// import authRouter from './routes/auth.js'
// import categoryRouter from "./routes/category.js";
import cors from 'cors'
import {readdirSync} from 'fs'


const app = express();
const PORT = process.env.port || 3000;

const readdir = readdirSync;

// middleware

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Router

// app.use('/api', authRouter);
// app.use('/api', categoryRouter);

// console.log(readdir(`./routes`));


readdir('./routes')
    .map((item) => app.use('/api', ('./routes/' + item)))








//start server
app.listen( PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})