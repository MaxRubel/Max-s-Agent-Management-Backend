const { sampleAgents } = require('./SampleData');
const mongoose = require('mongoose');

// Agent Model
const agentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  department: String,
  interests: String
});

const Agent = mongoose.model('Agent', agentSchema);

// Create
async function createAgent(agentData) {
  try {
    const newAgent = new Agent(agentData);
    return await newAgent.save();
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
}

// Get (all)
async function getAllAgents() {
  try {
    return await Agent.find();
  } catch (error) {
    console.error('Error getting all agents:', error);
    throw error;
  }
}

// Get (one)
async function getAgentById(id) {
  try {
    return await Agent.findById(id);
  } catch (error) {
    console.error('Error getting agent by ID:', error);
    throw error;
  }
}

// Update
async function updateAgent(id, updateData) {
  try {
    return await Agent.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error('Error updating agent:', error);
    throw error;
  }
}

// Delete
async function deleteAgent(id) {
  try {
    return await Agent.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting agent:', error);
    throw error;
  }
}

module.exports = {
  Agent,
  getAllAgents,
  createAgent,
  getAgentById,
  updateAgent,
  deleteAgent
};