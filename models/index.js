"use strict";

const fs = require("fs"); // fs(file system)
const path = require("path"); // 파일과 Directory 경로 작업을 위한 Utility 제공
const Sequelize = require("sequelize"); //
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log("path : ", path.join(__dirname, "myListInfo"));
db.myListInfo = require("./myListInfo.js")(sequelize, Sequelize);
db.restaurant = require("./restaurant.js")(sequelize, Sequelize);

//restaurant : myListInfo = 1:1
db.restaurant.hasOne(db.myListInfo, {
  hooks: true,
  foreignKey: "rest_cd",
  as: "myListInfo",
});

module.exports = db;
