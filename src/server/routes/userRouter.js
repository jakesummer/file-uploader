import { Router } from "express";
import { getUserByUsername } from "../db/queries/userQueries.js";

const userRouter = Router();

userRouter.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const userExists = await getUserByUsername(username);

    if (userExists) {
      return res.status(200).json({ available: false });
    }
    return res.status(200).json({ available: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

export default userRouter;
