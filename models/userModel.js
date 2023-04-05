const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },

  {
    role: {
      type: String,
      enum: ["user", "superadmin", "admin", "teacher"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const superadminModel = new mongoose.Schema({});
const SuperAdmin = userSchema.discriminator("SuperAdmin", superadminModel);

const adminModel = new mongoose.Schema({});
const Admin = userSchema.discriminator("Admin", adminModel);

const NormalUserModel = new mongoose.Schema({
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
});
const NormalUser = userSchema.discriminator("NormalUser", NormalUserModel);

const teacherModel = new mongoose.Schema({
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
});
const Teacher = userSchema.discriminator("teacher", teacherModel);

module.exports = { SuperAdmin, Admin, NormalUser, Teacher };
