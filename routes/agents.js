const express = require("express");
const {
  Agent,
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent
} = require("../models/Agent");
const router = express.Router();

// Get all agents
router.get("/", async (req, res) => {
  try {
    const agents = await getAllAgents();
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one agent
router.get("/:id", async (req, res) => {
  try {
    const agent = await getAgentById(req.params.id);
    if (agent == null) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: "Oopsies: " + err.message });
  }
});

// Create an agent
router.post("/", async (req, res) => {
  try {
    const newAgent = await createAgent({
      fullName: req.body.fullName,
      email: req.body.email,
      department: req.body.department,
      interests: req.body.interests
    });
    res.status(201).json(newAgent);
  } catch (err) {
    console.error("Something went wrong: ", err);
    res.status(400).json({ message: err.message });
  }
});

// Update an agent
router.put("/:id", async (req, res) => {
  try {
    const updatedAgent = await updateAgent(req.params.id, req.body);
    if (updatedAgent == null) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(updatedAgent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Delete an agent
router.delete("/:id", async (req, res) => {
  try {
    const deletedAgent = await deleteAgent(req.params.id);
    if (deletedAgent == null) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json({ message: "Agent deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;