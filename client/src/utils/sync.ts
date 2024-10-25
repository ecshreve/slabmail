import { Email } from "../types/Email";
import { db } from "./dbdexie";
import tracer from "./otel";

const putEmails = async (serverEmails: Email[]) => {
  tracer.startActiveSpan("putEmails", async (span) => {
    await db.emails.bulkPut(serverEmails);
    span.end();
  });
};

export const refreshEmails = async () => {
  tracer.startActiveSpan("refreshEmails", async (span) => {
    // Sync to server
    try {
      const response = await fetch("http://localhost:3000/api/emails");
      if (!response.ok) throw new Error("Network response was not ok");
      const serverEmails: Email[] = await response.json();

      // Merge emails with local emails, prefer local emails
      const localEmails = await db.emails.toArray();
      const mergedEmails = await Promise.all(serverEmails.map(async (serverEmail) => {
        const localEmail = localEmails.find((localEmail) => localEmail.id === serverEmail.id);
        if (!localEmail) {
          return serverEmail;
        }

        return localEmail;
      }));

      await putEmails(mergedEmails);

    } catch (error) {
      console.error("Failed to sync emails:", error);
    }
    span.end();
  });
};

export const pushStarred = async (email: Email) => {
  tracer.startActiveSpan("pushStarred", async (span) => {
    // Sync to server
    try {
      await fetch(`/api/emails/${email.id}/star/${email.starred}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to update star status on server:", error);
      // Handle offline scenario
    }
    span.end();
  });
};
