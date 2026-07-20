import { createNewFolder } from "../db/queries/itemQueries.js";

export async function createFolderPost(req, res) {
  const folderName = req.body.name;
  const userId = req.user.id;
  createNewFolder(folderName, userId);
  res.redirect("/dashboard");
}
