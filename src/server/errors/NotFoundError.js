import CustomError from "./CustomError.js";

export default class NotFoundError extends CustomError {
  constructor(message = "Resource not found!") {
    super(message, 404);
  }
}
