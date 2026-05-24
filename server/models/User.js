import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["beginner", "professional"], default: "beginner" },
    bio: { type: String, default: "" },
    skills: [{ type: String, trim: true }],
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    resume: { type: String, default: "" },
    lookingFor: {
      type: String,
      enum: ["mentor", "teammate", "project", ""],
      default: ""
    },
    createdProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    joinedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
