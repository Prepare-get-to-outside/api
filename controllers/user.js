const db = require("../models");
const User = db.UserMst;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res, next) => {
  // Validate request
  if (!req.body.user_cd || !req.body.user_id) {
    res.status(400).send({
      message: "parameter is validation error!",
    });
    return;
  }
  // Create a Tutorial
  const user = {
    user_cd: req.body.user_cd,
    user_id: req.body.user_id,
    user_nm: req.body.user_nm,
  };
  // Save Tutorial in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
// Retrieve all user from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
// Find a single user with an id
exports.findOne = (req, res) => {
  const user_cd = req.params.user_cd;
  User.findByPk(user_cd)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};
// Update a user by the id in the request
exports.update = (req, res) => {
  const user_cd = req.params.user_cd;
  User.update(req.body, {
    where: { user_cd: user_cd },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with user_cd=${user_cd}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with user_cd=" + user_cd,
      });
    });
};
// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const user_cd = req.params.user_cd;
  User.destroy({
    where: { user_cd: user_cd },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with user_cd=${user_cd}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with user_cd=" + user_cd,
      });
    });
};
