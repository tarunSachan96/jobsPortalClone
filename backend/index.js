const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
app.use(express.json());
const mongoose = require("mongoose");

const userRoutes = require("./route/user");
const adminRoutes = require("./route/admin");
const jobsRoutes = require("./route/jobs");
const jobApplyRoutes = require("./route/applyJobs");
const jwtAuthentication = require("./middleware/jwtAuthentication");
const connectDB = require("./db/connect");
app.get("/api/v1/", (req, res) => {
  res.send("Hello World!");
});
app.use(cors());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/admin", jwtAuthentication, adminRoutes);
app.use("/api/v1/user/admin", jwtAuthentication, jobsRoutes);
app.use("/api/v1", jwtAuthentication, jobApplyRoutes);

// app.use("/task", jwtAuthentication, tasksRoutes);
// app.use("/task", tasksRoutes);

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("mongo database connected.....");
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
