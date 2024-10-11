import express from "express";
import { authorize } from "../auth";
import { fetchLabelDetails, fetchLabels, fetchMessageById, fetchMessageDetails, listEmails } from "../services/gmailService";

const router = express.Router();

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
