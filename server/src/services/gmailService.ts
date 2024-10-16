import { Auth, gmail_v1, google } from "googleapis";

/**
 * Lists the labels in the user's account.
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @returns {Promise<any[]>} An array of label objects.
 */
export async function fetchLabels(auth: Auth.OAuth2Client): Promise<any[]> {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.labels.list({
    userId: "me",
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return [];
  }

  // Ignore labels that start with "CATEGORY_"
  const filteredLabels = labels.filter(
    (label) => !label.name?.startsWith("CATEGORY_")
  );

  return filteredLabels;
}

/**
 * Fetches the details for a label by ID.
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @param {string} id The ID of the label.
 * @returns {Promise<any>} The label details.
 */
export async function fetchLabelDetails(
  auth: Auth.OAuth2Client,
  labels: gmail_v1.Schema$Label[]
): Promise<any> {
  const gmail = google.gmail({ version: "v1", auth });
  const labelDetails = await Promise.all(
    labels.map(async (label) => {
      const res = await gmail.users.labels.get({
        userId: "me",
        id: label.id!,
      });
      return res.data;
    })
  );
  return labelDetails;
}

/**
 * Fetches a single label by ID.
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @param {string} id The ID of the label.
 * @returns {Promise<any>} The label details.
 */
export async function fetchLabelById(
  auth: Auth.OAuth2Client,
  id: string
): Promise<any> {
  const label = await fetchLabelDetails(auth, [{ id }]);
  return label[0];
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
          body:
            msg.data.payload?.parts?.find(
              (part) => part.mimeType === "text/plain"
            )?.body?.data &&
            Buffer.from(
              msg.data.payload.parts.find(
                (part) => part.mimeType === "text/plain"
              )!.body!.data!,
              "base64"
            ).toString("utf-8"),
          labelIds: msg.data.labelIds,
          isStarred: msg.data.labelIds?.includes("STARRED"),
        };
      })
    );
    return messageDetails;
  } catch (error) {
    console.error("Error fetching message details:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

/**
 * Fetches a single message by ID.
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @param {string} id The ID of the message.
 * @returns {Promise<any>} The message details.
 */
export async function fetchMessageById(
  auth: Auth.OAuth2Client,
  id: string
): Promise<any> {
  const messages = await fetchMessageDetails(auth, [{ id }]);
  return messages[0];
}

/**
 * Stars a message by ID.
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @param {string} id The ID of the message.
 * @returns {Promise<any>} The message details.
 */
export async function starMessage(auth: Auth.OAuth2Client, id: string): Promise<any> {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.modify({
    userId: "me",
    id: id,
    requestBody: {
      addLabelIds: ["STARRED"],
    },
  });
  return res.data;
}

/**
 * Unstars a message by ID.
 *
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @param {string} id The ID of the message.
 * @returns {Promise<any>} The message details.
 */
export async function unstarMessage(
  auth: Auth.OAuth2Client,
  id: string
): Promise<any> {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.modify({
    userId: "me",
    id: id,
    requestBody: {
      removeLabelIds: ["STARRED"],
    },
  });
  return res.data;
}

/**
 * Fetches emails for the default set of labels: ['INBOX', 'STARRED', 'UNREAD']
 * 
 * @param {Auth.OAuth2Client} auth An authorized OAuth2 client.
 * @returns {Promise<any[]>} An array of email objects.
 */
export async function fetchDefaultEmails(auth: Auth.OAuth2Client): Promise<any[]> {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({
    userId: "me",
    labelIds: ["INBOX", "UNREAD", "STARRED"],
    maxResults: 100,
  });
  const messages = res.data.messages;
  if (!messages || messages.length === 0) {
    console.log("No messages found for default labels.");
    return [];
  }
  return messages;
}
