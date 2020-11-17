import React from 'react';
import { Grid } from '@material-ui/core';
import Location from './Location.js';
import WeatherIcon from 'react-icons-weather';
 
const WeatherComponent = (props) => {
  return (
      <Grid item xl={6} alignContent="center" justify="center" className="main-content">
        <div className="big-data">
          <WeatherIcon className="main-icon" name="owm" iconId={props.weather.icon.toString()} flip="horizontal" rotate="90" />
          <h2>
            {Math.round(props.weather.currentTemp)}&deg;
          </h2>
        </div>
      <Location description={props.weather.description} city={props.weather.city} country={props.weather.country} feels_like={props.weather.feelsLike}/>
    </Grid> 
  )
}

export default WeatherComponent; 