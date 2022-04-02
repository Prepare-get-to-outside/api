'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestInfoMst extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RestInfoMst.init({
    // Model attributes are defined here
    rest_cd: {
      type: DataTypes.STRING(100),
      // autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    rest_nm: {
      type: DataTypes.STRING(30),
      allowNull : false
      // allowNull defaults to true
    },
    rest_lat: {
      type: DataTypes.STRING(30),
      // allowNull : false
      // allowNull defaults to true
    },
    rest_lon: {
      type: DataTypes.STRING(30),
      // allowNull : false
      // allowNull defaults to true
    },
    insert_dt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull : false
    },
    update_dt: {
      type: DataTypes.DATE
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "rest_info_mst", // 테이블 이름 정의
    timestamps: false,
    sequelize,
    modelName: 'RestInfoMst',
  });
  return RestInfoMst;
};