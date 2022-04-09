"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ListTagInfo extends Model {
    static associate(models) {}
  }
  ListTagInfo.init(
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
      tag_cd: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "list_tag_info", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "ListTagInfo",
    }
  );

  return ListTagInfo;
};
