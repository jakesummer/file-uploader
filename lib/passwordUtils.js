import crypto from "node:crypto";
import { promisify } from "node:util";

const argon2 = promisify(crypto.argon2);

async function hashPassword(password) {
  const nonce = crypto.randomBytes(16);

  const parameters = {
    message: password,
    nonce: nonce,
    parallelism: 1,
    passes: 1,
    memory: 47104,
    tagLength: 32,
  };

  const derivedKey = await argon2("argon2id", parameters);

  return `$argon2id$m=${parameters.memory},t=${parameters.passes},p=${parameters.parallelism}$${nonce.toString("base64url")}$${derivedKey.toString("base64url")}`;
}

async function verifyPassword(password, storedHash) {
  const [, , paramsStr, encodedNonce, encodedKey] = storedHash.split("$");

  const params = Object.fromEntries(
    paramsStr.split(",").map((p) => p.split("=")),
  );
  const nonce = Buffer.from(encodedNonce, "base64url");
  const keyBuffer = Buffer.from(encodedKey, "base64url");

  const parameters = {
    message: password,
    nonce: nonce,
    parallelism: parseInt(params.p),
    passes: parseInt(params.t),
    memory: parseInt(params.m),
    tagLength: keyBuffer.length,
  };

  const derivedKey = await argon2("argon2id", parameters);

  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

export { hashPassword, verifyPassword };
