const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const cookieParser = require("cookie-parser")

const router = require('./src/router/index-router');

const app = express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methos:["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect("mongodb+srv://ahamad2817:vuWnfbtE4jMVKR90@task-management.vtd01p7.mongodb.net/?retryWrites=true&w=majority")
    .then(() => app.listen(5000))
    .then(() => console.log("Connected to DB and listening to 5000"))
    .catch((err) => console.log(err))

    app.use("/otherwise", router)
