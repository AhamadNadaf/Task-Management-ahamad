const express = require('express')
const registrations = require('../controller/registration')
const {login,getUser, deleteUser} = require('../controller/login')
const dashboard = require('../controller/dashboard')
const verifyuser = require('../middleware/verifyUser')

const routers = express.Router()

routers.post("/registration", registrations);
routers.post("/login",login);
routers.delete("/delete/:id",deleteUser);
routers.get("/getuser",getUser);
routers.get("/dashboard",verifyuser, dashboard);


module.exports = routers;
