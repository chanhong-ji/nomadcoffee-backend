import client from "../../client";
import { protectedResolver } from "../../user/user.utils";
import { categoryProcess } from "../coffeeShop.utils";

const resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        const prevCoffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          select: { categories: { select: { id: true } }, userId: true },
        });
        if (!prevCoffeeShop)
          return { ok: false, error: "Coffee Shop not found" };
        if (prevCoffeeShop.userId !== loggedInUser.id)
          return { ok: false, error: "Not authorized" };

        await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            latitude,
            longitude,
            ...(categories && {
              categories: {
                disconnect: prevCoffeeShop.categories,
                connectOrCreate: categoryProcess(categories),
              },
            }),
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
