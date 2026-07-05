const {verify}= require("jsonwebtoken");
require("dotenv").config();

module.exports={
    middleware: async(req,res,next)=>{
        try {
            const token = req.cookies.Session;
            if(!token){
                return res.status(401).json({
                    error: "Un-authorised user",
                })
            }
            verify(token, process.env.SECRET,(error,data)=>{
                if(error){
                    return res.status(403).json({
                        error: "Forbidden access",
                    });
                }
                req.user = data;
                next();
            });
        } catch (error) {
            return res.status(500).json(
                {
                    error: error.message,
                }
            )

        }
    }
}
