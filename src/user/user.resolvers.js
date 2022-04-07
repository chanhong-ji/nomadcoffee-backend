import client from "../client";

const resolvers = {
  User: {
    followers: ({ id }, { lastId }) =>
      client.user.findUnique({ where: { id } }).followers({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        select: { id: true, username: true, avatarURL: true },
      }),

    following: ({ id }, { lastId }) =>
      client.user.findUnique({ where: { id } }).following({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        select: { id: true, username: true, avatarURL: true },
      }),

    shops: ({ id }) =>
      client.user
        .findUnique({ where: { id } })
        .shops({ select: { id: true, name: true } }),

    totalFollowers: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),

    totalFollowing: ({ id }) =>
      client.user.count({ where: { followers: { some: { id } } } }),

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      const result = await client.user.count({
        where: {
          id: loggedInUser.id,
          following: { some: { id } },
        },
      });
      return result === 0 ? false : true;
    },

    isMe: ({ id }, _, { loggedInUser }) => id === loggedInUser?.id,
  },
};

export default resolvers;
