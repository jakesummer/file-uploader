import { createNewFolder } from "../db/queries/itemQueries.js";

export async function createFolderPost(req, res) {
  const folderName = req.body.name;
  const userId = req.user.id;
  const parentId = req.params.parentId ? Number(req.params.parentId) : null;

  await createNewFolder(folderName, userId, parentId);
  res.redirect(parentId ? `/dashboard/${parentId}` : "/dashboard");
}
