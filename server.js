import express from "express";
import morgan from "morgan";
import cors from "cors";
import { readdirSync } from "fs";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
const app = express();
const PORT = process.env.port || 3000;

// middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "10 mb" }));
app.use(cors());
dotenv.config();
// Configuration cloudinary
cloudinary.config({
  cloud_name: process.env.COULD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Automatically load all routers in the routes directory
readdirSync("./routes").map((file) => {
  import(`./routes/${file}`)
    .then((module) => {
      app.use("/api", module.default);
    })
    .catch((err) => console.error(`Failed to load ${file}:`, err));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
