import { getUserItems } from "../db/queries/itemQueries.js";
import getBreadcrumbs from "../lib/getBreadcrumbs.js";

export async function dashboardGet(req, res) {
  const userId = req.user.id;
  const folderId = req.params.folderId;
  const breadcrumbs = await getBreadcrumbs(userId, folderId, req.user.username);

  res.render("dashboard", {
    items: await getUserItems(userId, folderId),
    folderId,
    breadcrumbs,
  });
}
