import { MutationResolvers } from "__generated__/resolvers-types";
// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  starMessage: async (_, { id }, { dataSources }) => {
    return dataSources.messagesAPI.starMessage(id);
  },
  unstarMessage: async (_, { id }, { dataSources }) => {
    return dataSources.messagesAPI.unstarMessage(id);
  },
};

export default mutations;
