const db = require("../models")
const Restaurant = db.Restaurant;
// const Op = db.Sequelize.Op;


exports.insertData = async (params) => {
  const {rest_cd, rest_nm, rest_lat, rest_lon, price, memo} = params

  if ([rest_cd, rest_nm, rest_lat, rest_lon, price].includes(undefined)) {
    
    return {isError: true, status: 400, errorMsg:  "parameter is validation error!"};
  }

  const restaurant = {
    rest_cd,
    rest_nm,
    rest_lat,
    rest_lon,
    price,
    memo: memo ?? ''
  };


  try {
    const result = await Restaurant.create(restaurant)

    return{isError: false, status: 200, data: result};
  } catch (err) {
    return {isError: true, status: 500, errorMsg: err.message || "Some error occurred while creating the Restaurant."};
  }
}


// Create and Save a new user
exports.create = async ({ body }, res, next) => {
  const insertResult = await this.insertData(body)
  
  if (insertResult.status === 200) {
    await res.send(insertResult.data); 
  } else {
    await res.status(insertResult.status).send({
      message: insertResult.errorMsg ?? ''
    });
  }

};
// Retrieve all from the database.
exports.findAll = (req, res) => {
  Restaurant.findAll()
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
// Find a single with an id
exports.findOne = (req, res) => {
  const rest_cd = req.params.rest_cd;
  Restaurant.findByPk(rest_cd)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find data by ${rest_cd}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving with rest_cd=" + rest_cd
      });
    });
};
// Update by the id in the request
exports.update = (req, res) => {
  const rest_cd = req.params.rest_cd;
  Restaurant.update(req.body, {
    where: { rest_cd: rest_cd }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Restaurant was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Restaurant with rest_cd=${rest_cd}. Maybe Restaurant was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Restaurant with rest_cd=" + rest_cd
      });
    });
};
// Delete with the specified id in the request
exports.delete = (req, res) => {
  const rest_cd = req.params.rest_cd;
  Restaurant.destroy({
    where: { rest_cd: rest_cd }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Restaurant was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Restaurant with rest_cd=${rest_cd}. Maybe Restaurant was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Restaurant with rest_cd=" + rest_cd
      });
    });
};