'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestMst extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.CodeMst, {
        foreignKey: "adress_code",
        targetKey: 'code',
      })

      this.hasMany(models.RestGroup, {
        foreignKey: "rest_cd",
        sourceKey: 'rest_cd',
      })

      this.hasMany(models.RestGroupTag, {
        foreignKey: "rest_cd",
        sourceKey: 'rest_cd',
      })
    }
  }
  RestMst.init({
    // Model attributes are defined here
    rest_cd: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    rest_nm: {
      type: DataTypes.STRING(30),
      allowNull : false
    },
    adress_code: {
      type: DataTypes.INTEGER,
    },
    rest_lat: {
      type: DataTypes.STRING(30),
    },
    rest_lon: {
      type: DataTypes.STRING(30),
    },
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "rest_mst", // 테이블 이름 정의
    timestamps: true,
    sequelize,
    modelName: 'RestMst',
  });
  return RestMst;
};