import { getUserFolders } from "../db/queries/itemQueries.js";

export default async function getTree(userId, username, breadcrumbs) {
  const allFolders = await getUserFolders(userId);

  const childrenByParent = {};
  for (const folder of allFolders) {
    const pId = folder.parentId ?? "root";
    if (!childrenByParent[pId]) childrenByParent[pId] = [];
    childrenByParent[pId].push(folder);
  }

  const expandedFolderIds = new Set();
  breadcrumbs
    .slice(1)
    .forEach((folder) => expandedFolderIds.add(String(folder.id)));

  function getSubtree(parentId) {
    const children = childrenByParent[parentId ?? "root"] || [];

    return children.map((child) => ({
      name: child.name,
      id: child.id,
      children: getSubtree(child.id),
    }));
  }

  return {
    tree: {
      name: username,
      id: "",
      children: getSubtree(null), // all folders in root have parentId of null
    },
    expandedFolderIds,
  };
}
