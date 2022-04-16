const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.UserMst = require("./user_mst")(sequelize, Sequelize);
db.GroupMst = require("./group_mst")(sequelize, Sequelize);
db.CodeMst = require("./code_mst")(sequelize, Sequelize);
db.RestMst = require("./rest_mst")(sequelize, Sequelize);
db.TagMst = require("./tag_mst")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
