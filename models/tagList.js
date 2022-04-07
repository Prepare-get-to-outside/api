'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TagList extends Model {
    static associate(models) {
      this.belongsTo(models.Tag, {
        foreignKey: "tag_cd",
        onDelete: "cascade",
      });
      this.belongsTo(models.Group, {
        foreignKey: "grp_cd",
        onDelete: "cascade",
      });
      this.belongsTo(models.Restaurant, {
        foreignKey: "rest_cd",
        onDelete: "cascade",
      });
    }
  }
  TagList.init({
  }, {
    charset: "utf8", // 한국어 설정
    tableName: "tag_list_info",
    timestamps: false,
    sequelize,
    modelName: 'TagList',
  });
    
  TagList.removeAttribute('id')
  
  return TagList;
};
