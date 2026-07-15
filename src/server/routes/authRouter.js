import * as authController from "../controllers/authController.js";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/sign-up", authController.signUpGet);
authRouter.post("/sign-up", authController.signUpPost);

export default authRouter;
