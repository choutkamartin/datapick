import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
    default: "/images/avatar.png",
  },
  password: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    value: {
      type: String,
    },
    expiresAt: {
      type: Date,
      default: Date.now(),
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  recoveryToken: {
    value: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
  },
});
export default mongoose.models.User || mongoose.model("User", userSchema);
