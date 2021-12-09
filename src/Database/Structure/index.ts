import { Sequelize } from "sequelize";
import { Album } from "./Models/Album";

export const modelInitialization = async (sequelize: Sequelize) => {
    Album.initialize(sequelize);

    return sequelize;
}