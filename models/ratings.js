const mongoose = require("mongoose");
const userRating = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Anime id required"],
  },
  email: {
    type: String,
    required: [true, "user email required"],
  },
  rating: {
    type: Number,
  },
  Avgrating: {
    type: Number,
  },
  description: {
    type: String,
  },
});
const ratings = mongoose.model("ratings", userRating);
module.exports = ratings;
