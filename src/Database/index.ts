import { Sequelize } from "sequelize";
import { modelInitialization } from "./Structure";

export class Database {
  static instance: Database;
  sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "database.sqlite",
      logging: false
    });
  }

  static initialize() {
      if (!this.instance) {
          this.instance = new Database();
      }
      return this.instance;
  }

  async connectToDatabase(): Promise<Sequelize | null> {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");

      await modelInitialization(this.sequelize);

      return this.sequelize;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    return null;
  }
}
