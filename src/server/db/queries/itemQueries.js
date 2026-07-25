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

const getPath = async (parentId) => {
  parentId = toNum(parentId);
  let path = [];

  if (parentId) {
    const parent = await prisma.item.findUnique({
      where: { id: parentId },
      select: { path: true },
    });

    if (parent) {
      path = [...parent.path, parentId];
    }
  }

  return path;
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
  return prisma.item.findMany({ where: { userId, type: "FOLDER" } });
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
  const path = await getPath(parentId);

  await prisma.item.create({
    data: {
      name: folderName,
      type: "FOLDER",
      path,
      userId: toNum(userId),
      parentId: toNum(parentId),
    },
  });
}

export async function createNewFile(
  userId,
  parentId,
  fileName,
  storageLocation,
  mimeType,
  size,
) {
  if (!storageLocation) throw new Error();
  const path = await getPath(parentId);

  await prisma.item.create({
    data: {
      name: fileName,
      type: "FILE",
      path,
      storageLocation: storageLocation,
      mimeType,
      size,
      userId: toNum(userId),
      parentId: toNum(parentId),
    },
  });
}

export async function deleteItem(id) {
  return await prisma.item.delete({ where: { id: toNum(id) } });
}

export async function getFileStorageLocation(id) {
  return prisma.item.findUnique({
    where: { id: toNum(id) },
    select: {
      name: true,
      storageLocation: true,
    },
  });
}
