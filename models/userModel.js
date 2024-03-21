const {models} = require("./index");

module.exports = {
    createUser: async (body)=>{
        try{
            const createdUser = await models.users.create({...body});
            return{
                response:createdUser,
            }
        }
        catch(error){
            return {
                error:{
                    error:error.message,
                    filename:"userModel",
                }
            };
        }
    },
    getAllUser: async ()=>{
        try{
            const users = await models.users.findAll({
                attributes:{
                    exclude:["createdAt", "password", "updatedAt"],
                }
                //OR  attributes:["userId,", "userName"]  
            });
            return{
                response:users,
            }
        }
        catch(error){
            return {
                error:{
                    error:error.message,
                    filename:"userModel",
                }
            };
        }
    },
    getUserByUserName: async (userName)=>{
        try{
            const user= await models.users.findOne({
                where: {
                    userName: userName,
                }
            });
            return {
                response: user,
            }
        }
        catch(error){
            return {
                error:{
                    error:error.message,
                    filename:"userModel",
                }
            };
        }
    },

    updateUser: async(body)=>{
        try{
            const updatedUser= await models.users.update({
                ...body,
            },{
                where: {
                    userId: body.userId,
                }
            })
            return {
                response: updatedUser,
            }
        }
        catch(error){
            return {
                error:{
                    error:error.message,
                    filename:"userModel",
                }
            };
        }
    },
    deleteUser: async(userId)=>{
        try{
            const deletedUser = await models.users.destroy({
                where: {
                    userId: userId,
                }
            });
            console.log(deletedUser)
            return {
                response: deletedUser,
            }
        }
        catch(error){
            return {
                error:{
                    error:error.message,
                    filename:"userModel",
                }
            };
        }
    }
};