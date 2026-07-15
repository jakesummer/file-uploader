import { body, matchedData, validationResult } from "express-validator";
import { createNewUser } from "../db/queries/userQueries.js";
import { hashPassword } from "../lib/passwordUtils.js";

export function signUpGet(req, res) {
  res.render("sign-up");
}

const lengthErr = (min, max) => `must be between ${min} and ${max} characters!`;
const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 16 })
    .withMessage(`Username ${lengthErr(2, 16)}`)
    .matches(/^[a-zA-Z0-9_.]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores, and periods!",
    ),
  body("password")
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(`Password ${lengthErr(8, 16)}`)
    .matches(/^[a-zA-Z0-9_.[\]{}()!@#$%^&*+\-=\\/|:;'",<>?`~]+$/)
    .withMessage(
      "Password can only contain letters, numbers, and special characters!",
    ),
];

export const signUpPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArr = errors.array();
      return res.status(400).render("sign-up", {
        username: req.body.username,
        usernameErrorMsg: errorsArr.find((e) => e.path === "username")?.msg,
        passwordErrorMsg: errorsArr.find((e) => e.path === "password")?.msg,
      });
    }

    try {
      const { username, password } = matchedData(req);
      const hashedPassword = await hashPassword(password);
      await createNewUser(username, hashedPassword);
      res.send("success!!");
    } catch (err) {
      next(err);
    }
  },
];
