import * as dashboardController from "../controllers/dashboardController.js";
import { Router } from "express";

const dashboardRouter = Router();

dashboardRouter.get("/{:folderId}", dashboardController.dashboardGet);

export default dashboardRouter;
