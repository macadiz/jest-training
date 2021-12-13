import { Sequelize } from "sequelize/dist";
import { showAllAlbums } from ".";

jest.mock("sequelize/dist", () => {
  // Return values expected
  return {
    // Empty constructor
    Sequelize: jest.fn().mockImplementation(() => ({
      models: {
        Album: {
          findAll: jest.fn().mockImplementation(() => [{
            getDataValue: jest.fn().mockReturnValue("some_value")
          }])
        }
      }
    }))
  }
});

describe("Albums", () => {
  console.log = jest.fn();
  it("should return albums struct when method is called", async () => {
    const sequelize = new Sequelize();
    const received = await showAllAlbums(sequelize);
   
    //expect(received.Name).toEqual(expected.Name)
    expect(console.log).toBeCalled();
    expect(console.log).toBeCalledWith("-----------------------")
    expect(console.log).toBeCalledWith("Name: some_value")
    //expect(true).toEqual(true);
  })
})