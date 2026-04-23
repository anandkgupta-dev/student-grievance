const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Student.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Student.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};