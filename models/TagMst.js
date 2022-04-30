"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TagMst extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.RestGroup, {
        through: models.RestGroupTag,
        as: "rgt.tag_cd",
        foreignKey: "tag_cd",
      });
      this.hasMany(models.RestGroupTag, {
        foreignKey: "tag_cd",
        sourceKey: "tag_cd",
      });
    }
  }
  TagMst.init(
    {
      // Model attributes are defined here
      tag_cd: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      tag_nm: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "tag_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "TagMst",
    }
  );
  return TagMst;
};
