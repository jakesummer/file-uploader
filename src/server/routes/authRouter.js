import * as authController from "../controllers/authController.js";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/sign-up", authController.signUpGet);

export default authRouter;
