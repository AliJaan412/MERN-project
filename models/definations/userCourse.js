const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class userCourse extends Model {}

userCourse.init({
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
module.exports = userCourse;