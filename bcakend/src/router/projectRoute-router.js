const express = require('express')
const { postProject, getProject, editProject, deleteProject } = require('../controller/project')
const { addTaskProject, getProjectTask, deleteProjectTask, updateProjectTask } = require('../controller/addTask')
const routers = express.Router()

routers.post("/", postProject);
routers.get("/", getProject);
routers.put("/edit/:id", editProject);
routers.delete("/delete/:id", deleteProject);

routers.put("/add/task/:id", addTaskProject);
routers.get("/getTask/:id", getProjectTask);
routers.delete("/:projectId/deletTask/:taskId", deleteProjectTask);
routers.put('/updateTask/:projectId/:taskId', updateProjectTask);

module.exports = routers;