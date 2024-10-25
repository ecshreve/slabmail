/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetMessages($after: String, $first: Int) {\n    messages(after: $after, first: $first) {\n      nodes {\n        id\n        subject\n        labels\n        receivedAt\n        sender\n        snippet\n      }\n      nextPageCursor\n      totalCount\n    }\n  }\n": types.GetMessagesDocument,
    "\n  query GetMessageDetail($messageId: String!) {\n    message(id: $messageId) {\n      id\n      subject\n      labels\n      receivedAt\n      sender\n      body\n      snippet\n    }\n  }\n": types.GetMessageDetailDocument,
    "\n  query GetMessageSummary($messageId: String!) {\n    message(id: $messageId) {\n      id\n      subject\n      sender\n      receivedAt\n      labels\n    }\n  }\n": types.GetMessageSummaryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMessages($after: String, $first: Int) {\n    messages(after: $after, first: $first) {\n      nodes {\n        id\n        subject\n        labels\n        receivedAt\n        sender\n        snippet\n      }\n      nextPageCursor\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetMessages($after: String, $first: Int) {\n    messages(after: $after, first: $first) {\n      nodes {\n        id\n        subject\n        labels\n        receivedAt\n        sender\n        snippet\n      }\n      nextPageCursor\n      totalCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMessageDetail($messageId: String!) {\n    message(id: $messageId) {\n      id\n      subject\n      labels\n      receivedAt\n      sender\n      body\n      snippet\n    }\n  }\n"): (typeof documents)["\n  query GetMessageDetail($messageId: String!) {\n    message(id: $messageId) {\n      id\n      subject\n      labels\n      receivedAt\n      sender\n      body\n      snippet\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMessageSummary($messageId: String!) {\n    message(id: $messageId) {\n      id\n      subject\n      sender\n      receivedAt\n      labels\n    }\n  }\n"): (typeof documents)["\n  query GetMessageSummary($messageId: String!) {\n    message(id: $messageId) {\n      id\n      subject\n      sender\n      receivedAt\n      labels\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;