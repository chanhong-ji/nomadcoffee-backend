import { GraphQLUpload } from "graphql-upload";
import client from "../client";

const resolvers = {
  CoffeeShop: {
    user: ({ id }) =>
      client.user.findFirst({
        where: { CoffeeShop: { some: { id } } },
        select: {
          id: true,
          username: true,
          email: true,
          avatarURL: true,
        },
      }),
    photos: ({ id }) =>
      client.coffeeShop.findUnique({ where: { id } }).photos(),
    categories: ({ id }) =>
      client.coffeeShop
        .findUnique({ where: { id } })
        .categories({ select: { id: true, name: true } }),
  },
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({ where: { categories: { some: { id } } } }),
  },
  Upload: GraphQLUpload,
};
export default resolvers;
