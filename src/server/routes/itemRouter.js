import * as itemController from "../controllers/itemController.js";
import { Router } from "express";
import authorizeOwner from "../middleware/authorizeOwner.js";

const itemRouter = Router();

itemRouter.post(
  "/create/folder{/:parentId}",
  authorizeOwner,
  itemController.createFolderPost,
);

itemRouter.post(
  "/create/file{/:parentId}",
  authorizeOwner,
  itemController.createFilePost,
);

itemRouter.post("/delete/:id", authorizeOwner, itemController.deletePost);

itemRouter.get("/download/:id", authorizeOwner, itemController.downloadFileGet);

export default itemRouter;
