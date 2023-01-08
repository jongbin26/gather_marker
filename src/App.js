import React, { useReducer, useState, useEffect } from 'react';
import './App.css';
import TopBox from './components/TopBox';
import Map from './components/Map';
import Editor from './components/Editor';

function App() {
	const [markerList, setMarkerList] = useState([]);
	const [deleteMarker, setDeleteMarker] = useState('');
	const [type, setType] = useState("first");
	const getMarkerList = (markerList) => {
		setMarkerList(markerList);
	};
	const setChangeType = (type) => {
		if (type === "second"){
			setType("second");
		}else{
			setType("first");
		}
	}
	return (
		<div className="App">
			<TopBox setChangeType={setChangeType}/>
			<Map markerList={markerList}/>
			<Editor getMarkerList={getMarkerList} type={type}/>
		</div>
	);
}

export default App;