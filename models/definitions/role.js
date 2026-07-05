const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Role extends Model {}

Role.init({
    roleId:{
        primaryKey:true,
        type:DataTypes.STRING(),
    },
    roleName:{
        type :DataTypes.STRING(),
        unique:true,
        allowNull: false,
    },
},
{
    timestamps:true,
    paranoid:true,
    sequelize,
}
);
module.exports = Role;
