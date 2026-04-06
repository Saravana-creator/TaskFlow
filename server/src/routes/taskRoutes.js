const express = require('express');
const router = express.Router();
const { createTask, getProjectTasks } = require('../controllers/taskController');

// Create a task
router.post('/', createTask);

// Get tasks for a specific project
router.get('/project/:projectId', getProjectTasks);

module.exports = router;
