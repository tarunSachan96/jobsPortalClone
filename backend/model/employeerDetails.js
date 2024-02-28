const mongoose = require("mongoose");

const EmployeerDetailsSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company name"],
    maxlength: 50,
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
  jobsid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
      unique: true,
    },
  ],
  // candidatesid: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     unique: true,
  //   },
  // ],
});

module.exports = mongoose.model("employeerDetails", EmployeerDetailsSchema);
