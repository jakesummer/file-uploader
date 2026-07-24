import multer from "multer";
import path from "node:path";
import {
  createNewFile,
  createNewFolder,
  deleteItem,
  getFilePath,
} from "../db/queries/itemQueries.js";

const MAX_FILE_SIZE_MB = 50;

const __dirname = import.meta.dirname;
const uploadPath = path.join(__dirname, "../../../uploads");
const upload = multer({
  dest: uploadPath,
  limits: {
    fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
  },
});

export const createFilePost = [
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .send(`File exceeds the ${MAX_FILE_SIZE_MB}MB limit!`);
      } else if (err) {
        return res.status(400).send(err);
      }
      next();
    });
  },
  async (req, res) => {
    const userId = req.user.id;
    const parentId = req.params.parentId || null;
    const { originalname, path, mimetype, size } = req.file;

    await createNewFile(userId, parentId, originalname, path, mimetype, size);

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
