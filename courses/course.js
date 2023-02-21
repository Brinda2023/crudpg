const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: String,
  },
  fees: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Course", courseSchema);
