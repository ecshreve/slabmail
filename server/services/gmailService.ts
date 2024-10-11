import { Auth, gmail_v1, google } from "googleapis";

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
 * @param {gmail_v1.Schema$Message[]} messages An array of message objects.
 * @returns {Promise<any[]>} An array of message details.
 */
export async function fetchMessageDetails(
  auth: Auth.OAuth2Client,
  messages: gmail_v1.Schema$Message[]
): Promise<any[]> {
  try {
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
          sender: msg.data.payload?.headers?.find(
            (header) => header.name === "From"
          )?.value,
          date: msg.data.internalDate,
          body: msg.data.payload?.parts?.find((part) => part.mimeType === "text/plain")?.body?.data && Buffer.from(msg.data.payload.parts.find((part) => part.mimeType === "text/plain")!.body!.data!, 'base64').toString('utf-8'),
        };
      })
    );

    console.log("Messages: ", messageDetails.length);
    return messageDetails;
  } catch (error) {
    console.error("Error fetching message details:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function fetchMessageById(auth: Auth.OAuth2Client, id: string): Promise<any> {
  const messages = await fetchMessageDetails(auth, [{id}]);
  return messages[0];
}
