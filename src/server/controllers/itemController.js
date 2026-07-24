import upload from "../config/multer.js";
import { MulterError } from "multer";
import {
  createNewFile,
  createNewFolder,
  deleteItem,
  getFilePath,
} from "../db/queries/itemQueries.js";

export const createFilePost = [
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err instanceof MulterError) {
        return res.status(400).send(`File exceeds the 50MB limit!`);
      } else if (err) {
        console.log(err);
        return res
          .status(400)
          .send("An unexpected error occurred while uploading your file!");
      }

      if (!req.file) {
        return res.status(400).send("Please upload a file!");
      }

      next();
    });
  },
  async (req, res) => {
    const userId = req.user.id;
    const parentId = req.params.parentId || null;
    const { originalname, key, mimetype } = req.file;
    const size =
      req.file.size > 0
        ? req.file.size
        : parseInt(req.headers["content-length"] || "0", 10);

    await createNewFile(userId, parentId, originalname, key, mimetype, size);

    req.session.alert = `Uploaded File: ${originalname}!`;

    res.send();
  },
];

export async function createFolderPost(req, res) {
  const folderName = req.body.name;
  const userId = req.user.id;
  const parentId = req.params.parentId || null;

  await createNewFolder(folderName, userId, parentId);

  req.session.alert = `Created Folder: ${folderName}!`;

  res.redirect(`/dashboard/${parentId || ""}`);
}

export async function deletePost(req, res) {
  const id = req.params.id;
  const deletedItem = await deleteItem(id);
  const parentId = deletedItem.parentId || "";

  const itemType =
    deletedItem.type[0] + deletedItem.type.slice(1).toLowerCase();
  req.session.alert = `Deleted ${itemType}: ${deletedItem.name}!`;

  res.redirect(`/dashboard/${parentId}`);
}

export async function downloadFileGet(req, res) {
  const id = req.params.id;
  const { name, path } = await getFilePath(id);
  res.download(path, name);
}
