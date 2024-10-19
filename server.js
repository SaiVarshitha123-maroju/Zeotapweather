const express = require("express");
const mongoose = require("mongoose");
const weatherService = require("./weatherService.js");
const alertService = require("./alertService.js");

const app = express();
const PORT = 9000;
const userConfig = {
  temperatureThreshold: 25, // degrees Celsius
  alertCount: 2, // for consecutive alerts
};
// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/weatherDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Fetch weather data every 5 minutes
setInterval(() => {
  weatherService.fetchAndProcessWeatherData();
}, 5 * 60 * 1000); // Every 5 minutes

// Alert check every 5 minutes
setInterval(() => {
  alertService.checkForAlerts(userConfig);
}, 5 * 60 * 1000); // Every 5 minutes

// Server listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
