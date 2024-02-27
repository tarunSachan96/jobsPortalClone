const userDetails = require("../model/userDetails");
const Jobs = require("../model/jobs");
const getAllAppliedJobs = async (req, res) => {
  const useridheader = req.headers.userid;
  const id = req.params.id;
  const UserDetails = await userDetails
    .findOne({ userid: req.headers.userid })
    .populate("appliedjobs");
  console.log(UserDetails.appliedjobs);
  res.send("All applied jobs");
};
const getTargetedJob = async (req, res) => {
  const { jobid } = req.params;
  const { userid } = req.headers;
  //   console.log("jobid:", jobid, "userid", userid);
  //   const UserDetails = await userDetails.findOne({ userid: req.headers.userid });
  const validJobid = await Jobs.findById({ _id: jobid });
  if (!validJobid) return res.status(404).send("invalid job id");
  const Job = await Jobs.findOne({ _id: jobid });
  if (!Job) console.log("unable to add job");

  res.status(200).json(Job);
};
const applyTargetedJob = async (req, res) => {
  const { jobid } = req.params;
  const { userid } = req.headers;
  //   console.log("jobid:", jobid, "userid", userid);
  //   const UserDetails = await userDetails.findOne({ userid: req.headers.userid });
  const validJobid = await Jobs.findById({ _id: jobid });
  if (!validJobid) return res.status(404).send("invalid job id");
  const userJobs = await userDetails.findOneAndUpdate(
    { userid: userid },
    { $push: { appliedjobs: validJobid._id } }
  );
  if (!userJobs) console.log("unable to add job");

  res.status(201).send(`Targetted job applied with jobid ${jobid}`);
};
const deleteAppliedJob = async (req, res) => {
  const { jobid } = req.params;
  const { userid } = req.headers;
  // console.log("jobid:", jobid, "userid", userid);
  const UserDetails = await userDetails.findOne({ userid: req.headers.userid });
  const validJobid = await Jobs.findById({ _id: jobid });
  if (!validJobid) return res.status(404).send("invalid job id");

  const userJob = await userDetails.findOneAndUpdate(
    { userid: userid },
    { $pull: { appliedjobs: validJobid._id } }
  );
  // const userJobs = await userDetails.findOneAndUpdate(
  //   { userid: userid },
  //   { appliedJobs:[]}
  // );
  if (!userJob) console.log("unable to delete applied job");

  res.status(201).send(`Targetted job not deleted with jobid ${jobid}`);
};

module.exports = {
  getAllAppliedJobs,
  getTargetedJob,
  applyTargetedJob,
  deleteAppliedJob,
};
