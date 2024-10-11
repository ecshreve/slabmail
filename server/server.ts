// server.ts
import { authenticate } from "@google-cloud/local-auth";
import cors from "cors";
import express from "express";
import { promises as fs } from "fs";
import { Auth, google } from "googleapis";
import path from "path";
import process from "process";

const app = express();
const PORT = 3000;

app.use(cors());

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "../config/token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "../config/credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<Auth.OAuth2Client | null>}
 */
async function loadSavedCredentialsIfExist(): Promise<Auth.OAuth2Client | null> {
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
async function saveCredentials(client: Auth.OAuth2Client): Promise<void> {
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
async function authorize(): Promise<Auth.OAuth2Client> {
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

/**
 * Lists the labels in the user's account.
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 */
async function listLabels(auth: Auth.OAuth2Client): Promise<void> {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.labels.list({
    userId: "me",
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return;
  }
  console.log("Labels:");
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}

/**
 * Lists the emails in the user's account.
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 */
async function listEmails(auth: Auth.OAuth2Client): Promise<any> {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10,
  });
  const messages = res.data.messages;
  if (!messages || messages.length === 0) {
    console.log("No messages found.");
    return;
  }

  console.log("Messages: ", messages.length);
  return messages;
}

async function fetchMessageDetails(auth: Auth.OAuth2Client, messages: any[]): Promise<any[]> {
  try {
    // Fetch details for each message
    const gmail = google.gmail({ version: "v1", auth });
    const messageDetails = await Promise.all(messages.map(async (message) => {
      const msg = await gmail.users.messages.get({
        userId: "me", 
        id: message.id!,
      });
      return {
        id: msg.data.id,
        snippet: msg.data.snippet,
        subject: msg.data.payload?.headers?.find(
          (header) => header.name === "Subject"
        )?.value,
        from: msg.data.payload?.headers?.find((header) => header.name === "From")
            ?.value,
      };
    }));

    console.log("Messages: ", messageDetails.length);
    messageDetails.forEach((message) => {
      console.log(message);
    });
    return messageDetails;
  } catch (error) {
    console.error("Error fetching message details:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}


app.get("/api/emails", async (req, res) => {
  try {
    console.log("Fetching emails...");
    const auth = await authorize();
    const msgList = await listEmails(auth);
    const msgDetails = await fetchMessageDetails(auth, msgList);
    res.status(200).json(msgDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching emails.");
  }
});


app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
