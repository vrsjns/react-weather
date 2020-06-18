import {useEffect, useState} from 'react';
import axios from 'axios';
import useLocation from './useLocation';

const useAddress = () => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const url = `http://api.geonames.org/geoCodeAddressJSON?q=${address}&username=vrsjns`;
        const response = await axios(url);

        const {
          data: {
            address: {
              lat, lng
            } = {}
          } = {}
        } = response || {};

        const newLocation = lat && lng ?
          { latitude: lat, longitude: lng} :
          location;

        setLocation(newLocation);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAddress();
  }, [address]);

  return [address, setAddress];
}

export default useAddress;
