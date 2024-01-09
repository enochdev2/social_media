import express from "express";
import authRoute from "./authRoute.js"
import userRoute from "./userRoute.js"


const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", useeRoute);

export default router;
