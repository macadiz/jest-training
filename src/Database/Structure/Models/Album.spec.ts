import { Sequelize, DataTypes } from "sequelize";
import { Album } from "./Album";

jest.mock("sequelize", () => ({
  ...jest.requireActual("sequelize"),
  Sequelize: jest.fn().mockImplementation(() => ({})),
}));

describe("Album model", () => {
  it("should initialize Album model properly", async () => {
    const seq = new Sequelize();

    Album.init = jest.fn();
    Album.sync = jest.fn();

    await Album.initialize(seq);

    expect(Album.init).toBeCalledWith(
      {
        albumId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        albumName: {
          type: DataTypes.STRING,
        },
        albumYear: {
          type: DataTypes.INTEGER,
        },
        albumPicture: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize: seq,
        modelName: "Album",
      }
    );
  });
});
