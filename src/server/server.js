import "./config/loadEnv.js";
import express from "express";
import ViteExpress from "vite-express";
import path from "path";
import session from "express-session";
import prisma from "./db/prisma.js";
import passport from "passport";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import itemRouter from "./routes/itemRouter.js";
import isAuthenticated from "./middlewear/isAuthenticated.js";
import * as ejsHelpers from "./utils/ejsHelpers.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

const __dirname = import.meta.dirname;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.locals.helpers = ejsHelpers;
app.locals.isProd = process.env.NODE_ENV === "production";

app.use(
  session({
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  }),
);

import "./config/passport.js";

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.redirect("/dashboard"));

app.use(authRouter);
app.use("/dashboard", isAuthenticated, dashboardRouter);
app.use("/item", isAuthenticated, itemRouter);
app.use("/username", userRouter);

const PORT = process.env.PORT || 3000;
ViteExpress.listen(app, PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
