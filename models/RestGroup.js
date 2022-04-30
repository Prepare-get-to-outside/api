"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RestGroup extends Model {
    static associate(models) {
      this.hasMany(models.GroupMst, {
        foreingKey: "grp_cd",
        sourceKey: "grp_cd",
      });
    }
  }
  RestGroup.init(
    {
      grp_cd: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
      },
      rest_cd: {
        type: DataTypes.STRING(30),
        allowNull: false,
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
