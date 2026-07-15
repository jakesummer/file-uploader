import { createNewUser } from "../db/queries/userQueries.js";
import { hashPassword } from "../lib/passwordUtils.js";

export function signUpGet(req, res) {
  res.render("sign-up");
}

export async function signUpPost(req, res, next) {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    await createNewUser(req.body.username, hashedPassword);
    res.send("success!!");
  } catch (err) {
    next(err);
  }
}
