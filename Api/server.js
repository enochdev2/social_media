import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import helmet from "helmet";
import { db } from "./lib/index.js";
import errorMiddleWare from "./middleware/middleware.js";
import router from "./routes/index.js";

const __dirname = path.resolve(path.dirname(""));

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, "views/build")));

await db();

const PORT = process.env.port || 4000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(router);

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`server running on Port: ${PORT}`);
});
