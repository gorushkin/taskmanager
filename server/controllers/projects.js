import Project from '../models/Project.js';

const getProjects = async (req, res) => {
  const {
    user: { userId },
  } = req;
  try {
    const projects = await Project.find({ userId });
    res.status(200).json({ projects }).end();
  } catch (error) {
    res.status(500).json({ message: error }).end();
  }
};

const addProject = async (req, res) => {
  console.log('addProject');
  const { name, userId } = req.body;
  console.log('name: ', name);
  const project = new Project({ name, removable: true, userId });
  console.log('project: ', project);
  try {
    await project.save();
    res
      .status(201)
      .json({
        project,
        message: 'project created',
      })
      .end();
  } catch (error) {
    res.status(500).json({ message: error.message }).end();
  }
};

export { getProjects, addProject };
