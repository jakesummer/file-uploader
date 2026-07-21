import { getItemById } from "../db/queries/itemQueries.js";
import NotFoundError from "../errors/NotFoundError.js";

export default function authorizeOwner(paramName) {
  return async (req, res, next) => {
    const userId = req.user.id;
    const itemId = req.params[paramName];

    if (!itemId) return next();

    const item = await getItemById(itemId);
    if (item?.userId !== userId) throw new NotFoundError();

    next();
  };
}
