require("dotenv").config({ path: "./backend/.env" });
require("dotenv").config();

const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const User = require("../models/User");

const adminsData = [
  {
    name: "Main Administrator",
    email: "admin@institution.edu",
    password: "Admin@123",
    role: "admin",
    department: "Administration & IT Security",
    is_active: true,
  },
  {
    name: "Dr. Rupesh Kumar",
    email: "rupesh.admin@institution.edu",
    password: "Admin@123",
    role: "admin",
    department: "Student Affairs & Counseling",
    is_active: true,
  },
];

const studentsData = [
  {
    name: "Rohit Sharma",
    email: "rohit.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU001",
    department: "Information Technology",
    is_active: true,
  },
  {
    name: "Priya Patil",
    email: "priya.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU002",
    department: "Computer Engineering",
    is_active: true,
  },
  {
    name: "Amit Verma",
    email: "amit.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU003",
    department: "Mechanical Engineering",
    is_active: true,
  },
  {
    name: "Sneha Kulkarni",
    email: "sneha.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU004",
    department: "Civil Engineering",
    is_active: true,
  },
  {
    name: "Vikas Yadav",
    email: "vikas.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU005",
    department: "Electrical Engineering",
    is_active: true,
  },
  {
    name: "Neha Joshi",
    email: "neha.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU006",
    department: "Information Technology",
    is_active: true,
  },
  {
    name: "Akash Singh",
    email: "akash.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU007",
    department: "Artificial Intelligence",
    is_active: true,
  },
  {
    name: "Pooja More",
    email: "pooja.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU008",
    department: "Computer Engineering",
    is_active: true,
  },
  {
    name: "Rahul Gupta",
    email: "rahul.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU009",
    department: "Mechanical Engineering",
    is_active: true,
  },
  {
    name: "Kavita Deshmukh",
    email: "kavita.student@example.com",
    password: "Student@123",
    role: "student",
    student_id: "STU010",
    department: "Civil Engineering",
    is_active: true,
  },
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding...");

    // 1. Seed Admins
    console.log("\n--- Seeding Admins ---");
    for (const admin of adminsData) {
      await User.findOneAndUpdate(
        { email: admin.email },
        { $set: admin },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Saved Admin: ${admin.name} (${admin.email})`);
    }

    // 2. Seed Students
    console.log("\n--- Seeding Students ---");
    for (const student of studentsData) {
      await User.findOneAndUpdate(
        { email: student.email },
        { $set: student },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Saved Student: ${student.name} (${student.student_id})`);
    }

    const adminCount = await User.countDocuments({ role: "admin" });
    const studentCount = await User.countDocuments({ role: "student" });
    const total = await User.countDocuments();

    console.log(`\n=== Seeding Completed ===`);
    console.log(`Admins in Database: ${adminCount}`);
    console.log(`Students in Database: ${studentCount}`);
    console.log(`Total Users in Database: ${total}`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
