import client from "../../client";

const RESULT_N = 10;

const resolvers = {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      try {
        const shops = await client.coffeeShop.findMany({
          take: RESULT_N,
          skip: (page - 1) * RESULT_N,
        });

        const totalPages = Math.ceil(
          (await client.coffeeShop.count()) / RESULT_N
        );

        return { ok: true, shops, totalPages };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
