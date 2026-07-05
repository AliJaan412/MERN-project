const userService = require("../service/userService");
const joi = require("joi");

const createUserSchema = joi.object().keys({
    userName: joi.string().required().min(3).max(34),
    password: joi.string().required().min(3).max(24),
})
const updateUserSchema = joi.object().keys({
    userName: joi.string().required().min(3).max(34),
});

module.exports = {
    createUser : async (req, res)=>{
        try{
            const validated = await createUserSchema.validateAsync(req.body);
            const createdUser  = await userService.createUser(validated);
            if(createdUser.error){
                return res.status(400).send({
                    error:createdUser.error,
                });
            }
            return res.status(201).send({
                response: createdUser.response,
            });
        }
        catch(error){
            if(error.isJoi){
                return res.status(400).send({
                    error:error.message,
                });
            }
            return res.status(500).send({
                error:error.message,
            });
        }
    },
    getAllUser : async (req, res)=>{
        try{
            const users= await userService.getAllUser();
            if(users.error){
                return res.status(400).send({
                    error:users.error,
                });
            }
            return res.status(200).send({
                response: users.response,
            });
        }
        catch(error){
            return res.status(500).send({
                error:error.message,
            });
        }
    },
    updateUser : async (req, res)=>{
        try{
          const validated = await updateUserSchema.validateAsync(req.body);
          const updatedUser= await userService.updateUser({...validated, userId: req.user.userId});
          if(updatedUser.error){
            return res.status(400).send({
                error:updatedUser.error,
            });
          }
          return res.status(200).send({
              response: updatedUser.response,
          });
        }
        catch(error){
            if(error.isJoi){
                return res.status(400).send({
                    error:error.message,
                });
            }
            return res.status(500).send({
                error:error.message,
            });
        }
    },
    deleteUser : async (req, res)=>{
        try{
          const deletedUser= await userService.deleteUser(req.user.userId);
          if(deletedUser.error){
            return res.status(400).send({
                error:deletedUser.error,
            });
          }
          return res.status(200).send({
              response: deletedUser.response,
          });
        }
        catch(error){
            return res.status(500).send({
                error:error.message,
            });
        }
    }

};
