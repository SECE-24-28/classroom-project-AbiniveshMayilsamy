const User = require("../models/User");

let users = [];

exports.register = async (req, res) => {
  try {
    const { name, email, password, rollNo, className, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const user = new User({
        name,
        email,
        password,
        rollNo,
        className,
        role: role || "student",
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    } catch (dbError) {
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const user = {
        _id: Date.now().toString(),
        name,
        email,
        password,
        rollNo,
        className,
        role: role || "student",
      };

      users.push(user);
      res.status(201).json({ message: "User registered successfully", user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.status(200).json({ message: "Login successful", user });
    } catch (dbError) {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.status(200).json({ message: "Login successful", user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    try {
      const dbUsers = await User.find();
      res.status(200).json(dbUsers);
    } catch (dbError) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
