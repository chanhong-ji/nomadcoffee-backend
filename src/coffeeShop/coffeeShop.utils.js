import { createWriteStream } from "fs";

export const categoryProcess = (categories) =>
  categories.map((category) => ({
    where: { name: category.toLowerCase() },
    create: {
      name: category.toLowerCase(),
      slug: category.match(/[\S]+/g).join("-").toLowerCase(),
    },
  }));

export const photoProcess = async (photo, userId) => {
  const { filename, createReadStream } = await photo;
  const readStream = createReadStream();
  const newFilename = `${userId}-${Date.now()}-${filename}`;
  const writeStream = createWriteStream(
    process.cwd() + "/uploads/" + newFilename
  );
  readStream.pipe(writeStream);
  return {
    url: `http://localhost:5000/static/${newFilename}`,
  };
};
