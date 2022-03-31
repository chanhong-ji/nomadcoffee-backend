import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) return { ok: false, error: "User not found" };

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return { ok: false, error: "Password wrong" };

      const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
      return { ok: true, token };
    },
  },
};

export default resolvers;
