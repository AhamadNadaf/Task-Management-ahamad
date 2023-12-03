const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    task: [
        {
            title: {
                type: String
            },
            description: {
                type: String
            },
            deadline: {
                type: String
            },
            priority:
            {
                type: String
            },
            status: {
                type: String,
                default: "To Do"
            }
        }
    ]

})

const ProjectModel = mongoose.model("project", ProjectSchema)

module.exports = ProjectModel

