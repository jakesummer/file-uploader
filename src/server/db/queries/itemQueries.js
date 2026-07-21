import prisma from "../prisma.js";

export async function getAllUserItems(userId) {
  return prisma.item.findMany({ where: { userId } });
}

export async function createNewFolder(folderName, userId) {
  await prisma.item.create({
    data: {
      name: folderName,
      type: "FOLDER",
      userId: userId,
    },
  });
}
