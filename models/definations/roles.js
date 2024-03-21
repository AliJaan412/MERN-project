const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class ROLES extends Model {}

ROLES.init({
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
module.exports = ROLES;