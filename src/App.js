import React, { useReducer } from 'react';
import './App.css';
import TopBox from './components/TopBox';
import Map from './components/Map'
import InputBox from './components/InputBox'

function App() {
  return (
    <div className="App">
		  <TopBox/>
		  <Map/>
		  <InputBox/>
    </div>
  );
}

export default App;