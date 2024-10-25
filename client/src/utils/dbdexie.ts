import Dexie, { type EntityTable } from "dexie";
import { Email, STARRED_LABEL_ID } from "../types/Email";
import tracer from "./otel";
const db = new Dexie("email-db") as Dexie & {
  emails: EntityTable<Email, "id">;
};

// Schema declaration:
db.version(1).stores({
  emails: "id,*labelIds",
});

db.on("populate", async () => {
  tracer.startActiveSpan("populate", async (span) => {
    const response = await fetch("/api/emails");
    const emails = await response.json();

    if (emails.length > 0) {
      await db.emails.bulkAdd(emails);
    }
    span.end();
  });
});

export const getEmailById = async (id: string) => {
  tracer.startActiveSpan("getEmailById", async (span) => {
    const email = await db.emails.get(id);
    span.end();
    return email;
  });
};

export const starEmail = (email: Email) => {
  tracer.startActiveSpan("starEmail", async (span) => {
    const newLabelIds = !email.starred
      ? [...email.labelIds, STARRED_LABEL_ID]
      : email.labelIds.filter((labelId) => labelId !== STARRED_LABEL_ID);

    const updatedEmail = {
      ...email,
      labelIds: newLabelIds,
      starred: !email.starred,
    };

    await db.emails.put(updatedEmail);
    span.end();
  });
};

export { db };
