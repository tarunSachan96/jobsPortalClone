const userDetails = require("../model/userDetails");
const employeerDetails = require("../model/employeerDetails");
const Jobs = require("../model/jobs");

const { findOne } = require("../model/employeerDetails");

const getAllAppliedJobs = async (req, res) => {
  const useridheader = req.headers.userid;
  const id = req.params.id;
  const UserDetails = await userDetails
    .findOne({ userid: req.headers.userid })
    .populate("appliedjobs", { candidatesid: 0, updatedAt: 0, __v: 0 });
  console.log("Applied jobs:", UserDetails.appliedjobs);
  res.send(UserDetails.appliedjobs);
};
const getTargetedJob = async (req, res) => {
  const { jobid } = req.params;
  const { userid } = req.headers;
  //   console.log("jobid:", jobid, "userid", userid);
  //   const UserDetails = await userDetails.findOne({ userid: req.headers.userid });
  const validJobid = await Jobs.findById({ _id: jobid });

  if (!validJobid) return res.status(404).send("invalid job id");

  const Job = await Jobs.find(
    { _id: jobid },
    {
      candidatesid: 0,
      updatedAt: 0,
      __v: 0,
    }
  );
  if (!Job) res.status(404).send("unable to add job");

  res.status(200).json(Job);
};
const applyTargetedJob = async (req, res) => {
  const { jobid } = req.params;
  const { userid } = req.headers;
  //   console.log("jobid:", jobid, "userid", userid);
  //   const UserDetails = await userDetails.findOne({ userid: req.headers.userid });
  const validJobid = await Jobs.findById({ _id: jobid });
  // console.log(validJobid);

  if (!validJobid) return res.status(404).send("invalid job id");
  const userJobs = await userDetails.findOneAndUpdate(
    { userid: userid },
    { $addToSet: { appliedjobs: validJobid._id } }
  );

  if (!userJobs) return res.status(404).json("unable to add job errror!!!");
  console.log(userJobs);
  const application = await Jobs.findOneAndUpdate(
    { _id: validJobid._id },
    { $addToSet: { candidatesid: userid } } //ye baad me dala hai original-{ $push: { candidatesid: userid } }
  );
  // console.log("creator id:", validJobid.creatorid);
  // const application = await employeerDetails.findOne({
  //   _id: validJobid.creatorid,
  // });
  // console.log(application);
  if (!application) return res.send("unable to update candidate array");

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

  const application = await Jobs.findOneAndUpdate(
    { _id: validJobid._id },
    { $pull: { candidatesid: userid } }
  );
  if (!application) return res.send("unable to update candidate array");
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
