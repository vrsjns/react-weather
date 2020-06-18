import React from 'react';
import { throttle } from 'lodash';

import useAddress from '../hooks/useAddress';

const Search = () => {
  const [address, setAddress] = useAddress();

  const handleInput = event => setAddress(event.target.value);
  const handleInputThrottled = throttle(handleInput, 300);

  return (
    <input value={address} onChange={ handleInputThrottled }/>
  )
}

export { Search };
