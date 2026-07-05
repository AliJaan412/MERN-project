const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class UserCourse extends Model {}

UserCourse.init({
    userCourseId:{
        primaryKey:true,
        type:DataTypes.STRING(),
    },
},
{
    timestamps:true,
    paranoid:true,
    sequelize,
}
);
module.exports = UserCourse;
