import multer from "multer";
import path from "node:path";
import {
  createNewFile,
  createNewFolder,
  deleteItem,
  getFilePath,
} from "../db/queries/itemQueries.js";

const __dirname = import.meta.dirname;
const uploadPath = path.join(__dirname, "../../../uploads");
const upload = multer({ dest: uploadPath });

export const createFilePost = [
  upload.single("file"),
  async (req, res) => {
    const userId = req.user.id;
    const parentId = req.params.parentId || null;
    const { originalname, path, mimetype, size } = req.file;

    await createNewFile(userId, parentId, originalname, path, mimetype, size);

    res.redirect(`/dashboard/${parentId || ""}`);
  },
];

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

export async function downloadFileGet(req, res) {
  const id = req.params.id;
  const { name, path } = await getFilePath(id);
  res.download(path, name);
}
