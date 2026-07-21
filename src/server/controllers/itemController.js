import { createNewFolder, deleteItem } from "../db/queries/itemQueries.js";

export async function createFolderPost(req, res) {
  const folderName = req.body.name;
  const userId = req.user.id;
  const parentId = req.params.parentId || null;

  await createNewFolder(folderName, userId, parentId);
  res.redirect(`/dashboard/${parentId || ""}`);
}

export async function deletePost(req, res) {
  const id = req.params.id;
  const deletedItem = await deleteItem(id);
  const parentId = deletedItem.parentId || "";

  res.redirect(`/dashboard/${parentId}`);
}
