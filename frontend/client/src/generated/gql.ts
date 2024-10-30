import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum Label {
  Draft = 'DRAFT',
  Important = 'IMPORTANT',
  Inbox = 'INBOX',
  Outbox = 'OUTBOX',
  Scheduled = 'SCHEDULED',
  Sent = 'SENT',
  Spam = 'SPAM',
  Starred = 'STARRED',
  Trash = 'TRASH',
  Unread = 'UNREAD'
}

export type Message = {
  __typename?: 'Message';
  body: Scalars['String']['output'];
  gmailId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isStarred: Scalars['Boolean']['output'];
  sender: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  threadId: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type MessageFilterInput = {
  isStarred?: InputMaybe<Scalars['Boolean']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  toggleStarred: Message;
};


export type MutationToggleStarredArgs = {
  messageId: Scalars['ID']['input'];
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Message>;
};


export type QueryMessagesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};

export type MessagesPaginatedQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type MessagesPaginatedQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, gmailId: string, subject: string, body: string, sender: string, timestamp: string, isStarred: boolean }> };


export const MessagesPaginatedDocument = gql`
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

/**
 * __useMessagesPaginatedQuery__
 *
 * To run a query within a React component, call `useMessagesPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesPaginatedQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMessagesPaginatedQuery(baseOptions?: Apollo.QueryHookOptions<MessagesPaginatedQuery, MessagesPaginatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesPaginatedQuery, MessagesPaginatedQueryVariables>(MessagesPaginatedDocument, options);
      }
export function useMessagesPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesPaginatedQuery, MessagesPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesPaginatedQuery, MessagesPaginatedQueryVariables>(MessagesPaginatedDocument, options);
        }
export function useMessagesPaginatedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MessagesPaginatedQuery, MessagesPaginatedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MessagesPaginatedQuery, MessagesPaginatedQueryVariables>(MessagesPaginatedDocument, options);
        }
export type MessagesPaginatedQueryHookResult = ReturnType<typeof useMessagesPaginatedQuery>;
export type MessagesPaginatedLazyQueryHookResult = ReturnType<typeof useMessagesPaginatedLazyQuery>;
export type MessagesPaginatedSuspenseQueryHookResult = ReturnType<typeof useMessagesPaginatedSuspenseQuery>;
export type MessagesPaginatedQueryResult = Apollo.QueryResult<MessagesPaginatedQuery, MessagesPaginatedQueryVariables>;