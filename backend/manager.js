const mongoose = require("mongoose");

const managerSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    nameOfManager: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    requiredStack: {
      type: Array,
      required: true,
    },
    openings: {
      type: Number,
      required: true,
    },
    applicationsStack: {
      type: Array,
    },
    projectDescription: {
      type: String,
    },
  },
  { collection: "managerDetails" }
);
const Mang = mongoose.model("Mang", managerSchema);
// module.exports = Cred;
// module.exports = Emp;
module.exports = Mang;
