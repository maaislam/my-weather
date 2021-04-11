import React, { useContext, useEffect } from 'react';
import { SelectedCityContext } from '../context/SelectedCityContext';
import { WeatherContext } from '../context/WeatherContext';

import { pollutionIndexUsa } from '../Data/colorConfig';

import useGetData from '../Hooks/useGetData';
const ShowWeather = () => {
  const { city } = useContext(SelectedCityContext);
  const { setWeather } = useContext(WeatherContext);

  const weatherInfo = useGetData(city, '/current.json');

  //console.log('weatherData', weatherData);

  useEffect(() => {
    let mounted = true;

    if (mounted && weatherInfo.length > 0) {
      setWeather(true);
    }

    return () => {
      mounted = false;
    };
  }, [setWeather, weatherInfo]);

  const renderData = () => {
    if (weatherInfo.length > 0) {
      const {
        condition,
        air_quality,
        feelslike_c,
        gust_kph,
        temp_c,
        wind_dir,
        wind_kph,
      } = weatherInfo[0].current;

      const { name, country, localtime } = weatherInfo[0].location;

      const airQIndex = pollutionIndexUsa[air_quality['us-epa-index']];

      return (
        <div className='ui container mt-16'>
          <div className='ui header segment'>
            Current Weather in {name}, {country} at{' '}
            <span className='ui sub header'>{localtime}</span>
          </div>{' '}
          <div className='ui cards'>
            <div className='card'>
              <div className='content'>
                <img
                  className='item'
                  src={condition.icon}
                  alt={condition.text}
                />
                <span className='item'>
                  <h1> {temp_c}°C</h1>
                </span>
              </div>
              <div className='content'>
                <h4 className='item'>FeelsLike: {feelslike_c}°C</h4>
                <h4 className='item'>Condition: {condition.text}</h4>
              </div>
            </div>
            <div className='card'>
              <div className='content'>
                <h4 className='item'>
                  Air Quality:{' '}
                  <span className={`ui sub header ${airQIndex.color}`}>
                    {airQIndex.condition}
                  </span>
                  <span className='ui header'> {airQIndex.emoji}</span>
                </h4>
                <h4 className='item'>
                  Wind: {wind_dir} {wind_kph} km/h
                </h4>
                <h4 className='item'>Wind Gusts: {gust_kph} km/h</h4>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return <>{renderData()}</>;
};

export default ShowWeather;
