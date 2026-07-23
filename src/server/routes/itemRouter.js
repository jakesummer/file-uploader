import * as itemController from "../controllers/itemController.js";
import { Router } from "express";

const itemRouter = Router();

itemRouter.post("/create/folder{/:parentId}", itemController.createFolderPost);

itemRouter.post("/create/file{/parentId}", itemController.createFilePost);

itemRouter.post("/delete/:id", itemController.deletePost);

export default itemRouter;
