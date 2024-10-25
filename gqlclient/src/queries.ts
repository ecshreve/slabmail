import { gql } from './__generated__/gql';

export const GET_MESSAGE_LIST = gql(/* GraphQL */ `
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
`);

export const GET_MESSAGE_DETAIL = gql(/* GraphQL */ `
  query GetMessageDetail($messageId: ID!) {
    message(messageId: $messageId) {
      messageId
      subject
      labels
      receivedMs
      sender
      body
      snippet
    }
  }
`);

export const GET_MESSAGE_SUMMARY = gql(/* GraphQL */ `
  query GetMessageSummary($messageId: ID!) {
    message(messageId: $messageId) {
      messageId
      subject
      sender
      receivedMs
      labels
    }
  }
`);