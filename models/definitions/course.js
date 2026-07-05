const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Course extends Model{}

Course.init({
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
    sequelize,
}
)
module.exports=Course;
