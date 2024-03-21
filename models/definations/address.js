const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class ADDRESS extends Model {}

ADDRESS.init({
    addressId:{
        primaryKey:true,
        type:DataTypes.STRING(),
    },
    address:{
        type :DataTypes.STRING(),
        allowNull:false,
    },
},
{
    timestamps:true,
    paranoid:true,
    // name:"user",
    sequelize,
}
);
module.exports = ADDRESS;