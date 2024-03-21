const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    port: process.env.DB_PORT,
    host:process.env.DB_HOST,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    dialect:process.env.DB_DIALECT,
});

sequelize.authenticate()
.then(()=>{
    console.log("DataBase Connected")
}).catch((error)=>{
    console.log(error.message)
});
module.exports = sequelize; 
