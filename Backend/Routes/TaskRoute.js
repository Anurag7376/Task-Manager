import express from "express";
import { errorHandler } from "../utils/Error.js";
import User from "../models/UserModel.js";


const router = express.Router();


router.get("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        const tasks = user.tasks;
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }
        res.status(200).json(tasks);
    } catch (error) {
        errorHandler(error, res);
    }
});





// router.post("/tasks/:id", async (req, res) => {

//     const id = req.params.id;
//         const tasks = req.body;
//         if (!tasks.description || !tasks.priority || !tasks.status) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//     try {
//         const user=await User.findOneAndUpdate(
//             { _id: id },
//             { $push: { tasks: tasks } },
//             { new: true, runValidators: true }
//         );
        
//         res.status(201).json({ message: "Task created successfully", user});
//     } catch (error) {
//         errorHandler(error, res);
//     }
// });









router.post("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { description, priority, status } = req.body;

 
  if (!description || !priority || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $push: { tasks: { description, priority, status } } },
      { new: true, runValidators: true }
    ).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "Task created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the task" });
  }
});








export default router;