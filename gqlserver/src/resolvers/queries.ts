import { QueryResolvers } from "__generated__/resolvers-types";

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  message: async (_, { id }, { dataSources }) => {
    return dataSources.slabmailAPI.getMessage(id);
  },
  messages: async (_, { after, first }, { dataSources }) => {
    return dataSources.slabmailAPI.getMessages(0, first);
  },
};

export default queries;
