import express from "express";
import ViteExpress from "vite-express";
import path from "path";
import { loadEnvFile } from "process";
import { existsSync } from "fs";

const __dirname = import.meta.dirname;

const envPath = path.join(__dirname, "..", ".env");
if (existsSync(envPath)) {
  loadEnvFile(envPath);
}

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.locals.isProd = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || 3000;
ViteExpress.listen(app, PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
