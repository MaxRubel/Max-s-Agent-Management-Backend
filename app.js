const express = require("express");
const app = express();
const mongoose = require("mongoose");
const agentsRouter = require("./routes/agents");
const { initializeDatabase } = require("./db/initializeDB");

const dotenv = require("dotenv");
dotenv.config();

var cors = require("cors");

const PORT = process.env.PORT;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const MONGODB_URI = process.env.MONGODB_URI;

const corsOptions = {
  origin: ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//env check--Delete later
console.log({ PORT });
console.log({ ALLOWED_ORIGIN });
console.log({ MONGODB_URI });

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection has been established successfully.");

    initializeDatabase();

    app.use(express.json());

    //router
    app.use("/agents", agentsRouter);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();

module.exports = app;
