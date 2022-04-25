'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RestGroupTag extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.TagMst, {
        foreignKey: "tag_cd",
        onDelete: "cascade",
      });
      
      this.belongsTo(models.GroupMst, {
        foreignKey: "grp_cd",
        onDelete: "cascade",
      });
      
      this.belongsTo(models.RestMst, {
        foreignKey: "rest_cd",
        onDelete: "cascade",
      });
    }
  }
  RestGroupTag.init({
    // Model attributes are defined here
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "rest_group_tag", 
    timestamps: false,
    sequelize,
    modelName: 'RestGroupTag',
    indexes: [
      {
        unique: true,
        fields: ['tag_cd', 'grp_cd', 'rest_cd']
      }
    ]
  });

  RestGroupTag.removeAttribute('id')
  return RestGroupTag;
};