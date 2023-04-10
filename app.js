const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use("/css", express.static(__dirname + "/css"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const units = "imperial";
  const apiKey = "ed875120674dc7d8877c0e65a89b44a4";
  const query = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    apiKey;
  https.get(url, function (response) {
    console.log(response);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<p style=font-family:sans-serif;><p style= margin-top:60px;><p style= text-align:center;>The weather description in " +
          query +
          " is " +
          description +
          "</p>"
      );
      res.write(
        "<body style= background-color:#0a67ca;><h1 style=color:white><h1 style=text-align:center;>The temperature in " +
          query +
          " is " +
          temp +
          " degrees fahrenheit.</h1>"
      );
      res.write("<img style=margin-left:50%;> <img src=" + imageURL + ">");

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("port is running on port 3000");
});
