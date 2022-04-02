"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MyListInfo extends Model {
    static associate(models) {}
  }
  MyListInfo.init(
    {
      //   user_cd: {
      //     type: DataTypes.STRING(20),
      //     allowNull: false,
      //     primaryKey: true,
      //   },
      rest_cd: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      visit_yn: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      rmk_dc: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      tag_cd: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      share_list_cd: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      charset: "utf8", // 한국어 설정
      tableName: "mylist_info_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "MyListInfo",
    }
  );

  return MyListInfo;
};
