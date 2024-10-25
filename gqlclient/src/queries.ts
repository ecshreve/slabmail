import { gql } from './__generated__/gql';

export const GET_MESSAGES_CONNECTION = gql(/* GraphQL */ `
  query GetMessages($cursor: String, $first: Int) {
    messages(cursor: $cursor, first: $first) {
      nodes {
        id
        subject
        labels
        receivedAt
        sender
        body
        snippet
      }
      cursor
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