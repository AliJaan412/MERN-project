const userModel = require("../models/userModel");
const {hash}= require("bcryptjs");
const {v4: uuid}=require("uuid");
const { models } = require("../models");
module.exports={
    createUser: async (body)=>{
        try{
            body.userId=uuid();
            body.password= await hash(body.password, 10);
            const isUser= await userModel.getUserByUserName(body.userName);
            if (isUser.response || isUser.error){
                return {
                    error: "User wit this username already exits.",
                };
            }
            const createdUser = await userModel.createUser(body);
            if(createdUser.error){
                return{
                    error:createdUser.error,
                }
            }            
            delete createdUser.response.dataValues.password;
            return {
                response:createdUser.response,
            }

        }
        catch(error){
            return{
                error:{
                    error:error.message,
                    filename:"userService",
                }
            }
        }
    },
    getAllUser: async ()=>{
        try{
            const users = await userModel.getAllUser();
            if(users.error){
                return{
                    error:users.error,
                }
            }            
            return {
                response:users.response,
            }

        }
        catch(error){
            return{
                error:{
                    error:error.message,
                    filename:"userService",
                }
            }
        }
    },
    updateUser: async(body)=>{
        try{
            const updatedUser= await userModel.updateUser(body);
            if (updatedUser.error){
                return{
                    error: error.message,
                }
            } 
            return {
                response: updatedUser.response,
            };

        }
        catch(error){
            return{
                error:{
                    error:error.message,
                    filename:"userService",
                },
            }
        }
    },
    deleteUser: async(query)=>{
        try{
            const deletedUser= await userModel.deleteUser(query.userId);
            if (deletedUser.error){
                return{
                    error: error.message,
                }
            } 
            return {
                response: deletedUser.response,
            };

        }
        catch(error){
            return{
                error:{
                    error:error.message,
                    filename:"userService",
                },
            }
        }
    }
}