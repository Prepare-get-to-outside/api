"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class GroupList extends Model {
    static associate(models) {}
  }
  GroupList.init(
    {
      grp_cd: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
      },
      grp_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      user_cd: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      is_mylist: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "group_list", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "GroupList",
    }
  );

  return GroupList;
};
