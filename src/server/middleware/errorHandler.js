import Prisma from "@prisma/client/runtime/client";

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message;

  if (err.code === "ECONNREFUSED") {
    statusCode = 500;
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    statusCode = 400;
    errorMessage = "Invalid request or database query!";
  }

  if (statusCode === 500 || !err.message) {
    errorMessage = "Internal Server Error! Please try again later.";
  }

  res.status(statusCode).render("error", { statusCode, errorMessage });
}
