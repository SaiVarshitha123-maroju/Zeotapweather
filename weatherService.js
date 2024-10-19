const axios = require("axios");
const Weather = require("./weatherModel.js");
const DailySummary = require("./dailySummaryModel.js");

const apiKey = "390595bf5c5a55c3e8a7cd31342f77c3"; // OpenWeatherMap API key
const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

// Function to fetch weather data for each city
async function fetchAndProcessWeatherData() {
  for (const city of cities) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      processWeatherData(city, data);
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
    }
  }
  await calculateDailySummary();
}

// Function to process and save weather data
function processWeatherData(city, data) {
  const kelvinToCelsius = (tempK) => (tempK - 273.15).toFixed(2);
  const weatherSummary = {
    city: city,
    temp: kelvinToCelsius(data.main.temp),
    feels_like: kelvinToCelsius(data.main.feels_like),
    main: data.weather[0].main,
    time: new Date(data.dt * 1000), // Convert UNIX timestamp to Date
  };

  // Save data to MongoDB
  const weather = new Weather(weatherSummary);
  weather
    .save()
    .then(() => {
      console.log(`Weather data saved for ${city}`);
    })
    .catch((err) => {
      console.error("Error saving weather data:", err);
    });
}

// Function to calculate daily rollups and aggregates
async function calculateDailySummary() {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));

  const weatherData = await Weather.find({ time: { $gte: startOfDay } });

  if (weatherData.length === 0) {
    console.log("No data available for today");
    return;
  }

  const dailySummary = {
    averageTemp: (
      weatherData.reduce((sum, record) => sum + parseFloat(record.temp), 0) /
      weatherData.length
    ).toFixed(2),
    maxTemp: Math.max(...weatherData.map((record) => parseFloat(record.temp))),
    minTemp: Math.min(...weatherData.map((record) => parseFloat(record.temp))),
    dominantCondition: calculateDominantWeatherCondition(weatherData),
  };

  // Call the saveDailySummary function here
  await saveDailySummary(dailySummary);
}

// Your saveDailySummary function goes here
async function saveDailySummary(dailySummary) {
  const summary = new DailySummary({
    date: new Date(), // Store the current date
    averageTemp: dailySummary.averageTemp,
    maxTemp: dailySummary.maxTemp,
    minTemp: dailySummary.minTemp,
    dominantCondition: dailySummary.dominantCondition,
  });

  await summary.save();
  console.log("Daily summary saved:", summary);
}

// Helper function to calculate dominant weather condition
function calculateDominantWeatherCondition(weatherData) {
  const conditionCounts = weatherData.reduce((counts, record) => {
    counts[record.main] = (counts[record.main] || 0) + 1;
    return counts;
  }, {});

  return Object.keys(conditionCounts).reduce((a, b) =>
    conditionCounts[a] > conditionCounts[b] ? a : b
  );
}

module.exports = { fetchAndProcessWeatherData, calculateDailySummary };
