import {useEffect, useState} from 'react';
import axios from 'axios';
import {GEONAMES_USERNAME} from '../config.json';
import useLocation from './useLocation';

if (!GEONAMES_USERNAME) {
  throw new Error(`Add your GEONAMES_USERNAME to config!`);
}

const useNearbyLocations = () => {
  const [location] = useLocation();
  const [nearbyLocations, setNearbyLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const {latitude, longitude} = location;

        const url = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${GEONAMES_USERNAME}&radius=10`;
        const response = await axios(url);

        const {
          data: {
            geonames = []
          } = {}
        } = response || {};

        setNearbyLocations(geonames);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLocations();
  }, [location]);

  return nearbyLocations;
}

export default useNearbyLocations;
