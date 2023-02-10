const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  duration: {
    type: String,
  },
  summary: {
    type: string,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
