import {useEffect, useState} from 'react';
import axios from 'axios';
import { OPEN_WHEATHER_APP_ID } from '../config.json';
import useNearbyLocations from './useNearbyLocations';

if (!OPEN_WHEATHER_APP_ID) {
  throw new Error(`Add your OPEN_WHEATHER_APP_ID to config!`);
}

const useWeather = () => {
  const nearbyLocations = useNearbyLocations();

  const [weathers, setWeathers] = useState([]);

  useEffect(() => {
    const fetchWeather = async ({lat, lng}) => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPEN_WHEATHER_APP_ID}`;
        const response = await axios(url);

        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    const results = nearbyLocations.map(location => fetchWeather(location));
    Promise.all(results).then(values => setWeathers(values));
  }, [nearbyLocations]);

  return weathers;
}

export default useWeather;
