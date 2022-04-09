"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class GroupListInfo extends Model {
    static associate(models) {}
  }
  GroupListInfo.init(
    {
      rest_cd: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
      },
      group_cd: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "group_list_info", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "GroupListInfo",
    }
  );

  return GroupListInfo;
};
