const { validator } = require("../../joi/user.joi");
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const body = req.body;
  console.log(body)

  const { value, error } = validator(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // const existingUser = await User.findOne({ email: value.email });
  // if (existingUser) {
  //   return res.status(400).json({ message: "User already exists" });
  // }

  try {
    const hashedPassword = await bcrypt.hash(value.password, 10);

    const newUser = new User({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      message: "User created successfully",
      data: { email: newUser.email }
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = signup;