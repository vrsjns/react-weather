import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Search } from './components/Search';
import useWeather from './hooks/useWeathers';

function App() {
  const weathers = useWeather();

  return (
    <div className="App">
      <header className="App-header">
        <Search/>
        <hr/>
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {
            weathers
              .reduce((accumulator, currentValue) => {
                const found = accumulator.find(element => element.id === currentValue.id);
                return found ? accumulator : [...accumulator, currentValue];
              }, [])
              .map(wheather => <li key={Math.random()}>{wheather.name}: {wheather.main.temp}</li>)
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
