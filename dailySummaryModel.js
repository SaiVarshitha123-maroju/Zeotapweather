// dailySummaryModel.js
const mongoose = require("mongoose");

const dailySummarySchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  averageTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  dominantCondition: String,
});

const DailySummary = mongoose.model("DailySummary", dailySummarySchema);
module.exports = DailySummary;
