const asyncHandler = require("express-async-handler");
const { SuperAdmin } = require("../models/user");

// Get all SuperAdmins
const getAllSuperAdmins = asyncHandler(async (req, res) => {
  const superadmins = await SuperAdmin.find({});
  res.json(superadmins);
});

// Get single SuperAdmin by ID
const getSuperAdminById = asyncHandler(async (req, res) => {
  const superadmin = await SuperAdmin.findById(req.params.id);
  if (superadmin) {
    res.json(superadmin);
  } else {
    res.status(404);
    throw new Error("SuperAdmin not found");
  }
});

// Create a SuperAdmin
const createSuperAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const superadminExists = await SuperAdmin.findOne({ email });

  if (superadminExists) {
    res.status(400);
    throw new Error("SuperAdmin already exists");
  }

  const superadmin = await SuperAdmin.create({
    name,
    email,
    password,
    role: "superadmin",
  });

  if (superadmin) {
    res.status(201).json({
      _id: superadmin._id,
      name: superadmin.name,
      email: superadmin.email,
      role: superadmin.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid SuperAdmin data");
  }
});

// Update a SuperAdmin by ID
const updateSuperAdminById = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const superadmin = await SuperAdmin.findById(req.params.id);

  if (superadmin) {
    superadmin.name = name || superadmin.name;
    superadmin.email = email || superadmin.email;
    superadmin.password = password || superadmin.password;

    const updatedSuperAdmin = await superadmin.save();

    res.json({
      _id: updatedSuperAdmin._id,
      name: updatedSuperAdmin.name,
      email: updatedSuperAdmin.email,
      role: updatedSuperAdmin.role,
    });
  } else {
    res.status(404);
    throw new Error("SuperAdmin not found");
  }
});

// Delete a SuperAdmin by ID
const deleteSuperAdminById = asyncHandler(async (req, res) => {
  const superadmin = await SuperAdmin.findById(req.params.id);

  if (superadmin) {
    await superadmin.remove();
    res.json({ message: "SuperAdmin removed" });
  } else {
    res.status(404);
    throw new Error("SuperAdmin not found");
  }
});

module.exports = {
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
  updateSuperAdminById,
  deleteSuperAdminById,
};
