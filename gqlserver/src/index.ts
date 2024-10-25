import "./otel.js";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { MessagesDataSource } from "./datasources.js";
import resolvers from "./resolvers/index.js";
import { SlabmailAPI } from "./slabmail-api.js";

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export interface MyContext {
  dataSources: {
    messagesAPI: MessagesDataSource;
    slabmailAPI: SlabmailAPI;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      // We are using a static data set for this example, but normally
      // this would be where you'd add your data source connections
      // or your REST API classes.
      dataSources: {
        messagesAPI: new MessagesDataSource(),
        slabmailAPI: new SlabmailAPI(),
      },
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);
