const userRepository = require("../repository/userRepository");
const {hash}= require("bcryptjs");
const {v4: uuid}=require("uuid");
module.exports={
    createUser: async (body)=>{
        try{
            body.userId=uuid();
            body.password= await hash(body.password, 10);
            const isUser= await userRepository.getUserByUserName(body.userName);
            if (isUser.error){
                return {
                    error: isUser.error,
                };
            }
            if (isUser.response){
                return {
                    error: "User with this username already exists.",
                };
            }
            const createdUser = await userRepository.createUser(body);
            if(createdUser.error){
                return{
                    error:createdUser.error,
                }
            }
            const userPayload = createdUser.response.toJSON();
            delete userPayload.password;
            return {
                response:userPayload,
            }

        }
        catch(error){
            return{
                error:error.message,
            }
        }
    },
    getAllUser: async ()=>{
        try{
            const users = await userRepository.getAllUser();
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
                error:error.message,
            }
        }
    },
    updateUser: async(body)=>{
        try{
            const updatedUser= await userRepository.updateUser(body);
            if (updatedUser.error){
                return{
                    error: updatedUser.error,
                }
            }
            return {
                response: updatedUser.response,
            };

        }
        catch(error){
            return{
                error:error.message,
            }
        }
    },
    deleteUser: async(userId)=>{
        try{
            const deletedUser= await userRepository.deleteUser(userId);
            if (deletedUser.error){
                return{
                    error: deletedUser.error,
                }
            }
            return {
                response: deletedUser.response,
            };

        }
        catch(error){
            return{
                error:error.message,
            }
        }
    }
}
