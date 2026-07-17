import passport from "passport";
import { body, matchedData, validationResult } from "express-validator";
import { createNewUser, getUserByUsername } from "../db/queries/userQueries.js";
import { hashPassword } from "../lib/passwordUtils.js";

export function signUpGet(req, res) {
  res.render("sign-up", { title: "Sign Up" });
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
    )
    .custom(async (username) => {
      const user = await getUserByUsername(username);
      if (user) throw new Error("Username is taken!");
    }),
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
        title: "Sign Up",
      });
    }

    try {
      const { username, password } = matchedData(req);
      const hashedPassword = await hashPassword(password);
      await createNewUser(username.toLowerCase(), hashedPassword);
      res.render("sign-in", {
        title: "Sign In",
      });
    } catch (err) {
      next(err);
    }
  },
];

export function signInGet(req, res) {
  const errorMessages = req.session.messages || [];
  req.session.messages = [];

  res.render("sign-in", {
    title: "Sign In",
    errorMessages,
  });
}

export const signInPost = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/sign-in",
  failureMessage: true,
});
