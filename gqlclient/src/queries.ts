import { gql } from './__generated__/gql';

export const GET_MESSAGES_CONNECTION = gql(/* GraphQL */ `
  query GetMessages($after: String, $first: Int) {
    messages(after: $after, first: $first) {
      nodes {
        id
        subject
        labels
        receivedAt
        sender
        snippet
      }
      nextPageCursor
      totalCount
    }
  }
`);

export const GET_MESSAGE_DETAIL = gql(/* GraphQL */ `
  query GetMessageDetail($messageId: String!) {
    message(id: $messageId) {
      id
      subject
      labels
      receivedAt
      sender
      body
      snippet
    }
  }
`);

export const GET_MESSAGE_SUMMARY = gql(/* GraphQL */ `
  query GetMessageSummary($messageId: String!) {
    message(id: $messageId) {
      id
      subject
      sender
      receivedAt
      labels
    }
  }
`);