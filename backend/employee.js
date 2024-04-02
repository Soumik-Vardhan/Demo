const mongoose = require("mongoose");

const empSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    techStack: {
      type: Array,
    },
    upVotes: {
      type: Number,
    },
    upVoteStack: {
      type: Array,
    },
    previousProject: {
      type: Array,
    },
    jobDescription: {
      type: String,
    },
    currentlyTagged: {
      type: String,
    },
  },
  { collection: "empDetails" }
);

const Emp = mongoose.model("Emp", empSchema);
// const Cred = mongoose.model("Cred", credSchema);
// const Mang = mongoose.model("Mang", managerSchema);
// module.exports = Cred;
module.exports = Emp;
// module.exports = Mang;
