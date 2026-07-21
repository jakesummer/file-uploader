import * as dashboardController from "../controllers/dashboardController.js";
import { Router } from "express";
import authorizeOwner from "../middleware/authorizeOwner.js";

const dashboardRouter = Router();

dashboardRouter.get(
  "/{:folderId}",
  authorizeOwner("folderId"),
  dashboardController.dashboardGet,
);

export default dashboardRouter;
