const db = require("../models")
// const MylistInfoMst = db.MylistInfoMst;
const sequelize = db.sequelize;
const UserInfoMst = db.UserMst
const RestInfoMst = db.RestMst
const GroupInfoMst = db.GroupMst

// mylist 맛집 등록
exports.create = async (req, res, next) => {
  const params = req.body

  // Validate request
  if (!params.user_cd || !params.rest_cd) {
    res.status(400).send({
      message: "parameter is validation error!params :" + JSON.stringify(params)
    });
    return;
  }

  try {
    // managed transaction으로 트랜잭션 처리
    await sequelize.transaction(async (transaction) => {
      // 1.사용자정보 조회후 그룹등록(기본적으로 사원생성시 그룹정보에 mylist 생성)
      const user_info = await UserInfoMst.findByPk()
      // 1.그룹정보 등록

      // 1.맛집 등록(기본 마이리스트 등록)
      const result = await GroupInfoMst.create(params, { transaction })

      // 2.공유목록 등록

      // 3.태그 등록

      res.send(result)
    })
  }
  catch (error) {
    res.status(500).send({
      message: "Some error occurred while creating the MyList." + error.message
    });
  }
};

// mylist 조회
exports.findOne = async (req, res) => {
  const params = req.query
  try {
    const result = await MylistInfoMst.findOne({
      include:[{
        model : UserInfoMst,
        attributes :['user_nm'],
        required: true,
      },{
        model: RestInfoMst,
        attributes :['rest_nm'],
        required: true
      }
      ],
      where: { user_cd: params.user_cd }
    })

    res.send(result)
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while search the MyList." + error.message
    });
  }
};

// mylist 수정
exports.update = async (req, res) => {
  const params = req.body

  try {
    await sequelize.transaction(async (transaction) => {
      const result = await MylistInfoMst.update(params, {
        where: { user_cd: params.user_cd, rest_cd: params.rest_cd }
      }, {transaction})

      if (result == 1) {
        res.send({
          message: "Mylist was updated successfully."
        });
      } else {
        res.send({
          message: "Cannot update Mylist. Maybe Mylist was not found or parameter is empty! params :" + JSON.stringify(params)
        });
      }
    })
  } catch (error) {
    res.status(500).send({
      message: "Error updating Mylist!params :" + JSON.stringify(params)
    });
  }
};

// mylist 삭제
exports.delete = async (req, res) => {
  const params = req.body

  try {
    await sequelize.transaction(async (transaction) => {
      const result = await MylistInfoMst.destroy({
        where: { user_cd: params.user_cd, rest_cd: params.rest_cd }
      })

      if (result == 1) {
        res.send({
          message: "Mylist was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Mylist. Maybe Mylist was not found! params :` + JSON.stringify(params) 
        });
      }
    })
  } catch (error) {
    res.status(500).send({
      message: "Could not delete Mylist! params :" + JSON.stringify(params)
    });
  }
};