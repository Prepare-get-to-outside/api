const db = require("../models")
const User = db.UserMst;
const Group = db.GroupMst;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new user
exports.create = async (req, res, next) => {
  // Validate request
  if (!req.body.user_cd || !req.body.grp_nm) {
    res.status(400).send({
      message: "parameter is validation error!"
    });
    return;
  }
  try {
    await sequelize.transaction(async (transaction) => {
      // 사용자 확인 
      const user_chk = await User.findByPk(req.body.user_cd)

      if (!user_chk) {
        res.status(401).send({
          message: "User is not exists"
        });
        return;
      } 

      // 그룹 테이블 마이리스트 추가
      const result_group = await Group.create(req.body, { transaction })

      if (!result_group) {
        throw 'Group Create Error'
      }

      res.send(result_group);
    })
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Group."
    });
  }
};
// Retrieve all user from the database.
exports.findAll = async (req, res) => {
  try {
    // Save Tutorial in the database
    const result = await Group.findAll()
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials."
    });
  }
};
// Find a single user with an id
exports.findOne = async (req, res) => {
  const grp_cd = req.params.grp_cd;
  try {
    const result = await Group.findByPk(grp_cd)

    if (!result) {
      res.status(404).send({
        message: `Cannot find Group with grp_cd=${grp_cd}.`
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || `Cannot find Group with grp_cd=${grp_cd}.`
    });
  }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
  const grp_cd = req.params.grp_cd;
  try {
    const result = await Group.update(req.body, {
      where: { grp_cd: grp_cd }
    })

    if (result == 1) {
      res.send({
        message: "Group was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Group with grp_cd=${grp_cd}. Maybe Group was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating Group with grp_cd=" + grp_cd
    });
  };
};
// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
  const grp_cd = req.params.grp_cd;
  try {
    const result = await Group.destroy({
      where: { grp_cd: grp_cd }
    })

    if (result == 1) {
      res.send({
        message: "Group was deleted successfully."
      });
    } else {
      res.send({
        message: `Cannot delete Group with grp_cd=${grp_cd}. Maybe Group was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Could not delete Group with grp_cd=" + grp_cd
    });
  };
};