const UserDetails = require("../model/userDetails");
const GetDetails = async (req, res) => {
  const { userid } = req.headers;
  const details = await UserDetails.findOne({ userid: userid });
//   console.log(details);
  res.status(200).json(details);
};
const AddUserDetails = async (req, res) => {
  const { name, age, college, degree, skills, address, contact, email } =
    req.body;
  const { userid } = req.headers;
  const details = await UserDetails.create({
    name,
    age,
    college,
    degree,
    skills,
    address,
    contact,
    userid,
    email,
  });
  console.log(details);
  res.json({ userid });
};
const UpdateDetails = (req, res) => {
  const { name, age, college, degree, skills, address, contact } = req.body;
  const { userid } = req.headers;
  res.json({ userid, name, age, college, degree, skills, address, contact });
};
const Applies = (req, res) => {
  res.send("user applies details");
};
module.exports = { GetDetails, AddUserDetails, UpdateDetails, Applies };
