import React, { useState, useRef } from 'react';
import {createRoot} from "react-dom/client";
import Marker from "./Marker";
const InputBox = () => {
	const [count, setCounter] = useState([0,0,0,0]);
	const [markerList, setMarkerList] = useState([]);
	const [content, setContent] = useState('');
	const [point, setPoint] = useState('');
	const [place, setPlace] = useState('');
	const [disabled, setDisabled] = useState(false);
	const placeRef = useRef();
	const onKeyPress = (e) => {
		if (e.key == 'Enter') {
			if (content.length < 1) {
				e.target.focus();
				return;
			}
			setPlace(content);
			setDisabled(true);
		}
	};
	const markerKeyPress = (e) => {
		if (e.key == 'Enter') {
			if (!place){
				placeRef.current.focus();
			}
			else{
				if (markerList.length >= 4){
					alert("마커가 4개를 초과했습니다!");
				}
				else{
					let id = undefined;
					for(var i=0; i<4; i++){
						if (count[i] == 0){
							count[i] = 1;
							id = i;
							break;
						}
					}
					setMarkerList([...markerList, {
						id : id,
						place : (place + " " + point)
					}]);
					setPoint("")
				}
			}
		}
	}
	const reset = (e) => {
		if (disabled) {
			setDisabled(false);
			setContent('');
			setMarkerList('');
		}
	};
	return (
		<div>
			<div className="InputBox">
				<input
					className={disabled ? 'input block' : 'input'}
					value={content}
					placeholder="Where Are U Go?"
					onClick={reset}
					onKeyPress={onKeyPress}
					onChange={(e) => setContent(e.target.value)}
					ref={placeRef}
				/>
				<input
					className="point"
					value={point}
					placeholder="Marker Place"
					onKeyPress={markerKeyPress}
					onChange={(e) => setPoint(e.target.value)}
				/>
			</div>
			<div className="MarkerBox">
				{markerList.map((it)=>(
					<Marker key = {it.id} colorCode={it.id} place={it.place}/>
				))}
			</div>
		</div>
	);
};
export default InputBox;