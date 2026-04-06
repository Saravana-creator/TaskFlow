const express = require('express');
const router = express.Router();
const { createTeam, getTeams, addMemberToTeam } = require('../controllers/teamController');

// Routes
router.post('/', createTeam);
router.get('/', getTeams);
router.put('/:id/member', addMemberToTeam);

module.exports = router;
