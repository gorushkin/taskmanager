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

export { getProjects };
