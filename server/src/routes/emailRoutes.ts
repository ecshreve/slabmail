import express from "express";
import { authorize } from "../auth";
import {
  fetchDefaultEmails,
  fetchEmailsByLabel,
  fetchLabelById,
  fetchLabelDetails,
  fetchLabels,
  fetchMessageById,
  fetchMessageDetails,
  listEmails,
  starMessage,
  unstarMessage
} from "../services/gmailService";

const router = express.Router();

/**
 * Fetches all emails from the user's mailbox.
 * 
 * @route GET /emails
 * @returns {Array} An array of email objects.
 */
router.get("/emails", async (req, res) => {
  try {
    const auth = await authorize();
    const msgList = await listEmails(auth);
    const msgDetails = await fetchMessageDetails(auth, msgList);
    res.status(200).json(msgDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching emails.");
  }
});

/**
 * Fetches a single email by ID.
 * 
 * @route GET /emails/:id
 * @returns {Object} An email object.
 */
router.get("/emails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await authorize();
    const email = await fetchMessageById(auth, id);
    res.status(200).json(email);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the email.");
  }
});

/**
 * Stars or unstars an email by ID.
 * 
 * @route GET /emails/:id/star
 * @returns {Object} A success status.
 */
router.get("/emails/:id/star", async (req, res) => {
  try {
    const { id } = req.params;
    const { starred } = req.query;
    const auth = await authorize();
    if (starred === 'true') {
      await unstarMessage(auth, id);
    } else {
      await starMessage(auth, id);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while starring the email." });
  }
});

/**
 * Fetches all labels for the user.
 * 
 * @route GET /labels
 * @returns {Array} An array of label objects.
 */
router.get("/labels", async (req, res) => {
  try {
    const auth = await authorize();
    const labels = await fetchLabels(auth);
    const labelDetails = await fetchLabelDetails(auth, labels);
    res.status(200).json(labelDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching labels.");
  }
});

/**
 * Fetches a label by ID.
 * 
 * @route GET /labels/:id
 * @returns {Object} A label object.
 */
router.get("/labels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await authorize();
    if (id === 'default') {
      const labelIds = ['INBOX', 'STARRED', 'UNREAD'];
      const labelData = await Promise.all(labelIds.map(id => fetchLabelById(auth, id)));
      res.status(200).json(labelData);
    } else {
      const label = await fetchLabelById(auth, id);
      res.status(200).json(label);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the label.");
  }
});

/**
 * Fetches details for the default set of labels: ['INBOX', 'STARRED', 'UNREAD']
 * 
 * @route GET /labels/default
 * @returns {Array} An array of label objects.
 */
router.get("/labels/default", async (req, res) => {
  try {
    const auth = await authorize();
    const labelIds = ['INBOX', 'STARRED', 'UNREAD'];
    const labels = await Promise.all(labelIds.map(id => fetchLabelById(auth, id)));
    res.status(200).json(labels);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the default labels.");
  }
});

/**
 * Fetches emails for the default set of labels: ['INBOX', 'STARRED', 'UNREAD']
 * 
 * @route GET /emails/labels/default
 * @returns {Array} An array of email objects.
 */
router.get("/emails/labels/default", async (req, res) => {
  try {
    const auth = await authorize();
    const emails = await fetchDefaultEmails(auth);
    const messageDetails = await fetchMessageDetails(auth, emails);
    res.status(200).json(messageDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching emails by default labels.");
  }
});

/**
 * Fetches emails for a specific label.
 * 
 * @route GET /emails/labels/:id
 * @returns {Array} An array of email objects.
 */
router.get("/emails/labels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await authorize();
    const emails = await fetchEmailsByLabel(auth, id);
    const messageDetails = await fetchMessageDetails(auth, emails);
    res.status(200).json(messageDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching emails by label.");
  }
});

/**
 * Fetches messages by label ID.
 * 
 * @route GET /messages/labels/:id
 * @returns {Array} An array of message objects.
 */
router.get("/messages/labels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await authorize();
    const messages = await fetchEmailsByLabel(auth, id);
    const messageDetails = await fetchMessageDetails(auth, messages);
    res.status(200).json(messageDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching messages by label.");
  }
});

/**
 * Fetches a message by ID.
 * 
 * @route GET /messages/:id
 * @returns {Object} A message object.
 */
router.get("/messages/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const auth = await authorize();
    const message = await fetchMessageById(auth, id);
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the message.");
  }
});

export default router;