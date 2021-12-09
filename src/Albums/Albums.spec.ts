import { Sequelize } from "sequelize";
import { showAddAlbum, showAllAlbums } from ".";

jest.mock("sequelize", () => ({
  ...jest.requireActual("sequelize"),
  Sequelize: jest.fn().mockImplementation(() => ({
    models: {
      Album: {
        create: jest.fn(),
        findAll: jest.fn(() => [
          {
            getDataValue: jest.fn((key: string) => {
              switch (key) {
                case "albumId":
                  return 1;
                case "albumName":
                  return "My super test album";
                case "albumYear":
                  return 2022;
                default:
                  return null;
              }
            }),
          },
        ]),
      },
    },
  })),
}));

jest.mock("readline", () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn().mockImplementation((questionTest, callback) => {
      let inputArgument = "";
      switch (questionTest) {
        case "Input album name: ":
          inputArgument = "My test album";
          break;
        case "Input album year: ":
          inputArgument = "2022";
          break;
        case "Input album picture: ":
          inputArgument = "AlbumPicture";
          break;
        default:
          break;
      }
      callback(inputArgument);
    }),
  })),
}));

describe("Albums methods", () => {
  const log = console.log;
  const err = console.error;
  const testSequelize = new Sequelize();

  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterAll(() => {
    console.log = log;
    console.error = err;
  });

  it("should show all albums properly", async () => {
    await showAllAlbums(testSequelize);

    expect(console.log).toBeCalledWith("-----------------------");
    expect(console.log).toBeCalledWith("Name: My super test album");
    expect(console.log).toBeCalledWith("Year: 2022");
    expect(console.log).toBeCalledWith("-----------------------");
  });

  it("should show create album menu, then create album", async () => {
    const testReadline = require("readline").createInterface();

    await showAddAlbum(testSequelize, testReadline);

    expect(testReadline.question).toBeCalledTimes(3);
    expect(testReadline.question).toBeCalledWith(
      "Input album name: ",
      expect.any(Function)
    );
    expect(testReadline.question).toBeCalledWith(
      "Input album year: ",
      expect.any(Function)
    );
    expect(testReadline.question).toBeCalledWith(
      "Input album picture: ",
      expect.any(Function)
    );

    expect(testSequelize.models.Album.create).toBeCalledWith({
      albumName: "My test album",
      albumYear: 2022,
      albumPicture: "AlbumPicture",
    });
  });

  it("should show throw an error getting all albums", async () => {
    const exceptionToThrow = new Error("Something happened");

    jest
      .spyOn(testSequelize.models.Album, "findAll")
      .mockImplementationOnce(() => {
        throw exceptionToThrow;
      });

    await showAllAlbums(testSequelize);

    expect(console.error).toBeCalledWith(exceptionToThrow);
  });

  it("should create album without albumPicture", async () => {
    const testReadline = require("readline").createInterface();

    jest
      .spyOn(testReadline, "question")
      .mockImplementation((questionTest, callback: any) => {
        let inputArgument = "";
        switch (questionTest) {
          case "Input album name: ":
            inputArgument = "My test album";
            break;
          case "Input album year: ":
            inputArgument = "2022";
            break;
          case "Input album picture: ":
            inputArgument = "";
            break;
          default:
            break;
        }
        callback(inputArgument);
      }),

    await showAddAlbum(testSequelize, testReadline);

    expect(testSequelize.models.Album.create).toBeCalledWith({
      albumName: "My test album",
      albumYear: 2022,
      albumPicture: null,
    });
  });
});
