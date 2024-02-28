const employeerDetails = require("../model/employeerDetails");
const Jobs = require("../model/jobs");
const GetAllJobs = async (req, res) => {
  const { userid } = req.headers;
  // console.log(userid);
  const { _id: creatorid } = await employeerDetails.findOne({ userid: userid });
  // console.log(creatorid);
  const jobsData = await Jobs.find({ creatorid: creatorid },{__v:0,candidatesid:0});
  // console.log(jobsData);
  if (!jobsData) return res.status(404).json({ msg: "no jobs data to show" });

  res.status(200).json(jobsData);
};

const GetJob = async (req, res) => {
  const { jobid } = req.params;
  console.log(jobid);
  const jobData = await Jobs.findOne({ _id: jobid }).populate({
    path:"candidatesid",
    model:"userDetails"
  });
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
  const employerJobsPost = await employeerDetails.findOneAndUpdate(
    { userid: userid },
    { $push: { jobsid: jobadded._id } }
  );
  console.log(employerJobsPost);
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
  const { userid } = req.headers;
  console.log("jobid:", jobid);
  const creator = await employeerDetails.findOne({ userid: userid });
  console.log(creator);
  if (!creator) return res.status(404).send("Unauthorized user");
  const validJobid = await Jobs.findById({ _id: jobid });
  if (!validJobid) return res.status(404).send("invalid job id");
  // console.log(validJobid)
  const jobdelete = await Jobs.findOneAndDelete({ _id: validJobid._id });
  if (!jobdelete) return res.status(404).send("Unable to delete job");

  const cleanJobsPostedArray = await employeerDetails.findOneAndUpdate(
    { userid: userid },
    { $pull: { jobsid: validJobid._id } }
  );
  if (!cleanJobsPostedArray) return res.status(404).send("failed to clean job posted array");

  res.status(200).json({ msg: "job post deleted and array cleaned successfully!!!" });
};

module.exports = {
  GetAllJobs,
  GetJob,
  AddJob,
  EditJob,
  DeleteJob,
};
