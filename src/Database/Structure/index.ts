import { Sequelize } from "sequelize";
import { init as AlbumInit } from "./Models/Albums";

export const modelInitialization = async (sequelize: Sequelize) => {
    AlbumInit(sequelize);

    return sequelize;
}