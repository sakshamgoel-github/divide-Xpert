const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/user",async (req,res) => {
  try {
    const users =await User.find();
    res.json(users);
} catch (error) {
    res.status(500).json({message:error.message});
}
})

router.get("/user/:id", getUser, (req, res) => {
  res.json(res.user);
});

router.post("/register", async (req, res) => {
  const { name, email, groups } = req.body;
  const newUser = new User({ name, email, groups });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id).populate("groups");
    if (user == null) {
      return res.status(404).json({ message: "Cannot get the user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
