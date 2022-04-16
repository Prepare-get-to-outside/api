module.exports = (sequelize, DataTypes) => {
  const UserMst = sequelize.define(
    "UserMst",
    {
      // Model attributes are defined here
      // Sequelize에서 PK를 지정해 주지 않으면 자동으로 id라는 컬럼의 PK 값이 생성된다
      user_cd: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      user_nm: {
        type: DataTypes.STRING(30),
      },
    },
    {
      // Other model options go here
      tableName: "user_mst", // 테이블 이름 정의
      // freezeTableName: true, // true면 모델명과 테이블 이름을 동일하게 설정함. Sequelize는 기본적으로 모델 이름은 단수, 테이블 이름은 복수로 설정한다.
      // timestamps: true, // default 값이 true이다. 모델을 정의하고 테이블이 생성되면 자동적으로 createdAt, updatedAt 컬럼이 생성된다.
      // paranoid: false, // true로 설정하면 deletedAt 이라는 컬럼이 생김. 로우를 삭제하게되면 실제 데이터는 삭제되지 않고 deletedAt 컬럼에 지운 시간이 기록되고 deletedAt 컬럼에 시간이 기록되면 Select할때는 집계되지 않는다.
      underscored: true, //시퀄라이즈의 테이블명과 컬럼 명은 기본값이 카멜케이스(createdAt)다. true일 때 스네이크 케이스(created_at)로 변경된다.
      // sequelize,
      // modelName: "UserMst",
      charset: "utf8mb4", // 한국, 이모티콘 설정
      collate: "utf8mb4_general_ci", // 한글, 이모티콘 저장
    }
  );
  UserMst.associate = (db) => {
    db.UserMst.hasMany(db.GroupMst);
    db.UserMst.belongsToMany(db.GroupMst, {
      through: "user_group",
      as: "ug.user_cd",
      foreignKey: "user_cd",
    });
  };
  return UserMst;
};
