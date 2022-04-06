import client from "../../client";

const PAGE_N = 10;

const resolvers = {
  Query: {
    seeCategories: (_, { lastId }) =>
      client.category.findMany({
        take: PAGE_N,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
