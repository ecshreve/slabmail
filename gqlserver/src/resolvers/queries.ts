import { QueryResolvers } from "__generated__/resolvers-types";

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  message: async (_, { id }, { dataSources }) => {
    return dataSources.messagesAPI.getMessage(id);
  },
  messages: async (_, __, { dataSources }) => {
    return dataSources.messagesAPI.getMessages();
  },
};

export default queries;
