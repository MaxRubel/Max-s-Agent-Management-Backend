const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

var cors = require("cors");

const PORT = process.env.PORT;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

const corsOptions = {
  origin: ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const sequelize = require('./database');
const { initializeDatabase } = require("./models/Agent");

console.log({ PORT });
console.log({ ALLOWED_ORIGIN });

const agentsRouter = require("./routes/agents");

async function startServer() {
  try {
    await initializeDatabase();
    console.log('Database connection has been established successfully.');

    await sequelize.sync();
    console.log('Database synchronized');

    app.use(express.json());

    //router
    app.use("/agents", agentsRouter);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

module.exports = app;