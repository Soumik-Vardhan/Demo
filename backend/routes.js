const mongoose = require("mongoose");

const credSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    tag: {
      type: Boolean,
    },
  },
  { collection: "creds" }
);

// const empSchema = mongoose.Schema(
//   {
//     id: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//     },
//     techStack: {
//       type: Array,
//     },
//     upVotes: {
//       type: Number,
//     },
//     upVoteStack: {
//       type: Array,
//     },
//     previousProject: {
//       type: Array,
//     },
//     jobDescription: {
//       type: String,
//     },
//     currentlyTagged: {
//       type: String,
//     },
//   },
//   { collection: "empDetails" }
// );

// const managerSchema = mongoose.Schema(
//   {
//     id: {
//       type: String,
//       required: true,
//     },
//     nameOfManager: {
//       type: String,
//       required: true,
//     },
//     projectName: {
//       type: String,
//       required: true,
//     },
//     requiredStack: {
//       type: Array,
//       required: true,
//     },
//     openings: {
//       type: Number,
//       required: true,
//     },
//     applicationsStack: {
//       type: Array,
//     },
//     projectDescription: {
//       tye: String,
//     },
//   },
//   { collection: "managerDetails" }
// );

// const Emp = mongoose.model("Emp", empSchema);
const Cred = mongoose.model("Cred", credSchema);
// const Mang = mongoose.model("Mang", managerSchema);
module.exports = Cred;
// module.exports = Emp;
// module.exports = Mang;
