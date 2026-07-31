const { listPrograms, createProgram, getProgram, updateProgram } = require('../services/programService');

async function listProgramsHandler(req, res) {
  try {
    const programs = await listPrograms();
    res.json({ success: true, data: programs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function createProgramHandler(req, res) {
  try {
    const program = await createProgram(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

async function getProgramHandler(req, res) {
  try {
    const program = await getProgram(req.params.id);
    res.json({ success: true, data: program });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateProgramHandler(req, res) {
  try {
    const program = await updateProgram(req.params.id, req.body);
    res.json({ success: true, data: program });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  listPrograms: listProgramsHandler,
  createProgramHandler,
  getProgramHandler,
  updateProgramHandler,
};
