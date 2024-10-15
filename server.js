import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { readdirSync } from 'fs';

const app = express();
const PORT = process.env.port || 3306;

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Automatically load all routers in the routes directory
readdirSync('./routes').map((file) => {
    import(`./routes/${file}`).then((module) => {
        app.use('/api', module.default);
    }).catch((err) => console.error(`Failed to load ${file}:`, err));
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});