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
  },
};

export default resolvers;
