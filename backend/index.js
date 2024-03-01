const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
const corsOptions = {
  exposedHeaders: ["Authorization", "userid", "isadmin"],
};

app.use(cors(corsOptions));

const userRoutes = require("./route/user");
const adminRoutes = require("./route/admin");
const jobsRoutes = require("./route/jobs");
const jobApplyRoutes = require("./route/applyJobs");
const jwtAuthentication = require("./middleware/jwtAuthentication");
const connectDB = require("./db/connect");

app.get("/api/v1/", (req, res) => {
  res.send("Hello World!");
});

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/admin", jwtAuthentication, adminRoutes);
app.use("/api/v1/user/admin", jwtAuthentication, jobsRoutes);
app.use("/api/v1", jwtAuthentication, jobApplyRoutes);

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
