import { getUserFolders } from "../db/queries/itemQueries.js";

export default async function getTree(userId, username) {
  const allFolders = await getUserFolders(userId);

  const childrenByParent = {};
  for (const folder of allFolders) {
    const pId = folder.parentId ?? "root";
    if (!childrenByParent[pId]) childrenByParent[pId] = [];
    childrenByParent[pId].push(folder);
  }

  function getSubtree(parentId) {
    const children = childrenByParent[parentId ?? "root"] || [];

    return children.map((child) => ({
      name: child.name,
      id: child.id,
      children: getSubtree(child.id),
    }));
  }

  return {
    name: username,
    id: "",
    children: getSubtree(null), // all folders in root have parentId of null
  };
}
