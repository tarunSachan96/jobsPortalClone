const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    description: {
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
    },
    skills: {
      type: String,
      enum: {
        values: ["Node", "React", "Angular", "Java", "C++", "Python"],
        // message: "{VALUE} is not supported",
      },
    },

    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobsSchema);
