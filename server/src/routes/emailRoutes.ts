import express from "express";
import { authorize } from "../auth";
import {
  fetchDefaultEmails,
  fetchLabelById,
  fetchLabelDetails,
  fetchLabels,
  fetchMessageById,
  fetchMessageDetails,
  listEmails,
  starMessage,
  unstarMessage,
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
    const label = await fetchLabelById(auth, id);
    res.status(200).json(label);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the label.");
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
    res
      .status(500)
      .send("An error occurred while fetching emails by default labels.");
  }
});

/**
 * Updates the starred status of an email by ID.
 *
 * @route PUT /emails/:id/star
 * @returns {Object} A success status.
 */
router.put("/emails/:id/star/:setStarred", async (req, res) => {
  try {
    const auth = await authorize();
    const { id, setStarred } = req.params;

    let starredMessage, unstarredMessage;
    if (setStarred === "true") {
      starredMessage = await starMessage(auth, id);
    } else {
      unstarredMessage = await unstarMessage(auth, id);
    }
    res.status(200).json(starredMessage || unstarredMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while starring the email.");
  }
});

export default router;
