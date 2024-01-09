import express from "express";
import { login, register } from "../controller/auth.js";

const router = express.Router();

router.post("/resgister", register);
router.post("/login", login);



export default router;