const db = require("../models")
// const sequelize = require('sequelize');
const MylistInfoMst = db.MylistInfoMst;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


// mylist 맛집 등록
exports.create = (req, res, next) => {
  const params = req.body
  // const t = sequelize.transaction();

  try {
    // Validate request
    if (!params.user_cd || !params.rest_cd) {
      res.status(400).send({
        message: "parameter is validation error!params :" + JSON.stringify(params)
      });
      return;
    }
    // 마이리스트 등록
    sequelize.transaction(function (t) {
      MylistInfoMst.create(params, { transaction: t })
      // .then(function (mylistinfomst) {
      //   console.log('트랜잭션 테스트')
      //   }, {transaction: t})
        .then(data => {
          console.log('트랜잭션 테스트')
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Mylist."
          });
        });

      // 태크 테이블 등록

      // 공유목록 테이블 등록
    })
  }
  catch (error) {
    console.log(error)
  }
};

// mylist 조회
exports.findOne = (req, res) => {
  const params = req.query
  User.findOne({ 
    where: { user_cd: params.user_cd} 
  })
    .then(data => {
        res.send(data);
      })
    .catch(err => {
      res.status(500).send({
        message: "Error mylist search! params :" + JSON.stringify(params)
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const params = req.body
  User.update(params, {
    where: { user_cd: params.user_cd, rest_cd : params.rest_cd}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Mylist was updated successfully."
        });
      } else {
        res.send({
          message: "Cannot update Mylist. Maybe Mylist was not found or parameter is empty! params :" + JSON.stringify(params)
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Mylist!params :" + JSON.stringify(params)
      });
    });
};
// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const user_cd = req.params.user_cd;
  User.destroy({
    where: { user_cd: user_cd }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with user_cd=${user_cd}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with user_cd=" + user_cd
      });
    });
};