const userService = require("../service/userService");
const joi = require("joi");

const createUserSchema = joi.object().keys({
    userName: joi.string().required().min(3).max(34),
    password: joi.string().required().min(3).max(24),
    // confrimPassword:joi.ref("password"),
})
const updateUserSchema = joi.object().keys({
    userName: joi.string().required().min(3).max(34),
    userId: joi.string().required(),
});
const deleteUserSchema = joi.object().keys({
    userId: joi.string().required(),
})
module.exports = {
    createUser : async (req, res)=>{
        try{

            const validate = await createUserSchema.validateAsync(req.body);
            const createdUser  = await userService.createUser(validate);
            if(createdUser.error){
                return res.send({
                    error:createdUser.error,
                });
            }
            return res.send({
                response: createdUser.response,
            });
        }
        catch(error){
            return res.send({
                error:{
                    error:error.message,
                    filename:"userController",
                }
            });
        }
    },
    getAllUser : async (req, res)=>{
        try{
            const users= await userService.getAllUser();
            if(users.error){
                return res.send({
                    error:users.error,
                });
            }
            return res.send({
                response: users.response,
            });
        }
        catch(error){
            return res.send({
                error:{
                    error:error.message,
                    filename:"userController",
                }
            });
        }
    },
    updateUser : async (req, res)=>{
        try{
          const validateUpdateUser = await updateUserSchema.validateAsync(req.body);
          const updatedUser= await userService.updateUser(validateUpdateUser);
          if(updatedUser.error){
            return res.send({
                error:updatedUser.error,
            });
        }
        return res.send({
            response: updatedUser.response,
        });
        }
        catch(error){
            return res.send({
                error:{
                    error:error.message,
                    filename:"userController",
                }
            });
        }
    },
    deleteUser : async (req, res)=>{
        try{
          const deleteUpdateUser = await deleteUserSchema.validateAsync(req.query);
          const deletedUser= await userService.deleteUser(deleteUpdateUser);
          if(deletedUser.error){
            return res.send({
                error:deletedUser.error,
            });
        }
        return res.send({
            response: deletedUser.response,
        });
        }
        catch(error){
            return res.send({
                error:{
                    error:error.message,
                    filename:"userController",
                }
            });
        }
    }

};