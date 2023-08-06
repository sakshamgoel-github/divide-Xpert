const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const User = require("../models/user");
const { protect, isAuthorized } = require("../authMiddleware");

router.get("/", protect, async (req, res) => {
  try {
    const groups = req.user.groups;
    // Convert ObjectId references to strings
    const groupIds = groups.map(groupId => groupId.toString());
    
    // Fetch the group objects using the parsed _id values
    const groupObjects = await Group.find({ _id: { $in: groupIds } });

    return res.status(200).json(groupObjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", protect, isAuthorized, async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id).populate("members", "name");
    if (group == null) {
      return res.status(404).json({ message: "Cannot get the group" });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", protect, validateMembers, async (req, res) => {
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
    res.status(201).json({ id: group._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id/addUser",protect,isAuthorized, async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid member email found" });
    const group = await Group.findById(id);

    if (group.members.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "Member already exists in the group" });
    }

    user.groups.push(group);
    group.members.push(user);
    await user.save();
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id/leaveGroup", protect, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user._id;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Remove the user from the group's members
    group.members.pull(userId);
    await group.save();
    // Remove the group from the user's groups
    const user = await User.findById(userId);
    user.groups.pull(groupId);
    await user.save();
    res.status(200).json({ message: "Left the group successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id",protect,isAuthorized, async (req, res) => {
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
    members.push(req.user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  req.body.members = [...new Set(members)]; //assigning updated members [with no duplicates] to the request body
  next();
}
module.exports = router;