import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import { db } from "./lib/index.js";
import errorMiddleWare from "./middleware/middleware.js";

dotenv.config();
const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(dev));
app.use(errorMiddleWare)

await db()

app.get("/" ,(req, res)=>{
res.json("new api")
});

const PORT = process.env.port || 3000;

app.listen( PORT, () =>{
    console.log( `server running on Port: ${3000}`);
} );
