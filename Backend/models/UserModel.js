import mongoose from "mongoose";





const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  { _id: false } 
);



const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: {
      type: [taskSchema],
      default: [],
    },
  
  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);
export default User;