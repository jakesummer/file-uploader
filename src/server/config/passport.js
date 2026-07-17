import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserById, getUserByUsername } from "../db/queries/userQueries.js";
import { verifyPassword } from "../lib/passwordUtils.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username!" });
      }

      const match = await verifyPassword(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password!" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);

    if (!user) {
      return done(null, false);
    }
    done(null, { id: user.id, username: user.username });
  } catch (err) {
    done(err);
  }
});
