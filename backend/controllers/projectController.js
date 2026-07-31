const { listProjects, createProject, getProject, updateProject } = require('../services/projectService');

async function getProjects(req, res) {
  try {
    const projects = await listProjects();
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createProjectHandler(req, res) {
  try {
    const project = await createProject(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getProjectHandler(req, res) {
  try {
    const project = await getProject(req.params.id);
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateProjectHandler(req, res) {
  try {
    const project = await updateProject(req.params.id, req.body);
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  getProjects,
  createProjectHandler,
  getProjectHandler,
  updateProjectHandler,
};
