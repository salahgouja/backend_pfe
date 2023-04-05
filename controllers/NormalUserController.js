const NormalUser = require("../models/user").NormalUser;
const asyncHandler = require("express-async-handler");

// GET /normalusers
const getAllNormalUsers = asyncHandler(async (req, res) => {
  const normalUsers = await NormalUser.find();
  res.json(normalUsers);
});

// GET /normalusers/:id
const getNormalUserById = asyncHandler(async (req, res) => {
  const normalUser = await NormalUser.findById(req.params.id);
  if (!normalUser) {
    res.status(404);
    throw new Error("NormalUser not found");
  }
  res.json(normalUser);
});

// POST /normalusers
const createNormalUser = asyncHandler(async (req, res) => {
  const { name, email, password, address, phoneNumber } = req.body;
  const normalUser = new NormalUser({
    name,
    email,
    password,
    address,
    phoneNumber,
  });
  const createdNormalUser = await normalUser.save();
  res.status(201).json(createdNormalUser);
});

// PUT /normalusers/:id
const updateNormalUser = asyncHandler(async (req, res) => {
  const { name, email, password, address, phoneNumber } = req.body;
  const normalUser = await NormalUser.findById(req.params.id);
  if (!normalUser) {
    res.status(404);
    throw new Error("NormalUser not found");
  }
  normalUser.name = name || normalUser.name;
  normalUser.email = email || normalUser.email;
  normalUser.password = password || normalUser.password;
  normalUser.address = address || normalUser.address;
  normalUser.phoneNumber = phoneNumber || normalUser.phoneNumber;
  const updatedNormalUser = await normalUser.save();
  res.json(updatedNormalUser);
});

// DELETE /normalusers/:id
const deleteNormalUser = asyncHandler(async (req, res) => {
  const normalUser = await NormalUser.findById(req.params.id);
  if (!normalUser) {
    res.status(404);
    throw new Error("NormalUser not found");
  }
  await normalUser.remove();
  res.json({ message: "NormalUser removed" });
});

module.exports = {
  getAllNormalUsers,
  getNormalUserById,
  createNormalUser,
  updateNormalUser,
  deleteNormalUser,
};
