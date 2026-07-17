import * as dashboardController from "../controllers/dashboardController.js";
import { Router } from "express";

const dashboardRouter = Router();

dashboardRouter.get("/", dashboardController.dashboardGet);

export default dashboardRouter;
