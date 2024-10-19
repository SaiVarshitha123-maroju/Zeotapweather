const Weather = require("./weatherModel.js");

const tempThreshold = 35; // Threshold for temperature alerts

// Function to check for temperature alerts
async function checkForAlerts() {
  const recentWeatherData = await Weather.find().sort({ time: -1 }).limit(2);

  if (recentWeatherData.length < 2) {
    console.log("Not enough data to check for alerts");
    return;
  }

  // Check if temperature exceeds threshold for two consecutive updates
  if (
    recentWeatherData[0].temp > tempThreshold &&
    recentWeatherData[1].temp > tempThreshold
  ) {
    console.log(
      `Alert! Temperature exceeded ${tempThreshold}°C for two consecutive updates.`
    );
    // Trigger email or console alert here
  }
}

module.exports = { checkForAlerts };
