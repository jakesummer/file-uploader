import { getFolderById } from "../db/queries/itemQueries.js";

export default async function getBreadcrumbs(userId, folderId, username) {
  const breadcrumbs = [];

  let currentId = folderId;

  while (currentId) {
    const item = await getFolderById(userId, currentId);

    if (!item) break;

    breadcrumbs.unshift({
      id: item.id,
      name: item.name,
    });

    currentId = item.parentId;
  }

  breadcrumbs.unshift({ id: "", name: username }); // Root folder

  return breadcrumbs;
}
