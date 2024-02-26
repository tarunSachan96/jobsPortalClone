const UserDetails = require("../model/userDetails");
const GetDetails = async (req, res) => {
  const { userid } = req.headers;
  const details = await UserDetails.findOne({ userid: userid });
  if (!details) {
    return res.status(404).json({ msg: "no user with details found !!!" });
  }
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
  if (!details) {
    return res.status(404).json({ msg: "unable to create user!!!" });
  }
  // console.log(details);
  res.status(201).json({ userid });
};
const UpdateDetails = async (req, res) => {
  const { name, age, college, degree, skills, address, contact } = req.body;
  const { userid } = req.headers;
  const updatedResult = await UserDetails.findOneAndUpdate(
    { userid: userid },
    { name, age, college, degree, skills, address, contact },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedResult)
    return res.ststus(404).json({ msg: "unable to edit user!!!" });

  res.status(202).json({ updatedResult });
};
const Applies = (req, res) => {
  res.send("user applies details");
};
module.exports = { GetDetails, AddUserDetails, UpdateDetails, Applies };
