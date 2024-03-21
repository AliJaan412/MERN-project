const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");


class COURSES extends Model{}

COURSES.init({
    courseId:{
        primaryKey:true,
        type:DataTypes.STRING(),
    },
    courseName:{
        type:DataTypes.STRING(),
        unique:true,
        allowNull:false,
    },
},
{
    timestamps:true,
    paranoid:true,
    // name:"course",
    sequelize,
}
)
module.exports=COURSES;