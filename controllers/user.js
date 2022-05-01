const db = require("../models");
const User = db.UserMst;
const Group = db.GroupMst;
const UserGroup = db.UserGroup;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new user
exports.create = async (req, res, next) => {
  const user_param = {
    user_id: req.body.user_id,
    user_nm: req.body.user_nm,
  };

  // Validate request
  if (!user_param.user_id || !user_param.user_nm) {
    res.status(400).send({
      message: "parameter is validation error!",
    });
    return;
  }

  try {
    await sequelize.transaction(async (t) => {
      // 1.사용자 확인
      const is_user_match = await User.findOne({
        where: { user_id: { [Op.eq]: user_param.user_id } },
        transaction: t, // 이 쿼리를 트랜잭션 처리
      });

      if (is_user_match) {
        res.status(401).send({
          message: "Already Created User.",
        });
        return;
      }

      // 2.사용자 등록
      const create_user = await User.create(user_param, { transaction: t });

      if (!create_user) {
        throw "User creating Error";
      }

      // 3.그룹 테이블 마이리스트 추가
      const grp_param = {
        grp_nm: `마이리스트(${create_user.user_nm})`,
        is_mylist: "T",
        user_cd: create_user.user_cd,
      };
      const create_grp = await Group.create(grp_param, { transaction: t });

      if (!create_grp) {
        throw "Group Creating Error";
      }

      // 4.사용자 그룹 등록
      const user_grp_param = {
        user_cd: create_user.user_cd,
        grp_cd: create_grp.grp_cd,
      };
      const create_user_grp = await UserGroup.create(user_grp_param, {
        transaction: t,
      });

      if (!create_user_grp) {
        throw "UserGroup Creating Error";
      }

      const res_data = create_user_grp;
      res.send(res_data);
    });

    // 트랜잭션 문제없으면 알아서 자동으로 커밋
  } catch (err) {
    // 중간에 failed 나면 알아서 자동으로 트랜잭션 롤백
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
