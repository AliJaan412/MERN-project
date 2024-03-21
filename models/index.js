const sequelize = require("../bin/dbConnection");
const USERS = require("./definations/user");
const ADDRESS=require("./definations/address");
const ROLES= require("./definations/roles")
const COURSES = require("./definations/course");
const UserCourse = require("./definations/userCourse");
// //Relation 
// // 1-to-1
// ADDRESS.hasOne(USERS,{foreignKey:"addressId"});
// USERS.belongsTo(ADDRESS,{foreignKey:"addressId"});
// //1-to-many
// ROLES.hasMany(USERS,{foreignKey:"roleId"});
// USERS.belongsTo(ROLES,{foreignKey:"roleId"});
// // many-to-many
// // user-usercourse
// USERS.hasMany(UserCourse,{foreignKey:"userId"});
// UserCourse.belongsTo(USERS,{foreignKey:"userId"});
// //course-usercourse 
// COURSES.hasMany(UserCourse,{foreignKey:"courseId"});
// UserCourse.belongsTo(COURSES,{foreignKey:"courseId"});

const models = {
    users:USERS,
    // address: ADDRESS,
    // roles: ROLES,
    // course:COURSES,
    // userCourse: UserCourse,
};
const db={};
db.sequelize = sequelize;
sequelize.models = models;

module.exports = {db, models};