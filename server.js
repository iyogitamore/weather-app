const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

const apiKey = "2767cd7e348d4be89bb92755241107";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/weather", async (req, res) => {
  const { location } = req.query;
  try {
    const weatherResponse = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );
    res.json(weatherResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get("/forecast", async (req, res) => {
  const { location } = req.query;
  try {
    const forecastResponse = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
    );
    res.json(forecastResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
