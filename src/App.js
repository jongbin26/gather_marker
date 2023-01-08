import React, { useReducer, useState, useEffect } from 'react';
import './App.css';
import TopBox from './components/TopBox';
import Map from './components/Map';
import Editor from './components/Editor';

function App() {
	const [markerList, setMarkerList] = useState([]);
	const [deleteMarker, setDeleteMarker] = useState('');
	const getMarkerList = (markerList) => {
		setMarkerList(markerList);
	};
	function setScreenSize() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
	useEffect(() => {
		setScreenSize();
	});
	return (
		<div className="App">
			<TopBox />
			<Map markerList={markerList} />
			<Editor getMarkerList={getMarkerList} />
		</div>
	);
}

export default App;