const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());

// Use the user router
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
