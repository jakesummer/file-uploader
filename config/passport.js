import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserById,
  getUserByUsername,
} from "../../../db/queries/userQueries.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // eslint-disable-next-line no-undef
      const match = await verifyPassword(password, user.password); // TODO
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
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
    done(null, user);
  } catch (err) {
    done(err);
  }
});
