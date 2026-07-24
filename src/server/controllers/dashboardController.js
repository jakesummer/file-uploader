import { getUserItems } from "../db/queries/itemQueries.js";
import getTree from "../lib/getTree.js";
import getBreadcrumbs from "../lib/getBreadcrumbs.js";

export async function dashboardGet(req, res) {
  const userId = req.user.id;
  const username = req.user.username;
  const folderId = req.params.folderId;

  const alert = req.session?.alert;
  delete req.session.alert;

  const breadcrumbs = await getBreadcrumbs(userId, folderId, username);
  const { tree, expandedFolderIds } = await getTree(
    userId,
    username,
    breadcrumbs,
  );

  res.render("dashboard", {
    items: await getUserItems(userId, folderId),
    folderId,
    breadcrumbs,
    tree,
    expandedFolderIds,
    alert,
  });
}
