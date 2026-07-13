import prisma from "../prisma.js";

async function getUserByUsername(username) {
  return prisma.user.findUnique({
    where: { username },
  });
}

async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export { getUserByUsername, getUserById };
