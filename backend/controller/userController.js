const bcrypt = require("bcrypt");
const User = require("../model/user");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const privatekey = process.env.PRIVATE_KEY;

const Login = async (req, res) => {
  const { email, password } = req.body;
  // console.log("email=", email, "password:", password);
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("no used found with email or password");
  }
  // console.log(existingUser);

  const matched = await bcrypt.compare(password, existingUser.password);

  if (!matched) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("wrong password entered please try again !!!");
  }

  const token = jwt.sign(
    {
      email: email,
      user: existingUser._id,
    },
    privatekey,
    {
      expiresIn: "365d", // expires in 365 days
    }
  );
  // console.log("token : " + token);
  res.header("userid", `${existingUser._id}`);
  res.header("Authorization", `Bearer ${token}`);
  res.header("isadmin", `${existingUser.isAdmin}`);

  res
    .status(200)
    .json({
      email: email,
      password: password,
      token: token,
      isadmin: existingUser.isAdmin,
    });
};

const SignUp = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  // console.log(email, password);
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(StatusCodes.PRECONDITION_FAILED)
      .send(`user exists with email:"${email}" please use different email !!`);

  const hashed_user_password = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    email: email,
    isAdmin: isAdmin,
    password: hashed_user_password,
  });
  console.log("user:", user);
  const token = jwt.sign(
    {
      email: email,
      user: user._id,
    },
    privatekey,
    {
      expiresIn: "365d",
    }
  );
  // console.log("token : " + token);
  res.header("Authorization", `Bearer ${token}`);
  res.header("userid", `${user._id}`);
  res.header("isadmin", `${user.isAdmin}`);
  res
    .status(201)
    .json({ email: email, password: password, token: token, isadmin: isAdmin });
};

module.exports = { Login, SignUp };
