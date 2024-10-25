import { gql } from "@apollo/client";

export const GET_MESSAGE_LIST = gql`
  query GetMessageList {
    messages {
      messageId
      subject
      labels
      receivedMs
      sender
      body
      snippet
    }
  }
`;
