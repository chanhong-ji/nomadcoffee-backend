import client from "../../client";

const PAGE_N = 5;

const resolvers = {
  Query: {
    seeCategory: async (_, { category, page }) => {
      const shops = await client.coffeeShop.findMany({
        where: {
          categories: { some: { name: category } },
        },
        take: PAGE_N,
        skip: (page - 1) * PAGE_N,
      });

      const totals = await client.coffeeShop.count({
        where: { categories: { some: { name: category } } },
      });

      return { shops, totalPages: Math.ceil(totals / PAGE_N) };
    },
  },
};

export default resolvers;
