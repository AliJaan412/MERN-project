const router=require('express').Router();
const {login,logout}=require('../controller/authController')//we are doing destructuring here
router.get('/login',login);
router.get('/logout',logout);
module.exports=router; 