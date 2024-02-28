const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide description name"],
      maxlength: 50,
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
      maxlength: 20,
    },
    pay: {
      type: Number,
      maxlength: 2,
    },
    skills: [
      {
        type: String,
        enum: {
          values: ["Node", "React", "Angular", "Java", "C++", "Python"],
          // message: "{VALUE} is not supported",
        },
      },
    ],

    creatorid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeerDetails",
    },
    candidatesid: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobsSchema);
