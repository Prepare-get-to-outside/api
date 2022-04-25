const db = require("../models")
const ResponseAPI = require("./responseAPI")
const User = db.UserMst;
const Group = db.GroupMst;
const UserGroup = db.UserGroup;

class UserSevice {
    constructor() {
        this.api = new ResponseAPI()
    }

    async createUser(parameter) {
        const { user_id, user_nm } = parameter

        if (!user_id || !user_nm) {
            return this.api.formatResponse({ status: 400 })
        }

        const user = {
            user_id, user_nm
        }

        const group = {
            grp_nm: `${user_id}_group`,
            is_mylist: true
        }

        try {
            const newUser = await User.create(user)
            const newGroup = await Group.create(group)
            const newUserGroup = await UserGroup.create({user_cd: newUser.user_cd, grp_cd: newGroup.grp_cd})

            console.log(newUser, newGroup, newUserGroup)

            return this.api.formatResponse({ status: 200, data: {newUser, newGroup, newUserGroup} })
        } catch (err) {
            return this.api.formatResponse({ status: 500, errorMessage: err.message || 'server error' })
        }
    }
}

module.exports = UserSevice;