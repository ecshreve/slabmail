import express from "express";
import { authorize } from "../auth";
import {
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

export default router;
