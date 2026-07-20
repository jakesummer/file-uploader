import { Router } from "express";

const itemRouter = Router();

itemRouter.post("/create/:itemType", (req, res) => {
  const { itemType } = req.params;

  res.send(itemType);
});

export default itemRouter;
