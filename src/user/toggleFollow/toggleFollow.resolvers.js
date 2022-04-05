import client from "../../client";
import { protectedResolver } from "../user.utils";

const resolvers = {
  Mutation: {
    toggleFollow: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const exists = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!exists) return { ok: false, error: "User not found" };

        const user = await client.user.findFirst({
          where: {
            id: loggedInUser.id,
            following: {
              some: { username },
            },
          },
          select: { id: true },
        });

        if (user) {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: { disconnect: { username } },
            },
          });
        } else {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: { connect: { username } },
            },
          });
        }

        return { ok: true };
      }
    ),
  },
};

export default resolvers;
