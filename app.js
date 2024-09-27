const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const PORT = process.env.PORT;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

var cors = require("cors");

app.use(cors());

const mongoose = require("mongoose");
const agentsRouter = require("./routes/agents");

console.log({ PORT });
console.log({ ALLOWED_ORIGIN });

var corsOptions = {
  origin: ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
};

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());

// Use the user router
app.use("/agents", agentsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
