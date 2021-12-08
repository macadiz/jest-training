import { Model, Sequelize } from "sequelize/dist";
import { showAddAlbum, showAllAlbums } from "./Albums";
import { Database } from "./Database";

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const database = Database.initialize();

const showMenu = (sequelize: Sequelize | null) => {
  console.log("=============================");
  console.log("===========  MENU  ==========");
  console.log("=============================");
  console.log("  1.- Add a new album");
  console.log("  2.- Get all albums");
  readline.question(`Input option number: `, (input: string) =>
    selectOption(sequelize, parseInt(input, 10))
  );
};

const selectOption = function (
  sequelize: Sequelize | null,
  optionNumber: number
) {
  switch (optionNumber) {
    case 1:
      return showAddAlbum(sequelize, readline).then(() => {
        showMenu(sequelize);
      });
    case 2:
      return showAllAlbums(sequelize).then(() => {
        showMenu(sequelize);
      });
    default:
      showMenu(sequelize);
  }
};

database.connectToDatabase().then((sequelize: Sequelize | null) => {
  showMenu(sequelize);
});
