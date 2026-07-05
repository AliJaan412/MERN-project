const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class User extends Model {}

User.init({
    userId:{
        primaryKey:true,
        type:DataTypes.STRING(),
    },
    userName:{
        type :DataTypes.STRING(),
        unique:true,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING(),
        allowNull:false,
    }
},
{
    timestamps:true,
    paranoid:true,
    sequelize,
}
);
module.exports = User;
