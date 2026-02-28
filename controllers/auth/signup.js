const { validator } = require("../../joi/user.joi");
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const body = req.body;
  console.log(body);

  const { value, error } = validator(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if user already exists (Good practice to add this)
    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const newUser = new User({
      fullName: value.fullName,
      email: value.email,
      password: hashedPassword,
      role: value.role,
    });

    await newUser.save();

    return res.status(200).json({
      message: "User created successfully",
      data: {
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = signup;
