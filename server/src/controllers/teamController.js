const Team = require('../models/Team');

// Create team
const createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all teams
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('members admin');
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add member to team
const addMemberToTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: req.body.memberId } },
      { new: true }
    );
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTeam, getTeams, addMemberToTeam };
