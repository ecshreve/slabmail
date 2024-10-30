// src/graphql/queries.ts

import { gql } from "@apollo/client";

export const GET_MESSAGES_QUERY = gql`
  query MessagesPaginated($pagination: PaginationInput) {
    messages(pagination: $pagination) {
      id
      gmailId
      subject
      body
      sender
      timestamp
      isStarred
    }
  }
`;
