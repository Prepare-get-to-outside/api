"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupMst extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserMst, {
        as: "User",
        foreignKey: "user_cd",
        targetKey: "user_cd",
      });
      this.hasMany(models.UserGroup, {
        foreignKey: "grp_cd",
        sourceKey: "grp_cd",
      });
      this.hasMany(models.RestGroup, {
        foreignKey: "grp_cd",
        sourceKey: "grp_cd",
      });
      this.hasMany(models.RestGroupTag, {
        foreignKey: "grp_cd",
        sourceKey: "grp_cd",
      });
    }
  }
  GroupMst.init(
    {
      // Model attributes are defined here
      grp_cd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      grp_nm: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      user_cd: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      is_mylist: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: "F",
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "group_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "GroupMst",
    }
  );
  return GroupMst;
};
