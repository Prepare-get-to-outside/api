"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RestGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RestMst, {
        foreignKey: "rest_cd",
        targetKey: "rest_cd",
      });
      this.belongsTo(models.GroupMst, {
        foreignKey: "grp_cd",
        targetKey: "grp_cd",
      });
      this.hasMany(models.RestGroupTag, {
        foreignKey: "rest_cd",
        targetKey: "rest_cd",
      });
      this.hasMany(models.RestGroupTag, {
        foreignKey: "grp_cd",
        targetKey: "grp_cd",
      });
    }
  }
  RestGroup.init(
    {
      // Model attributes are defined here
      rest_cd: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      grp_cd: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "rest_group", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "RestGroup",
    }
  );
  return RestGroup;
};
