"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RestGroupTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TagMst, {
        foreignKey: "tag_cd",
        targetKey: "tag_cd",
      });

      this.belongsTo(models.RestGroup, {
        // foreignKey: "rest_grp_cd",
        // targetKey: "rest_grp_cd",
      });
    }
  }
  RestGroupTag.init(
    {
      // Model attributes are defined here
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "rest_group_tag", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "RestGroupTag",
    }
  );
  return RestGroupTag;
};
