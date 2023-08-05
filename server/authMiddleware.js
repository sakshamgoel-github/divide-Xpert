const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Group = require("./models/group");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];

      //Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "User not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const isAuthorized = async (req, res, next) => {
  const groupId = req.params.id;
  const userId = req.user._id; // Get the user's _id from req.user
  try {
    const group = await Group.findById(groupId);
    if (group == null) {
      return res.status(404).json({ message: "Cannot get the group" });
    }

    if (group.members.includes(userId)) {
      // User is authorized, proceed to the next middleware/route handler
      next();
    } else {
      // User is not authorized, send a 401 response
      res.status(401).json({ message: "Unauthorized user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { protect, isAuthorized };
