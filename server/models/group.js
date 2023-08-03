const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("Group", groupSchema);
