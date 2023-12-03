const ProjectModel = require("../model/project-modules")

const addTaskProject = async (req, res) => {
  if (req.params.id) {
    try {
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        req.params.id,
        { $push: { task: req.body.task } },
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
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }

}

const getProjectTask = (req, res) => {
  ProjectModel.findById(req.params.id)
    .then(data => res.json(data.task))
    .catch(err => res.json(err));

}

const deleteProjectTask = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const taskIndex = project.task.findIndex(task => task._id.toString() === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    project.task.splice(taskIndex, 1);

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const updateProjectTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const updatedTaskData = req.body.task;

  try {
      const project = await ProjectModel.findById(projectId);

      if (!project) {
          return res.status(404).json({ message: 'Project not found' });
      }

      const taskIndex = project.task.findIndex(task => task._id.toString() === taskId);

      if (taskIndex === -1) {
          return res.status(404).json({ message: 'Task not found' });
      }

      project.task[taskIndex] = {
          ...project.task[taskIndex],
          ...updatedTaskData,
      };

      const updatedProject = await project.save();

      res.json(updatedProject);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = { addTaskProject, getProjectTask, deleteProjectTask , updateProjectTask}