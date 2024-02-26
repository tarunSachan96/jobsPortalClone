const employeerDetails = require("../model/employeerDetails");

const GetEmployeerDetails = async (req, res) => {
  const { userid } = req.headers;
  const details = await employeerDetails.findById({ userid: userid });
  if (!details) {
    res.status(404).json("No user found");
  }
  res.status(200).json(details);
};
const AddEmployeerDetails = (req, res) => {
  const { company, address, email, contact } = req.body;
  const { userid } = req.headers;
  console.log({ userid, company, address, email, contact });
  const added = employeerDetails.create({
    company,
    address,
    email,
    contact,
    userid,
  });
  console.log(added);
  res.status(201).send("employeer details added");
};
const EditEmployeerDetails = (req, res) => {
  res.send("edit employeer details");
};

module.exports = {
  GetEmployeerDetails,
  AddEmployeerDetails,
  EditEmployeerDetails,
};
