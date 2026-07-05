const joi=require('joi')
const {login: authenticateUser}=require('../service/authService')
const loginSchema=joi.object().keys({
    userName:joi.string().required(),
    password: joi.string().required().min(6),
});

const authController={
    login:async (req,res)=>{
        try {
            const validated= await loginSchema.validateAsync(req.body);
            const loginResult=await authenticateUser(validated)
            if (loginResult.error){
                return res.status(401).send({
                    error:loginResult.error,
                })
            }
            res.cookie("Session", loginResult.response,{maxAge : 20000, httpOnly: true});
            return res.status(200).send({
                response: loginResult.response,
            })
        }catch(error){
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
    logout:(req,res)=>{
        res.clearCookie("Session");
        return res.status(200).send({
            response:"Logged out successfully",
        });
        },
};
module.exports=authController
