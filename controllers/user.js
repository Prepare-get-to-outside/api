const db = require("../models");
const User = db.UserMst;
const Group = db.GroupMst;
const UserGroup = db.UserGroup;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new user
exports.create = async (req, res, next) => {
  // Validate request
  if (!req.body.user_cd || !req.body.user_id) {
    res.status(400).send({
      message: "parameter is validation error!",
    });
    return;
  }
  try {
    await sequelize.transaction(async (transaction) => {
      // 1.사용자 확인
      const res_user_chk = await User.findByPk(req.body.user_cd);

      if (res_user_chk) {
        res.status(401).send({
          message: "Already Created User.",
        });
        return;
      }

      // 2.사용자 등록
      const res_user = await User.create(req.body, { transaction });

      if (!res_user) {
        throw "User creating Error";
      }

      // 3.그룹 테이블 마이리스트 추가
      const group = {
        grp_nm: "마이리스트(" + req.body.user_nm + ")",
        user_cd: req.body.user_cd,
        is_mylist: "T",
      };
      const res_group = await Group.create(group, { transaction });

      if (!res_group) {
        throw "Group Creating Error";
      }

      const user_group = {
        grp_cd: res_group.grp_cd,
        user_cd: req.body.user_cd,
      };
      // 4.사용자 그룹 등록
      const res_user_group = await UserGroup.create(user_group, {
        transaction,
      });

      if (!res_user_group) {
        throw "UserGroup Creating Error";
      }

      res.send(res_user);
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};
// Retrieve all user from the database.
exports.findAll = async (req, res) => {
  try {
    // Save Tutorial in the database
    const result = await User.findAll();
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
// Find a single user with an id
exports.findOne = async (req, res) => {
  const user_cd = req.params.user_cd;
  try {
    const result = await User.findByPk(user_cd);

    if (!result) {
      res.status(404).send({
        message: `Cannot find User with user_cd=${user_cd}.`,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Cannot find User with user_cd=${user_cd}.`,
    });
  }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
  const user_cd = req.params.user_cd;
  try {
    const result = await User.update(req.body, {
      where: { user_cd: user_cd },
    });

    if (result == 1) {
      res.send({
        message: "User was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update User with user_cd=${user_cd}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating User with user_cd=" + user_cd,
    });
  }
};
// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
  const user_cd = req.params.user_cd;
  try {
    const result = await User.destroy({
      where: { user_cd: user_cd },
    });

    if (result == 1) {
      res.send({
        message: "User was deleted successfully.",
      });
    } else {
      res.send({
        message: `Cannot delete User with user_cd=${user_cd}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Could not delete User with user_cd=" + user_cd,
    });
  }
};
