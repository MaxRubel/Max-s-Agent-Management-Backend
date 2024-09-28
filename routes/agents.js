const express = require("express");
const { Agent } = require("../models/Agent");
const router = express.Router();

// Get all agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.findAll();
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one agent
router.get("/:id", async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (agent == null) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Oopsies" + err.message });
  }
});

// Create an agent
router.post("/", async (req, res) => {
  const agent = new Agent({
    fullName: req.body.fullName,
    email: req.body.email,
    department: req.body.department,
    interests: req.body.interests
  });

  try {
    const newAgent = await agent.save();
    res.status(201).json(newAgent);
  } catch (err) {
    console.error("something whent wrong: ", err)
    res.status(400).json({ message: err.message });
  }
});

// Update an agent
router.put("/:id", async (req, res) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (agent == null) {
      return res.status(404).json({ message: "Agent not found" });
    }
    await agent.update(req.body);
    res.status(204).end();
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message });
  }
});

// Delete an agent
router.delete("/:id", async (req, res) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (agent == null) {
      return res.status(404).json({ message: "User not found" });
    }
    await agent.destroy();
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
