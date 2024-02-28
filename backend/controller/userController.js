const bcrypt = require("bcrypt");
const User = require("../model/user");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const privatekey = process.env.PRIVATE_KEY;

const Login = async (req, res) => {
  const { email, password } = req.body;
  // console.log("email=", email, "password:", password);
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).send("no used found with email");
  }
  console.log(existingUser);

  const matched = await bcrypt.compare(password, existingUser.password);

  if (!matched) {
    return res.send("wrong password entered please try again !!!");
  }

  const token = jwt.sign(
    {
      email: email,
      user: existingUser._id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    },
    privatekey
  );
  // console.log("token : " + token);
  res.header("userid", `${existingUser._id}`);
  res.header("Authorization", `Bearer ${token}`);

  res.status(200).json({
    message: "login success",
    token: token,
  });
};

const SignUp = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  // console.log(email, password);
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(404)
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
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    },
    privatekey
  );
  // console.log("token : " + token);
  res.header("Authorization", `Bearer ${token}`);
  res.header("userid", `${user._id}`);

  res.status(201).json({ email: email, password: password, token: token });
};

module.exports = { Login, SignUp };
