# Real-Time Data Processing System for Weather Monitoring

## Description

The **Real-Time Data Processing System for Weather Monitoring** is a Node.js application that continuously retrieves and processes weather data from the OpenWeatherMap API. Designed for major metropolitan areas in India, this system provides daily weather summaries, user-configurable alerts for specific conditions, and visualizations to enhance the understanding and accessibility of weather information.

## Features

- **Real-Time Weather Data Fetching**: Continuously fetches weather data every 5 minutes.
- **Daily Weather Summary Generation**: Aggregates data to provide average, maximum, and minimum temperatures, along with the dominant weather condition.
- **User-Configurable Alerts**: Allows users to set temperature thresholds and receive alerts for breaches.
- **Data Visualization**: Displays daily weather summaries and historical trends.
- **Scalable Architecture**: Easily extendable for additional weather parameters and features.

## Installation

To set up the project locally, follow these steps:

1.**Clone the repository**:

   git clone https://github.com/SaiVarshitha123-maroju/Zeotapweather.git
   
2.Navigate to the project directory:

  cd weather-monitoring-system
  
3.Install dependencies:
  npm install
  
4.Set up MongoDB:

  Ensure that MongoDB is installed and running on your machine. You can use the default connection string provided in the code (mongodb://localhost:27017/weatherDB).

5.Obtain OpenWeatherMap API Key:

  Sign up at OpenWeatherMap to obtain a free API key and configure it in your application.

6.Start the server:

  npm start
  
7.Usage:

  The application will start fetching weather data every 5 minutes. You can modify the user configuration for temperature thresholds directly in the code

8.Acknowledgments:

  OpenWeatherMap API for providing the weather data.
  Node.js, Express, and MongoDB for the backend architecture.

