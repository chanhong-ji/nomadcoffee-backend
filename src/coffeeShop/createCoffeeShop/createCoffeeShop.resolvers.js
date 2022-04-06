import client from "../../client";
import { protectedResolver } from "../../user/user.utils";
import { categoryProcess, photoProcess } from "../coffeeShop.utils";

const resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos: photoPromises, categories },
        { loggedInUser }
      ) => {
        let photoUrls = [];
        if (photoPromises) {
          const photos = await Promise.allSettled(photoPromises);
          photoUrls = await Promise.all(
            photos.map((photo) => {
              return photoProcess(photo.value, loggedInUser.id);
            })
          );
        }

        await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: { connect: { id: loggedInUser.id } },
            ...(categories && {
              categories: { connectOrCreate: categoryProcess(categories) },
            }),
            ...(photoUrls.length !== 0 && {
              photos: { create: photoUrls },
            }),
          },
        });

        return { ok: true };
      }
    ),
  },
};

export default resolvers;
