const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const groups = await Group.find().populate("members","name");
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const group = await Group.findById(id).populate("members","name");
    if (group == null) {
      return res.status(404).json({ message: "Cannot get the group" });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", validateMembers, async (req, res) => {
  const newGroup = new Group({
    name: req.body.name,
    members: req.body.members,
  });
  try {
    const group = await newGroup.save();
    for (let index = 0; index < group.members.length; index++) {
      const user = req.body.members[index];
      user.groups.push(group);
      await user.save();
    }
    res.status(201).json({id:group._id});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id/addUser/:userId", async (req, res) => {
  const { id, userId } = req.params;
  try {
    const user = await User.findById(userId);
    const group = await Group.findById(id);
    user.groups.push(group);
    group.members.push(user);
    await user.save();
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/deleteUser/:userId", async (req, res) => {
  const { userId, id } = req.params;
  try {
    const user = await User.findById(userId);
    const group = await Group.findById(id);
    user.groups.remove(id);
    await user.save();
    group.members.remove(userId);
    if (group.members.length == 0) {
      await Group.findByIdAndDelete(id);
      return res.status(204).json({ message: "Group deleted" });
    }
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    for (let index = 0; index < group.members.length; index++) {
      const user = await User.findById(group.members[index]);
      user.groups.remove(id);
      await user.save();
    }
    await Group.findByIdAndDelete(id);
    res.status(202).json({ message: "Group Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function validateMembers(req, res, next) {
  let { members } = req.body;
  members = [...new Set(members)]; //removing duplicate members from array of members
  try {
    for (let i = 0; i < members.length; i++) {
      const memberEmail = members[i];
      const m = await User.findOne({ email: memberEmail });
      if (!m) {
        return res.status(404).json({ message: "Invalid member email found" });
      }
      members[i] = m;
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  req.body.members = members; //assigning updated members [with no duplicates] to the request body
  next();
}
module.exports = router;
