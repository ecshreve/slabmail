// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import { Message } from "./__generated__/resolvers-types";

const MessagesDB: Message[] = [
  {
    messageId: "111",
    sender: "john@doe.com",
    subject: "Hello",
    snippet: "Hello, how are you?",
    body: "Hello, how are you?",
    receivedMs: 1725794400000,
    labels: ["UNREAD", "STARRED"],
  },
  {
    messageId: "222",
    sender: "john@doe.com",
    subject: "Hello",
    snippet: "Hello, how are you?",
    body: "Hello, how are you? and this is a longer body",
    receivedMs: 1725794400000,
    labels: ["UNREAD", "NEW"],
  },
];

export class MessagesDataSource {
  getMessages(): Message[] {
    // simulate fetching a list of messages
    return MessagesDB;
  }

  getMessage(messageId: string): Message | undefined {
    return MessagesDB.find((message) => message.messageId === messageId);
  }

  updateMessage(messageId: string, message: Message): Message | undefined {
    const index = MessagesDB.findIndex((message) => message.messageId === messageId);
    if (index !== -1) {
      MessagesDB[index] = message;
    }
    return message;
  }

  starMessage(messageId: string): Message | undefined {
    const message = this.getMessage(messageId);
    if (message && !message.labels.includes("starred")) {
      message.labels.push("starred");
      this.updateMessage(messageId, message);
    }
    return message;
  }

  unstarMessage(messageId: string): Message | undefined {
    const message = this.getMessage(messageId);
    if (message ) {
      message.labels = message.labels.filter((label) => label !== "starred");
      this.updateMessage(messageId, message);
    }
    return message;
  }
}
