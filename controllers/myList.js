const {sequelize} = require("./../models")
const db = require("../models")
const MyList = db.MyList;
const Restaurant = db.Restaurant;

// Create and Save a new user
exports.create = async (req, res, next) => {
  try {
    // Validate request
    if (!req.body.user_cd || !req.body.rest_cd) {
      res.status(400).send({
        message: "parameter is validation error!"
      });
      return;
    }
    const { user_cd, rest_cd } = req.body
    
    // (Managed) Transactions 
    await sequelize.transaction(async (t) => {
 
      //// 이 쿼리를 트랜잭션 처리
      const isRestaurant = await Restaurant.findByPk(rest_cd, { transaction: t });
      
      // Create a Tutorial
      const my_list = {
        user_cd,
        rest_cd: isRestaurant.rest_cd,
      };
      
      // Save Tutorial in the database
      const response = await MyList.create(my_list, {
        transaction: t, // 이 쿼리를 트랜잭션 처리
      })

      if (response)
        res.send(response); 
      else
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the MyList."
        });
    });
    // 트랜잭션 문제없으면 알아서 자동으로 커밋
  } catch (err) {
     // 중간에 failed 나면 알아서 자동으로 트랜잭션 롤백
     res.status(500).send({
      message:
        err.message || "Some error occurred while creating the MyList."
    });
  }
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  MyList.findAll({
    include: [{
      model: db.User,
      attributes: ['user_nm'],  //가져오려는 정보 (join)
    }, {
      model: db.Restaurant,
      attributes: ['rest_nm'],
    }],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Find a single with ids
exports.findOne = (req, res) => {
  const user_cd = req.query.user_cd;
  const rest_cd = req.query.rest_cd;
  MyList.findOne({where: {user_cd, rest_cd}})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with user_cd=${user_cd} /  rest_cd=${rest_cd}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Tutorial with user_cd=${user_cd} /  rest_cd=${rest_cd}`
      });
    });
};

// Find a single with user
exports.findAllByUser = (req, res) => {
  const user_cd = req.params.user_cd;
  MyList.findAll({where: { user_cd }})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with user_cd=${user_cd}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Tutorial with user_cd=${user_cd}`
      });
    });
};

// Delete with the specified id in the request
exports.delete = (req, res) => {
  const user_cd = req.body.user_cd;
  const rest_cd = req.body.rest_cd;
  console.log(req.body)
  MyList.destroy({
    where: { user_cd, rest_cd }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "MyList was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete MyList with user_cd=${user_cd}. Maybe MyList was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete MyList with user_cd=" + user_cd
      });
    });
};