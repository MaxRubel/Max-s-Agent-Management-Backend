const { Agent } = require("../models/Agent");
const { sampleAgents } = require("../models/SampleData");
// Load sample data
async function loadSampleData() {
  try {
    await Agent.insertMany(sampleAgents);
  } catch (error) {
    console.error("Error loading sample data:", error);
  }
}

async function initializeDatabase() {
  try {
    //  DANGER - DELETE ALL ENTRIES -- for CLEARING CHANGES/ DEV MODE ONLY
    // await Agent.deleteMany({});
    const count = await Agent.countDocuments();
    if (count === 0) {
      await loadSampleData();
      console.log("Sample data loaded successfully.");
    } else {
      console.log("Database is already full.");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

module.exports = {
  initializeDatabase,
};
