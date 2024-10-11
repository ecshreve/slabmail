import { Auth, google } from "googleapis";

/**
 * Lists the labels in the user's account.
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @returns {Promise<void>}
 */
export async function listLabels(auth: Auth.OAuth2Client): Promise<void> {
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
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @returns {Promise<any[]>} An array of message objects.
 */
export async function listEmails(auth: Auth.OAuth2Client): Promise<any[]> {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10,
  });
  const messages = res.data.messages;
  if (!messages || messages.length === 0) {
    console.log("No messages found.");
    return [];
  }

  console.log("Messages: ", messages.length);
  return messages;
}

/**
 * Fetches the details for a list of messages.
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @param {any[]} messages An array of message objects.
 * @returns {Promise<any[]>} An array of message details.
 */
export async function fetchMessageDetails(
  auth: Auth.OAuth2Client,
  messages: any[]
): Promise<any[]> {
  try {
    // Fetch details for each message
    const gmail = google.gmail({ version: "v1", auth });
    const messageDetails = await Promise.all(
      messages.map(async (message) => {
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
          from: msg.data.payload?.headers?.find(
            (header) => header.name === "From"
          )?.value,
        };
      })
    );

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
