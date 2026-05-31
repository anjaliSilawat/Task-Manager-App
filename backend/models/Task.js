const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  stage:       { type: String, enum: ['Todo', 'In Progress', 'Done'], default: 'Todo' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);