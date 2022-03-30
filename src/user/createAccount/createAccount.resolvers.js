import client from "../../client";
import bcrypt from "bcrypt";

const resolvers = {
  Mutation: {
    createAccount: async (_, { username, email, name, password }) => {
      try {
        //Check that the username / email aren't taken
        const exist = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
          select: { id: true },
        });
        if (exist)
          return { ok: false, error: "Username or Email is Already taken" };

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create a user
        await client.user.create({
          data: { username, email, name, password: hashedPassword },
        });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
