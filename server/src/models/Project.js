const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  status: { type: String, enum: ['Active', 'Completed', 'On Hold'], default: 'Active' },
  deadline: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
