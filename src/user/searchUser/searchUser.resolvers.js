import client from "../../client";

const resolvers = {
  Query: {
    searchUsers: (_, { keyword, lastId }) =>
      client.user.findMany({
        where: { username: { startsWith: keyword } },
        select: { id: true, username: true, avatarURL: true },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
