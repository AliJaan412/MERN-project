const {models} = require("../models");

module.exports = {
    createUser: async (body)=>{
        try{
            const createdUser = await models.user.create({...body});
            return{
                response:createdUser,
            }
        }
        catch(error){
            return {
                error:error.message,
            };
        }
    },
    getAllUser: async ()=>{
        try{
            const users = await models.user.findAll({
                attributes:{
                    exclude:["password"],
                }
            });
            return{
                response:users,
            }
        }
        catch(error){
            return {
                error:error.message,
            };
        }
    },
    getUserByUserName: async (userName)=>{
        try{
            const user= await models.user.findOne({
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
                error:error.message,
            };
        }
    },

    updateUser: async(body)=>{
        try{
            const updatedUser= await models.user.update({
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
                error:error.message,
            };
        }
    },
    deleteUser: async(userId)=>{
        try{
            const deletedUser = await models.user.destroy({
                where: {
                    userId: userId,
                }
            });
            return {
                response: deletedUser,
            }
        }
        catch(error){
            return {
                error:error.message,
            };
        }
    }
};
