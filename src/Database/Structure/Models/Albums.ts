import { DataTypes, Model, Sequelize } from "sequelize";

export class Album extends Model {
  public albumId!: number;
  public albumName!: string;
  public albumYear!: number;
  public albumPicture!: string;
}

export const init = async (sequelize: Sequelize) => {
  Album.init(
    {
      // Model attributes are defined here
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
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "Album", // We need to choose the model name
    }
  );
  await Album.sync();
};
