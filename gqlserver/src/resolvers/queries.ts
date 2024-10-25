import { QueryResolvers } from "__generated__/resolvers-types";

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  message: async (_, { messageId }, { dataSources }) => {
    // return dataSources.messagesAPI.getMessage(id);
    return dataSources.slabmailAPI.getMessage(messageId);
  },
  messages: async (_, __, { dataSources }) => {
    // return dataSources.messagesAPI.getMessages();
    return dataSources.slabmailAPI.getMessages();
  },
};

export default queries;
