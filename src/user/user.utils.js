import client from "../client";
import jwt from "jsonwebtoken";

export const getUser = async (token) => {
  const { id } = await jwt.verify(token, process.env.PRIVATE_KEY);
  return client.user.findUnique({ where: { id } });
};

export const protectedResolver = (resolver) => (root, args, context, info) => {
  if (context.loggedInUser) {
    return resolver(root, args, context, info);
  } else {
    return { ok: false, error: "Not authorized" };
  }
};
