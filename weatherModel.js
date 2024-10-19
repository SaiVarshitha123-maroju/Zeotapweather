const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city: String,
  temp: Number,
  feels_like: Number,
  main: String,
  time: Date,
});

const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
