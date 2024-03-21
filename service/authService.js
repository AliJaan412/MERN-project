const { compare }=require('bcryptjs');
const userModel= require("../models/userModel");
const {sign}= require("jsonwebtoken");
require("dotenv").config();
module.exports={
    login: async (validate)=>{
try { 
    const isUser = await userModel.getUserByUserName(validate.userName);
    if(isUser.error || isUser.response==null){
        return {
            error: "Invalid credentials",
        }
    }
    const isValid = await compare (validate.password,isUser.response.dataValues.password)
    if(!isValid){
        return {
            error: "Invalid credentials",
        }
    }
    delete isUser.response.dataValues.password;
    const token= sign(isUser.response.dataValues, process.env.SECRET, {expiresIn: "1h"});
    return {
        response: token,
    }
}catch(error){
return {
    error: error.message,
}
}
    }
}