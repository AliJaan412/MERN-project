const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class USERS extends Model {}

USERS.init({
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
    // name:"user",
    sequelize,
}
);
module.exports = USERS;