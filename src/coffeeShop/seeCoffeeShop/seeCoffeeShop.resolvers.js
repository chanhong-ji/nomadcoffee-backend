import client from "../../client";

const resolvers = {
  Query: {
    seeCoffeeShop: async (_, { id }) =>
      client.coffeeShop.findUnique({ where: { id } }),
  },
};

export default resolvers;
