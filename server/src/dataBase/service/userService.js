const {User} = require('../models/user')

async function isExist(loginId) {
    const user = await User.findOne({
        where: {
            loginId,
        },
    });
    return user || false;
}

exports.addUser = async function (user) {
    //添加管理员，这里只针对数据库的操作，验证合法性的操作不应该在这里，而是在接口
    const newUser = await User.create(user);
    console.log("add new user ", user.name);
    return newUser;
};

exports.deleteUser = async function (loginId) {
    if (!(await isExist(loginId))) return false;
    await User.destroy({
        where: {
            loginId,
        },
    });
    return true;
};

exports.editUser = async function (loginId, userObj) {
    if (!(await isExist(loginId))) return false;
    await User.update(userObj, {
        where: {
            loginId,
        },
    });
    return true;
};

exports.findUser = async function (loginId) {
    return await isExist(loginId);
};
