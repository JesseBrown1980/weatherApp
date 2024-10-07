import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.shortForecast}</h3>
        <ul>
            <div>
              {" "}
              <li className="cityHead">
                <img
                  className="temp"
                  src={props.defaultIcon}
                  alt="icon"
                />
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {props.windSpeed}
                </span>
              </li>
              <li>
                Wind Direction{" "}
                <span className="temp">
                  {props.windDirection}
                </span>
              </li>
              <li>
                Description{" "}
                <span className="temp">
                  <p>{props.detailedForecast}</p>
                </span>
              </li>
            </div>
        </ul>
      </div>
    </div>
  );
}
export default Forcast;
