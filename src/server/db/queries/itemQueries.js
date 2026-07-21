import prisma from "../prisma.js";

export async function getUserItems(userId, parentId) {
  parentId = parentId ? Number(parentId) : null;

  return prisma.item.findMany({
    where: { userId, parentId },
  });
}

export async function getFolderById(userId, folderId) {
  return prisma.item.findFirst({
    where: {
      id: folderId,
      userId: userId,
    },
  });
}

export async function createNewFolder(folderName, userId, parentId) {
  await prisma.item.create({
    data: {
      name: folderName,
      type: "FOLDER",
      userId: userId,
      parentId,
    },
  });
}

export async function deleteItem(id) {
  return await prisma.item.delete({ where: { id: Number(id) } });
}
