const employeerDetails = require("../model/employeerDetails");

const GetEmployeerDetails = async (req, res) => {
  const { userid } = req.headers;
  // const details = await employeerDetails
  //   .find({ userid: userid })
  //   .populate("jobsid", { __v: 0, creatorid: 0 });
  const details = await employeerDetails.find({ userid: userid }).populate({
    path: "jobsid",
    model: "Jobs",
    select: "-userid -__v",
    populate: [
      {
        path: "candidatesid",
        model: "User",
        select: "email",
      },
    ],
  });
  // .populate("candidatesid");
  if (!details) {
    return res.status(404).json("No user found");
  }
  res.status(200).json(details);
};
const AddEmployeerDetails = (req, res) => {
  const { company, address, email, contact } = req.body;
  const { userid } = req.headers;
  // console.log({ userid, company, address, email, contact });
  const added = employeerDetails.create({
    company,
    address,
    email,
    contact,
    userid,
  });
  // console.log(added);
  if(!added)return res.statuse(404).send("failed to add details!!!")
  res.status(201).send("employeer details added");
};
const EditEmployeerDetails = async (req, res) => {
  const { company, address, email, contact } = req.body;
  const { userid } = req.headers;
  // console.log({ userid, company, address, email, contact });
  const details = await employeerDetails.findOne({ userid: userid });
  if (!details) return res.status(404).json({ msg: "No user details found" });

  const update = await employeerDetails.findOneAndUpdate(
    { userid: userid },
    { company, address, email, contact },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!update) return res.status(404).json({ msg: "unable to update details" });
  res.send("edited employeer details");
};

module.exports = {
  GetEmployeerDetails,
  AddEmployeerDetails,
  EditEmployeerDetails,
};
