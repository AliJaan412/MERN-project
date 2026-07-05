const { Model, DataTypes} = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Address extends Model {}

Address.init({
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
    sequelize,
}
);
module.exports = Address;
