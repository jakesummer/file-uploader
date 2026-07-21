import * as itemController from "../controllers/itemController.js";
import { Router } from "express";

const itemRouter = Router();

itemRouter.post("/create/:itemType{/:parentId}", (req, res) => {
  const { itemType } = req.params;

  if (itemType === "folder") {
    itemController.createFolderPost(req, res);
  }
});

itemRouter.post("/delete/:id", itemController.deletePost);

export default itemRouter;
