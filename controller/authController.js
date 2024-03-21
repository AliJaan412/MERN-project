const joi=require('joi')
const {login}=require('../service/authService')
const loginSchema=joi.object().keys({
    userName:joi.string().required(),
    password: joi.string().required().min(6),
});// schemea to validate now we have to valid it 

let authController={
    login:async (req,res)=>{
        try {
            const validate= await loginSchema.validateAsync(req.body);//to validate data 
            const loginResponse=await login(validate)
            if (loginResponse.error){
                return res.send({
                    error:loginResponse.error,
                })
            } 
            res.cookie("Session", loginResponse.response,{maxAge : 20000});
            return res.send({
                response: loginResponse.response,
            })
    }catch(error){
            return res.send({
                message:'login api',
                error:error.message,
            });

        }
        },
    logout:(req,res)=>{
        return res.send('My logout page')
        },
};
module.exports=authController