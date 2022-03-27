const db = require("../models")
const Restaurant = db.Restaurant;
// const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = ({body}, res, next) => {
    // Validate request
  if ([body.rest_cd, body.rest_nm, body.rest_lat, body.rest_lon, body.price].includes(undefined)) {
    res.status(400).send({
      message: "parameter is validation error!"
    });
    return;
  }
  // Create a Tutorial
  const restaurant = {
    rest_cd: body.rest_cd,
    rest_nm: body.rest_nm,
    rest_lat: body.rest_lat,
    rest_lon: body.rest_lon,
    price: Number(body.price),
    memo: body.memo ?? ''
  };
  // Save Tutorial in the database
  Restaurant.create(restaurant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restaurant."
      });
    });
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