const ProjectModel = require("../model/project-modules")

const postProject = (req, res) => {
    ProjectModel.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

const getProject = (req, res) => {
    ProjectModel.find()
    .then(data => res.json(data))
    .catch(err => res.json(err));
};

const editProject = async (req, res) => {
    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const deleteProject = async (req, res) => {
    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
postProject,
getProject,
editProject,
deleteProject
};