import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../user.utils";

const resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { password, avatarURL }, { loggedInUser }) => {
        try {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              avatarURL,
              password: password && (await bcrypt.hash(password, 10)),
            },
          });
          return { ok: true };
        } catch (error) {
          return { ok: false, error: "Update is failed" };
        }
      }
    ),
  },
};

export default resolvers;
