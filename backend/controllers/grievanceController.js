const Grievance = require("../models/Grievance");

// CREATE
exports.createGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.create({
      ...req.body,
      student: req.user,
    });

    res.status(201).json(grievance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getGrievances = async (req, res) => {
  const grievances = await Grievance.find({ student: req.user });
  res.json(grievances);
};

// GET BY ID
exports.getGrievanceById = async (req, res) => {
  const grievance = await Grievance.findById(req.params.id);
  res.json(grievance);
};

// UPDATE
exports.updateGrievance = async (req, res) => {
  const updated = await Grievance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE
exports.deleteGrievance = async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// SEARCH
exports.searchGrievance = async (req, res) => {
  const { title } = req.query;

  const result = await Grievance.find({
    title: { $regex: title, $options: "i" },
    student: req.user,
  });

  res.json(result);
};