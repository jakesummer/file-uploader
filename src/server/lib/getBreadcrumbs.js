import { getFolderById, getItemsByIds } from "../db/queries/itemQueries.js";

export default async function getBreadcrumbs(userId, folderId, username) {
  const breadcrumbs = [{ id: "", name: username }]; // Root folder

  if (!folderId) return breadcrumbs;

  const folder = await getFolderById(userId, folderId);

  if (!folder) return breadcrumbs;

  const pathIds = [...folder.path, folder.id];

  const items = await getItemsByIds(userId, pathIds);
  const itemMap = new Map(items.map((i) => [i.id, i]));

  for (const id of pathIds) {
    const item = itemMap.get(id);
    breadcrumbs.push({ id: item.id, name: item.name });
  }

  return breadcrumbs;
}
