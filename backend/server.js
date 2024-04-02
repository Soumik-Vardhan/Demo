const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { error } = require("console");
const Cred = require("./routes");
const Emp = require("./employee");
const Mang = require("./manager");

//we defined our app
const app = express();

//lets set up the middleware
app.use(cors());
app.use(express.json());

//lets write the routes

//rote to post the data of candidates creds to the mongoDB
app.post("/postCred", async (req, res) => {
  try {
    const credCandi = await Cred.create(req.body);
    res.status(200).json(credCandi);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// route to post the data of the manager and project details
app.post("/postManager", async (req, res) => {
  try {
    const MangDetails = await Mang.create(req.body);
    res.status(200).json(MangDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//route to post the details of the employee details to the mongoDB
app.post("/postEmp", async (req, res) => {
  try {
    const empDetails = await Emp.create(req.body);
    res.status(200).json(empDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//lets write get route to get the details of candidate creds
app.get("/getCred", async (req, res) => {
  try {
    const candCreds = await Cred.find({});
    res.status(200).json(candCreds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//lets write get route to get the details of Employee detais
app.get("/getEmps", async (req, res) => {
  try {
    const candCreds = await Emp.find({});
    res.status(200).json(candCreds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//put route to update the upvotes of an employee
app.put("/updateVote/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id is ", id);
  const { managerId } = req.body; // Changed variable name to managerId
  console.log(managerId);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const updatedDoc = await Emp.findByIdAndUpdate(
      id,
      {
        $inc: { upVotes: 1 },
        $addToSet: { upVoteStack: { id: managerId } },
      },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(updatedDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete roue upon undoing the upvote button
app.delete("/upVoteUndo/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { managerId } = req.body;
  console.log(managerId);

  try {
    // // Validate parent ID
    // if (!mongoose.Types.ObjectId.isValid(parentId)) {
    //   return res.status(400).json({ message: "Invalid Parent ID" });
    // }

    // Validate object ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Object ID" });
    }

    // Perform deletion
    const updatedDoc = await Emp.findOneAndUpdate(
      { _id: id },
      { $inc: { upVotes: -1 }, $pull: { upVoteStack: { id: managerId } } },
      { new: true }
    );

    // Check if document was found and updated
    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Send response with updated document
    res.status(200).json(updatedDoc);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

//lets write get route to get the details of Manager Details
app.get("/getManager", async (req, res) => {
  try {
    const candCreds = await Mang.find({});
    res.status(200).json(candCreds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//let's write the code to update the details major update
app.put("/updateManagerReq/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const requiredStack = req.body.requiredStack;

  try {
    const updatedProject = await Mang.findOneAndUpdate(
      { id: projectId },
      { requiredStack: requiredStack },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//lets set up the dB connection first

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/jobWizard", {})
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(3000, () => {
      console.log("node api is runnin in 3000 port");
    });
  })
  .catch((error) => {
    console.log(error);
  });
