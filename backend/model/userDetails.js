const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
  },
  age: {
    type: Number,
    required: [true, "Please provide age"],
    maxlength: 2,
  },
  college: {
    type: String,
    required: [true, "Please provide college name"],
    maxlength: 100,
  },
  degree: {
    type: String,
    enum: {
      values: ["B.Tech", "M.Tech", "B.Com", "M.Com", "MA", "BA", "B.Sc", "NA"],
      // message: "{VALUE} is not supported",
    },
  },
  skills: {
    type: String,
    enum: {
      values: ["Node", "React", "Angular", "Java", "C++", "Python"],
      // message: "{VALUE} is not supported",
    },
  },
  address: {
    type: String,
    required: [true, "Please provide adress"],
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    maxlength: 50,
  },
  contact: {
    type: String,
    required: [false, "Please provide mobile number"],
    maxlength: 10,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  appliedjobs:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    },
  ],
});

module.exports = mongoose.model("UserDetails", UserDetailsSchema);
