'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TagMst extends Model {
    static associate(models) {
      
      this.hasMany(models.RestGroupTag, {
        foreignKey: "tag_cd",
        onDelete: "cascade",
      });

    }
  }
  TagMst.init({
    tag_cd: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    tag_nm: {
      type: DataTypes.STRING(30),
    },
  }, {
    charset: "utf8", // 한국어 설정
    tableName: "tag_mst",
    timestamps: false,
    sequelize,
    modelName: 'TagMst',
  });
  
  return TagMst;
};
