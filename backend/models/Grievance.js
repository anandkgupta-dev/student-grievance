const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Academic", "Hostel", "Transport", "Other"],
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
}, { timestamps: true });

module.exports = mongoose.model("Grievance", grievanceSchema);