import React, { Component } from 'react';
import './App.css';
import axios from 'axios'; 
import { baseUrl, apiKey } from './shared/constants.js';
import WeatherComponent from './components/WeatherConditions.js';
import DetailedInfo from './components/DetailedInfo.js';
import Search from './components/SearchComponent.js'
import { Grid, Table, TableRow, TableBody, TableCell, Button } from '@material-ui/core';
import ls from 'local-storage';


class App extends Component {

  constructor(props){
    super(props); 
    this.state = {
      activeCity: null,
      cities: [],
      city: "Montevideo",
      country: '',
      windSpeed: '', 
      windDirection:'', 
      currentTemp: '',
      description: '',
      feelsLike: '',
      low: '',
      high: '',  
      humidity: '',
      sunrise: '',
      sunset: '',
      icon: 800, 
      iconIndicator: '',
      iconDescription: '',
      temperatureClass: "perfect"
    };

    this.getWeather = this.getWeather.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveCity = this.handleSaveCity.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  async componentDidMount() {
    await this.getWeather(this.state.city);
  }
  
  handleSaveCity = city => {
    let currentCities = this.state.cities.slice(0);
  
    if (!this.state.cities.includes(city)) {
      let newCities = [...currentCities, city];

      this.setState({
        cities: newCities,
      });
  
      ls.set('cities', newCities);
    }
  };

  handleRemoveItem = city => { 
    let currentCities = this.state.cities.slice(0);
  
    if (this.state.cities.includes(city)) {
      let newCities = currentCities.filter(a => a !== city);

      this.setState({
        cities: newCities,
      });
  
      ls.set('cities', newCities);
    }
  };

	handleChange(e) {
		e.preventDefault();
		this.setState({
			activeCity: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
    this.getWeather(this.state.activeCity);
    this.setState({
			activeCity: ''
		});
  }
  
  async getWeather(cityName) {
		this.setState({ loading: true });
		const locationUrl = baseUrl + `q=${cityName}&appid=` + apiKey;
		axios
			.get(locationUrl)
			.then(result => {
				const info = result.data;
				this.setState({
          city: info.name, 
          country: info.sys.country,
          windSpeed:info.wind.speed, 
          windDirection:info.wind.deg, 
          currentTemp:info.main.temp, 
          humidity: info.main.humidity,
          description: info.weather.description, 
          feelsLike: info.main.feels_like,
          low: info.main.temp_min,
          high: info.main.temp_max,
          sunrise: info.sys.sunrise,
					sunset: info.sys.sunset,
          icon: info.weather[0].id.toString(), 
          iconIndicator: info.weather[0].main, 
          iconDescription: info.weather[0].description
        });
        this.setTemperatureClass();
        this.handleSaveCity(this.state.city);
			})
			.catch(err => {
				alert('Ciudad no encontrada: ' + err.message);
			});
  }
  
  setTemperatureClass() {
		let temp = this.convertTemperature();
		if (temp >= 100) {
			this.setState({
				temperatureClass: 'boiling'
			});
		}
		if (temp < 100 && temp >= 85) {
			this.setState({
				temperatureClass: 'hot'
			});
		}
		if (temp < 85 && temp >= 65) {
			this.setState({
				temperatureClass: 'warm'
			});
		}
		if (temp < 65 && temp >= 50) {
			this.setState({
				temperatureClass: 'perfect'
			});
		}
		if (temp < 50 && temp >= 32) {
			this.setState({
				temperatureClass: 'cool'
			});
		}
		if (temp < 32) {
			this.setState({
				temperatureClass: 'freezing'
			});
		}
  }
  
  convertTemperature() {
		return (this.state.currentTemp * 9) / 5 + 32;
	}

render() {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={this.state.temperatureClass}
          id="main">
          <Grid item xs={12} md={8}>
          <Search
							handleSubmit={this.handleSubmit}
							handleChange={this.handleChange}
							activeCity={this.state.activeCity}
						/>
            <WeatherComponent weather={this.state}/>
            <DetailedInfo
              high={this.state.high}
              low={this.state.low}
              sunrise={this.state.sunrise}
              sunset={this.state.sunset}
              windSpeed={this.state.windSpeed}
              humidity={this.state.humidity}
            />
            <div>
            <h5 className="main-content">Recientemente buscadas</h5>
              <Table className="cities-details">
                <TableBody>
                {
                  this.state.cities.map((city, index) => (
                    <TableRow key={index}>
                      <TableCell className="cell-data" onClick={() => this.getWeather(city)} >
                        {city}
                      </TableCell>
                      <TableCell className="cell-data">
                        <Button color="secondary" onClick={() => this.handleRemoveItem(city)}>Eliminar ciudad</Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Grid>
      );
  }
}

export default App;