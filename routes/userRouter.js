const {createUser, getAllUser, updateUser, deleteUser}= require("../controller/userController");
const {middleware}= require("../middleware");
const routes = require("express").Router();

routes.post("/createdUser", createUser);
routes.get("/getAllUser",middleware, getAllUser);
routes.put("/updateUser",updateUser);
routes.delete("/deleteUser",deleteUser);

module.exports = routes;
