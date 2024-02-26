const Jobs = require("../model/jobs");
const GetAllJobs = (req, res) => {
  res.send("get all jobs posted");
};
const GetJob = (req, res) => {
  res.send("get single job");
};
const AddJob = (req, res) => {
  res.send("add job");
};
const EditJob = (req, res) => {
  res.send("add job");
};
const DeleteJob = (req, res) => {
  res.send("delete jon");
};

module.exports = {
  GetAllJobs,
  GetJob,
  AddJob,
  EditJob,
  DeleteJob,
};
