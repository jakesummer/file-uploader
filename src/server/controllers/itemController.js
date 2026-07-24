import upload from "../config/multer.js";
import client from "../config/s3Client.js";
import { MulterError } from "multer";
import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  createNewFile,
  createNewFolder,
  deleteItem,
  getFilePath,
  getItemById,
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
  const item = await getItemById(id);
  const parentId = item.parentId || "";

  if (item.type == "FILE") {
    const command = new DeleteObjectCommand({
      Bucket: "uploads",
      Key: item.path,
    });

    await client.send(command);
  }

  await deleteItem(id);

  const itemType = item.type[0] + item.type.slice(1).toLowerCase();
  req.session.alert = `Deleted ${itemType}: ${item.name}!`;

  res.redirect(`/dashboard/${parentId}`);
}

export async function downloadFileGet(req, res) {
  const id = req.params.id;
  const { name, path } = await getFilePath(id);

  const command = new GetObjectCommand({
    Bucket: "uploads",
    Key: path,
    ResponseContentDisposition: `attachment, filename=${name}`,
  });

  const signedUrl = await getSignedUrl(client, command, { expiresIn: 60 });

  res.redirect(signedUrl);
}
