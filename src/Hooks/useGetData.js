import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetData = (q, endpoint, days) => {
  //console.log('🚀 ~ file: useGetData.js ~ line 5 ~ useGetData ~ q', q);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL;

  const [data, setData] = useState([]);

  useEffect(() => {
    let ismounted = true;

    const dataFetcher = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${endpoint}`, {
          params: {
            key: API_KEY,
            q: q,
            aqi: 'yes',
            days: days || '',
          },
        });

        ismounted && setData([res.data]);
      } catch (error) {
        console.log('error', error);
      }
    };

    q && dataFetcher();

    return () => {
      ismounted = false;
    };
  }, [API_KEY, BASE_URL, q, endpoint, days]);

  return data;
};

export default useGetData;
