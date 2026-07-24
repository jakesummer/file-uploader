import { getItemById } from "../db/queries/itemQueries.js";
import NotFoundError from "../errors/NotFoundError.js";

export default async function authorizeOwner(req, res, next) {
  const userId = req.user.id;
  const itemId = req.params.parentId || req.params.id || req.params.folderId;

  if (!itemId) return next();

  const item = await getItemById(itemId);
  if (item?.userId !== userId) throw new NotFoundError();

  next();
}
