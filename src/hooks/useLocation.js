import {useEffect, useState} from 'react';

const DEFAULT_LOCATION = {
  latitude: 40,
  longitude: 74
};

const useLocation = () => {
  const [myLocation, setMyLocation] = useState(DEFAULT_LOCATION);

  useEffect(() => {
    navigator
      .geolocation
      .getCurrentPosition(({coords}) => setMyLocation(coords), console.error);
  }, []);

  return [myLocation, setMyLocation];
}

export default useLocation;
