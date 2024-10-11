import express from "express";
import { authorize } from "../auth";
import { fetchMessageDetails, listEmails } from "../services/gmailService";

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

export default router;
