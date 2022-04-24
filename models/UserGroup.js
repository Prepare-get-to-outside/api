'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserMst, {
        foreignKey: "user_cd",
        targetKey: "user_cd",
      })
      this.belongsTo(models.GroupMst, {
        foreignKey: "grp_cd",
        targetKey: "grp_cd",
      })
    }
  }
  UserGroup.init({
    // Model attributes are defined here
    user_cd: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    grp_cd: {
      type: DataTypes.STRING(30),
      allowNull : false
    },
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "user_group", // 테이블 이름 정의
    timestamps: true,
    sequelize,
    modelName: 'UserGroup',
  });
  return UserGroup;
};