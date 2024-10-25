import { MutationResolvers } from "__generated__/resolvers-types";
// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  starMessage: async (_, { messageId }, { dataSources }) => {
    return dataSources.slabmailAPI.starMessage(messageId);
  },
  unstarMessage: async (_, { messageId }, { dataSources }) => {
    return dataSources.slabmailAPI.unstarMessage(messageId);
  },
};

export default mutations;
