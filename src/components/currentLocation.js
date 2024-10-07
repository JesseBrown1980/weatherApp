import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "../images/WeatherIcons.gif";
import {getWeather} from "../api/getWeather";
const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const Weather = () => {
  const [name, setName] = useState();
  const [temperatureC, setTemperatureC] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [windDirection, setWindDirection] = useState();
  const [defaultIcon, setDefaultIcon] = useState();
  const [detailedForecast, setDetailedForecast] = useState();
  const [shortForecast, setShortForecast] = useState();
  const [icon, setIcon] = useState("CLEAR_DAY");

  const [isExist, setIsExist] = useState();
  const [index, setIndex] = useState(0);
  const [forecastData, setForecastData] = useState([]);
  const [nameConditions, setNameConditions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getWeather(31, 80);
      setIsExist(data.properties.periods.length > 0);
      setForecastData(data.properties.periods)
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    if(forecastData.length > 0) {
      setName(forecastData[index].name);
      setTemperatureC(fahrenheitToCelsius(forecastData[index].temperature));
      setWindSpeed(forecastData[index].windSpeed);
      setWindDirection(forecastData[index].windDirection);
      setDefaultIcon(forecastData[index].icon);
      setDetailedForecast(forecastData[index].detailedForecast);
      setShortForecast(forecastData[index].shortForecast);
      updateIcon(forecastData[index].shortForecast);

      const uniqueConditions = [
        ...new Set(forecastData.map((item) => item.name)),
      ];
      setNameConditions(uniqueConditions);
    }
  }, [index, forecastData])

  
  const updateIcon = (shortForecast) => {
    switch (shortForecast) {
      case "Clear":
        setIcon("CLEAR_DAY");
        break;
      case "Partly Cloudy":
        setIcon("CLOUDY");
        break;
      case "Rain":
        setIcon("RAIN");
        break;
      case "Snow":
        setIcon("SNOW");
        break;
      case "Dust":
        setIcon("WIND");
        break;
      case "Drizzle":
        setIcon("SLEET");
        break;
      case "Fog":
      case "Smoke":
        setIcon("FOG");
        break;
      case "Tornado":
        setIcon("WIND");
        break;
      default:
        setIcon("CLEAR_DAY");
    }
  };
  
  const fahrenheitToCelsius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5 / 9);
  }

  const handleWeatherChange = (e) => {
    const selectedWeather = e.target.value;

    setIndex(e.target.selectedIndex);
    setName(selectedWeather);
    updateIcon(selectedWeather);
  };

  return isExist ? (
    <>
      <div className="weather">
        <div className="title">
          <select onChange={handleWeatherChange} value={name} >
            {nameConditions.map((condition, index) => (
              <option key={index} value={condition} className="foreacast-date">
                {condition}
              </option>
            ))}
          </select>
        </div>
        <div className="date-time">
          <div className="dmy">
            <div id="txt"></div>
            <div className="current-time">
              <Clock format="HH:mm:ss" interval={1000} ticking={true} />
            </div>
            <div className="current-date">{dateBuilder(new Date())}</div>
          </div>
          <div className="temperature">
            <p>
              {temperatureC}°<span>C</span>
            </p>
          </div>
        </div>
      </div>
      <Forcast icon={icon} defaultIcon={defaultIcon} name={name} windSpeed={windSpeed} windDirection={windDirection} shortForecast={shortForecast} detailedForecast={detailedForecast}  />
    </>
  ) : (
    <>
      <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} alt="default"/>
      <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
        Detecting your location
      </h3>
      <h3 style={{ color: "white", marginTop: "10px" }}>
        Your current location will be displayed on the App <br></br> & used for
        calculating Real-time weather.
      </h3>
    </>
  );
};

export default Weather;