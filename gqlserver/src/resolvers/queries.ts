import { QueryResolvers } from "__generated__/resolvers-types";

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  message: async (_, { id }, { dataSources }) => {
    return dataSources.slabmailAPI.getMessage(id);
  },
  messages: async (_, { cursor, first }, { dataSources }) => {
    return dataSources.slabmailAPI.getMessages(cursor, first);
  },
};

export default queries;
