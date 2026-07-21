import { getUserItems } from "../db/queries/itemQueries.js";

export async function dashboardGet(req, res) {
  const userId = req.user.id;
  const folderId = req.params.folderId;

  res.render("dashboard", {
    items: await getUserItems(userId, folderId),
    folderId,
  });
}
