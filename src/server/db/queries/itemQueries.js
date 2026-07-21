import prisma from "../prisma.js";

const toNum = (val) => {
  if (
    val === null ||
    val === undefined ||
    (typeof val === "string" && val.trim() === "")
  ) {
    return null;
  }
  return Number(val);
};

export async function getUserItems(userId, parentId = null) {
  return prisma.item.findMany({
    where: {
      userId: toNum(userId),
      parentId: toNum(parentId),
    },
  });
}

export async function getUserFolders(userId) {
  return prisma.item.findMany({ where: { userId } });
}

export async function getItemById(id) {
  return prisma.item.findUnique({ where: { id: toNum(id) } });
}

export async function getFolderById(userId, folderId) {
  return prisma.item.findFirst({
    where: {
      id: toNum(folderId),
      userId: toNum(userId),
    },
  });
}

export async function createNewFolder(folderName, userId, parentId) {
  await prisma.item.create({
    data: {
      name: folderName,
      type: "FOLDER",
      userId: toNum(userId),
      parentId: toNum(parentId),
    },
  });
}

export async function deleteItem(id) {
  return await prisma.item.delete({ where: { id: toNum(id) } });
}
