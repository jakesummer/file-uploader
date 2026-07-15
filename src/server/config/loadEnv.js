import path from "path";
import { loadEnvFile } from "process";
import { existsSync } from "fs";

const __dirname = import.meta.dirname;
const envPath = path.join(__dirname, "../../..", ".env");
if (existsSync(envPath)) {
  loadEnvFile(envPath);
}
