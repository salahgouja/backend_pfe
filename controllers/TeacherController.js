const asyncHandler = require("express-async-handler");
const { Teacher } = require("../models/User");

// Get all teachers
const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

// Get a single teacher by ID
const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (teacher) {
    res.json(teacher);
  } else {
    res.status(404);
    throw new Error("Teacher not found");
  }
});

// Create a new teacher
const createTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, address, phoneNumber } = req.body;
  const teacher = await Teacher.create({
    name,
    email,
    password,
    address,
    phoneNumber,
  });
  res.status(201).json(teacher);
});

// Update a teacher
const updateTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, address, phoneNumber } = req.body;
  const teacher = await Teacher.findById(req.params.id);
  if (teacher) {
    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.password = password || teacher.password;
    teacher.address = address || teacher.address;
    teacher.phoneNumber = phoneNumber || teacher.phoneNumber;

    const updatedTeacher = await teacher.save();
    res.json(updatedTeacher);
  } else {
    res.status(404);
    throw new Error("Teacher not found");
  }
});

// Delete a teacher
const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (teacher) {
    await teacher.remove();
    res.json({ message: "Teacher removed" });
  } else {
    res.status(404);
    throw new Error("Teacher not found");
  }
});

module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
