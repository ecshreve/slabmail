import { authenticate } from "@google-cloud/local-auth";
import { promises as fs } from "fs";
import { Auth, google } from "googleapis";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = path.join(process.cwd(), "../config/token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "../config/credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<Auth.OAuth2Client | null>}
 */
export async function loadSavedCredentialsIfExist(): Promise<Auth.OAuth2Client | null> {
  try {
    const content = await fs.readFile(TOKEN_PATH, "utf-8");
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials) as Auth.OAuth2Client;
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {Auth.OAuth2Client} client
 * @return {Promise<void>}
 */
export async function saveCredentials(client: Auth.OAuth2Client): Promise<void> {
  const content = await fs.readFile(CREDENTIALS_PATH, "utf-8");
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 * @return {Promise<Auth.OAuth2Client>}
 */
export async function authorize(): Promise<Auth.OAuth2Client> {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = (await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })) as Auth.OAuth2Client;
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}
