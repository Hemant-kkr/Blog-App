import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    isVerified: { type: Boolean, required: true, default: false },
    isBlocked: { type: Boolean, default: false, required: true },
    profile: {
      bio: { type: String },
      profilePhoto: { type: String },
      updatedAt: { type: Date },
    },
    isDeleted: { type: Boolean, default: false },
    lastLogin: { type: Date },
    loginCount: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    userSessions: [
      {
        deviceId: { type: String, required: true }, // Unique per device
        deviceType: { type: String }, // e.g. "Chrome on Windows"
        ip: { type: String }, // IP address of login
        refreshToken: { type: String, required: true }, // Can be hashed
        createdAt: { type: Date, default: Date.now }, // Login time
        lastUsedAt: { type: Date, default: Date.now }, // Updated on each request
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // Hash password if modified
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Hash each refreshToken if modified
  if (this.isModified("userSessions")) {
    for (let session of this.userSessions) {
      if (session.isModified?.("refreshToken")) {
        const salt = await bcrypt.genSalt(10);
        session.refreshToken = await bcrypt.hash(session.refreshToken, salt);
      }
    }
  }

  next();
});

const userModel = new model("User", userSchema);
export default userModel;
