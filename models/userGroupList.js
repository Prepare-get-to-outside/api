"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserGroupList extends Model {
    static associate(models) {}
  }
  UserGroupList.init(
    {
      group_cd: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
      },
      user_cd: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "user_group_list", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "UserGroupList",
    }
  );

  return UserGroupList;
};
