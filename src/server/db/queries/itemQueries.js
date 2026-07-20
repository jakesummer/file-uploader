import prisma from "../prisma.js";

export async function createNewFolder(folderName, userId) {
  await prisma.item.create({
    data: {
      name: folderName,
      type: "FOLDER",
      userId: userId,
    },
  });
}
