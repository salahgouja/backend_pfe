const asyncHandler = require("express-async-handler");
const { Admin } = require("../models/user");

// @desc    Get all admins
// @route   GET /api/admins
// @access  Private/Admin
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({});
  res.json(admins);
});

// @desc    Get a single admin by ID
// @route   GET /api/admins/:id
// @access  Private/Admin
const getAdminById = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (admin) {
    res.json(admin);
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

// @desc    Update an admin
// @route   PUT /api/admins/:id
// @access  Private/Admin
const updateAdmin = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const admin = await Admin.findById(req.params.id);

  if (admin) {
    admin.name = name || admin.name;
    admin.email = email || admin.email;

    const updatedAdmin = await admin.save();

    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

module.exports = { getAdmins, getAdminById, updateAdmin };
