'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RestTag.init({
    // Model attributes are defined here
    rest_cd: {
      type: DataTypes.STRING(100),
      allowNull : false,
      primaryKey: true
    },
    tag_nm: {
      type: DataTypes.STRING(3),
      allowNull : false
    },
    insert_id: {
      type: DataTypes.STRING(30),
      allowNull : false
    },
    insert_dt: {
      type: DataTypes.DATE,
      allowNull : false,
      defaultValue: DataTypes.NOW
    },
    update_id: {
      type: DataTypes.STRING(30),
    },
    update_dt: {
      type: DataTypes.DATE
    }
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "rest_tag", // 테이블 이름 정의
    timestamps: false,
    sequelize,
    modelName: 'RestTag',
  });
  return RestTag;
};