'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
      static associate(models) {
        this.hasMany(models.TagList, {
            foreignKey: "tag_cd",
            sourceKey: 'tag_cd',
            onDelete: "cascade",
        });
    }
  }
  Tag.init({
    tag_cd: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    tag_nm: {
        type: DataTypes.STRING(30),
    }
  }, {
    charset: "utf8", // 한국어 설정
    tableName: "tag_info_mst",
    timestamps: false,
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};