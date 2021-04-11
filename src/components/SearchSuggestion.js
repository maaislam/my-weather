import React, { useContext, useState, useEffect } from 'react';

import { SearchSuccessContext } from '../context/SearchSuccessContext';

import { SearchTermContext } from '../context/SearchTermContext';

import { SelectedCityContext } from '../context/SelectedCityContext';

import useGetData from '../Hooks/useGetData';

const SearchSuggestion = () => {
  const { setCity } = useContext(SelectedCityContext);

  const { setSearchSuccess } = useContext(SearchSuccessContext);

  const { searchTerm } = useContext(SearchTermContext);

  const [hidden, setHidden] = useState(null);

  const clickHandler = (item) => {
    setCity(item.name.split(',')[0]);
    setHidden(true);
    // setWeather(false);
  };

  const citySuggestion = useGetData(searchTerm, '/search.json');

  useEffect(() => {
    if (citySuggestion) {
      setHidden(false);
      setSearchSuccess(true);
    }

    return () => {
      setHidden(true);
    };
  }, [citySuggestion, setSearchSuccess]);

  const renderData =
    citySuggestion[0] &&
    citySuggestion[0].map((item, index) => {
      return (
        <div
          className='content  cursor-pointer'
          key={index}
          onClick={() => clickHandler(item)}
        >
          {' '}
          <span className='link item'> {item.name}</span>{' '}
        </div>
      );
    });

  const renderList = () => {
    if (!hidden && searchTerm) {
      return (
        <div
          className='ui card'
          style={{
            position: 'absolute',
            left: '0px',
            top: '100px',
            zIndex: 10,
          }}
        >
          {' '}
          {renderData}
        </div>
      );
    } else {
      return null;
    }
  };

  return renderList();
};

export default SearchSuggestion;
