import React, { useReducer, useState } from 'react';
import './App.css';
import TopBox from './components/TopBox';
import Map from './components/Map';
import Editor from './components/Editor';

function App() {
	const [markerList, setMarkerList] = useState([]);
	const getMarkerList = (markerList) => {
		setMarkerList(markerList);
	}
	return (
		<div className="App">
			<TopBox />
			<Map markerList={markerList}/>
			<Editor getMarkerList = {getMarkerList}/>
		</div>
	);
}

export default App;