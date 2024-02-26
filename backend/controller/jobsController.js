const employeerDetails = require("../model/employeerDetails");
const Jobs = require("../model/jobs");
const GetAllJobs = async (req, res) => {
  const { userid } = req.headers;
  // console.log(userid);
  const { _id: creatorid } = await employeerDetails.findOne({ userid: userid });
  // console.log(creatorid);
  const jobsData = await Jobs.find({ creatorid: creatorid });
  // console.log(jobsData);
  if (!jobsData) return res.status(404).json({ msg: "no jobs data to show" });

  res.status(200).json(jobsData);
};
const GetJob = async (req, res) => {
  const { jobid } = req.params;
  console.log(jobid);
  const jobData = await Jobs.findOne({ _id: jobid });
  if (!jobData)
    return res.status(404).json({ msg: "Unable to find requested job" });

  res.status(200).json(jobData);
};
const AddJob = async (req, res) => {
  const { title, location, pay, skills } = req.body;
  const { userid } = req.headers;
  const creator = await employeerDetails.findOne({ userid: userid });
  console.log(creator);
  if (!creator) return res.status(404).send("Unable to ceaate job");
  console.log({ userid, title, location, pay, skills });
  const jobadded = await Jobs.create({
    creatorid: creator._id,
    title,
    location,
    pay,
    skills,
  });
  if (!jobadded) return res.status(404).send("failed to create job");

  res.status(201).send("add job");
};
const EditJob = async (req, res) => {
  const { title, location, pay, skills } = req.body;
  const { userid } = req.headers;
  const { jobid } = req.params;
  const creator = await employeerDetails.findOne({ userid: userid });
  console.log(creator);
  if (!creator) return res.status(404).send("Unable to find jobs posted");
  console.log({ userid, title, location, pay, skills });
  const jobedited = await Jobs.findOneAndUpdate(
    { creatorid: creator._id, _id: jobid },
    {
      title,
      location,
      pay,
      skills,
    }
  );
  if (!jobedited) return res.status(404).send("failed to create job");

  res.status(201).json({ msg: "job details edited", jobedited });
};
const DeleteJob = async (req, res) => {
  const { jobid } = req.params;
  // console.log(jobid);
  const temp = await Jobs.findOneAndDelete({ _id: jobid });
  if (!temp) return res.status(404).json({ msg: "Unable to delete" });

  res.status(200).json({ msg: "job post deleted successfully!!!" });
};

module.exports = {
  GetAllJobs,
  GetJob,
  AddJob,
  EditJob,
  DeleteJob,
};
