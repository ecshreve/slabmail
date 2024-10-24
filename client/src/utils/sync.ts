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
      const response = await fetch("/api/emails");
      if (!response.ok) throw new Error("Network response was not ok");
      const serverEmails: Email[] = await response.json();
      await putEmails(serverEmails);
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
      await fetch(`/api/emails/${email.id}/star/${!email.starred}`, {
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
