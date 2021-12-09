import { Album } from "@src/Database/Structure/Models/Album";
import { Sequelize, Model } from "sequelize";

export const showAddAlbum = (sequelize: Sequelize | null, readline: any) => {
  let albumName: string = "";
  let albumYear: number = new Date().getFullYear();
  let albumPicture: string | null = null;

  const promise = new Promise<void>((resolve) => {
    readline.question("Input album name: ", (input: string) => {
      albumName = input;

      readline.question("Input album year: ", (input: string) => {
        albumYear = parseInt(input, 10);

        readline.question("Input album picture: ", async (input: string) => {
          albumPicture = input === "" ? null : input;

          await sequelize?.models.Album.create({
            albumName,
            albumYear,
            albumPicture,
          });

          resolve();
        });
      });
    });
  });

  return promise;
};

export const showAllAlbums = async (sequelize: Sequelize | null) => {
  try {
    const allAlbums = await sequelize?.models.Album.findAll();

    console.log("-----------------------");

    allAlbums?.forEach((album: Model<Album>) => {
      console.log(`Name: ${album.getDataValue("albumName")}`);
      console.log(`Year: ${album.getDataValue("albumYear")}`);
      console.log("-----------------------");
    });
  } catch (e) {
    console.error(e);
  }

  return new Promise<void>((resolve) => resolve());
};
