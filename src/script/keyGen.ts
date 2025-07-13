import { generateKeyPairSync } from "crypto";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

// Define the directory to store the keys
const keyDir = path.join(__dirname, "../key");

// Ensure the key directory exists
if (!existsSync(keyDir)) {
  mkdirSync(keyDir);
  console.log(`Created directory: ${keyDir}`);
}

try {
  // Generate the key pair
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048, // Key size in bits
    publicKeyEncoding: {
      type: "spki", // Recommended public key format
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8", // Recommended private key format
      format: "pem",
    },
  });

  // Write the keys to files
  const privateKeyPath = path.join(keyDir, "private.pem");
  const publicKeyPath = path.join(keyDir, "public.pem");

  writeFileSync(privateKeyPath, privateKey);
  writeFileSync(publicKeyPath, publicKey);

  console.log(`Private key saved to: ${privateKeyPath}`);
  console.log(`Public key saved to: ${publicKeyPath}`);
} catch (error: any) {
  console.error("Error generating keys:", error.message);
}
