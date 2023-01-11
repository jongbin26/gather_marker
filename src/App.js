import React, { useReducer, useState, useEffect, useCallback } from 'react';
import './App.css';
import TopBox from './components/TopBox';
import Map from './components/Map';
import Editor from './components/Editor';

function App() {
	const [markerList, setMarkerList] = useState([]);
	const [type, setType] = useState("first");
	const getMarkerList = (markerList) => {
		setMarkerList(markerList);
	};
	const setChangeType = useCallback((type) => {
		if (type === "second"){
			setType("second");
		}else{
			setType("first");
		}
	}, [type]);
	return (
		<div className="App">
			<TopBox setChangeType={setChangeType}/>
			<Map markerList={markerList}/>
			<Editor getMarkerList={getMarkerList} type={type}/>
		</div>
	);
}

export default React.memo(App);