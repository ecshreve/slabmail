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
    await db.emails.get(id);
    span.end();
  });
};

export const updateEmail = async (id: string, email: Partial<Email>) => {
  tracer.startActiveSpan("updateEmail", async (span) => {
    await db.emails.update(id, email);
    span.end();
  });
};

export const starEmail = async (email: Email) => {
  tracer.startActiveSpan("starEmail", async (span) => {
    const newLabelIds = email.starred
      ? [...email.labelIds, STARRED_LABEL_ID]
      : email.labelIds.filter((labelId) => labelId !== STARRED_LABEL_ID);
    await db.emails.update(email.id, {
      labelIds: newLabelIds,
      starred: !email.starred,
    });
    span.end();
  });
};

export { db };
