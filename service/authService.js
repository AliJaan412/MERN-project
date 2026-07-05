const { compare }=require('bcryptjs');
const userRepository= require("../repository/userRepository");
const {sign}= require("jsonwebtoken");
require("dotenv").config();
module.exports={
    login: async (validate)=>{
try {
    const isUser = await userRepository.getUserByUserName(validate.userName);
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
    const userPayload = isUser.response.toJSON();
    delete userPayload.password;
    const token= sign(userPayload, process.env.SECRET, {expiresIn: "1h"});
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
