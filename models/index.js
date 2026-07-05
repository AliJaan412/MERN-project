const sequelize = require("../bin/dbConnection");
const User = require("./definitions/user");
const Address = require("./definitions/address");
const Role = require("./definitions/role");
const Course = require("./definitions/course");
const UserCourse = require("./definitions/userCourse");

// 1-to-1
Address.hasOne(User, {foreignKey:"addressId"});
User.belongsTo(Address, {foreignKey:"addressId"});
// 1-to-many
Role.hasMany(User, {foreignKey:"roleId"});
User.belongsTo(Role, {foreignKey:"roleId"});
// many-to-many: user-course
User.hasMany(UserCourse, {foreignKey:"userId"});
UserCourse.belongsTo(User, {foreignKey:"userId"});
Course.hasMany(UserCourse, {foreignKey:"courseId"});
UserCourse.belongsTo(Course, {foreignKey:"courseId"});

const models = {
    user: User,
    address: Address,
    role: Role,
    course: Course,
    userCourse: UserCourse,
};
const db={};
db.sequelize = sequelize;
sequelize.models = models;

module.exports = {db, models};
