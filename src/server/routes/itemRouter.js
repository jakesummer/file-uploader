import * as itemController from "../controllers/itemController.js";
import { Router } from "express";

const itemRouter = Router();

itemRouter.post("/create/:itemType", (req, res) => {
  const { itemType } = req.params;

  if (itemType === "folder") {
    itemController.createFolderPost(req, res);
  }
});

export default itemRouter;
