import React from 'react';
import ShowWeather from './components/ShowWeather';
import SearchCity from './components/SearchCity';
import SelectedCityContextProvider from './context/SelectedCityContext';
import SearchSuggestion from './components/SearchSuggestion';
import SearchTermContextProvider from './context/SearchTermContext';
import WeatherContextProvider from './context/WeatherContext';
import SearchSuccessContextProvider from './context/SearchSuccessContext';

const App = () => {
  return (
    <div className='ui segment container' style={{ position: 'relative' }}>
      <h1 className='ui header'>My Weather App</h1>
      <SearchTermContextProvider>
        <SearchSuccessContextProvider>
          <SelectedCityContextProvider>
            <WeatherContextProvider>
              <SearchCity />
              <SearchSuggestion />
              <ShowWeather />
            </WeatherContextProvider>
          </SelectedCityContextProvider>
        </SearchSuccessContextProvider>
      </SearchTermContextProvider>
    </div>
  );
};

export default App;
