const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { sampleAgents } = require('./SampleData');

// Define the Agent model
const Agent = sequelize.define('Agent', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interests: {
    type: DataTypes.STRING,
  },
});

// Function to load sample data
async function loadSampleData() {
  try {
    await Agent.sync({ force: true });
    await Agent.bulkCreate(sampleAgents);
    const agentCount = await Agent.count();
    console.log(`Total agents in database: ${agentCount}`);
  } catch (error) {
    console.error('Error loading sample data:', error);
    throw error;
  }
}

// Function to initialize the database
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await loadSampleData();
    console.log('Sample data loaded successfully');
  } catch (error) {
    console.error('Unable to initialize database:', error);
    throw error;
  }
}

module.exports = {
  Agent,
  initializeDatabase
};