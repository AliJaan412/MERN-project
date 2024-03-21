const {verify}= require("jsonwebtoken");
require("dotenv").config();

module.exports={
    middleware: async(req,res,next)=>{
        try {
            const token = req.cookies.Session;
            if(!token){
                return res.send({
                    error: "Un-authorised user",
                })
            } 
            verify(token, process.env.SECRET,(error,data)=>{
                if(error){
                    return res.send({
                        error: "Forbidden access",
                    });
                }
                console.log("data",data.response);
                next();
            });
        } catch (error) {
            return res.send(
                {
                    error: error.message,
                }
            )
            
        }
    }
}