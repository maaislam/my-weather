import React, { useState, useContext, useEffect } from 'react';
import { SearchSuccessContext } from '../context/SearchSuccessContext';
import { SearchTermContext } from '../context/SearchTermContext';
import { WeatherContext } from '../context/WeatherContext';

const SearchCity = () => {
  const [input, setInput] = useState('');

  const { setSearchTerm } = useContext(SearchTermContext);
  const { weather, setWeather } = useContext(WeatherContext);
  const { searchSuccess, setSearchSuccess } = useContext(SearchSuccessContext);

  const onInputChange = (e) => {
    setInput(e.target.value);
    setSearchSuccess(false);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchTerm(input);
    }, 1000);

    weather && setInput('');

    return () => {
      setWeather(false);
      clearTimeout(timerId);
    };
  }, [input, setSearchTerm, weather, setWeather]);

  return (
    <>
      <div className='ui fluid icon input loading'>
        <input
          type='text'
          placeholder='Search...'
          value={input}
          onChange={onInputChange}
        />
        {!searchSuccess && input ? <i className='search icon'></i> : null}
      </div>
    </>
  );
};

export default SearchCity;
