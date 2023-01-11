import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import Marker from './Marker';
const { kakao } = window;
const Editor = ({ getMarkerList, type }) => {
	//state
	const [count, setCounter] = useState([0, 0, 0, 0]);
	const [markerList, setMarkerList] = useState([]);
	const [content, setContent] = useState('');
	const [point, setPoint] = useState('');
	const [place, setPlace] = useState('');
	const [disabled, setDisabled] = useState(false);
	const placeRef = useRef();
	const pointRef = useRef();
	
	const onKeyPress = useCallback((e) => {
		if (e.key === 'Enter') {
			if (content.length < 1) {
				e.target.focus();
				return;
			}
			setPlace(content);
			setDisabled(true);
			pointRef.current.focus();
		}
	});
	
	const markerKeyPress = useCallback((e) => {
		if (e.key === 'Enter') {
			if (!place) {
				alert('장소를 입력해주세요!');
				placeRef.current.focus();
				setPoint('');
				setPlace('');
			} else {
				if (markerList.length >= 4) {
					alert('마커가 4개를 초과했습니다!');
					setPoint('');
				} else {
					let id = undefined;
					for (var i = 0; i < 4; i++) {
						if (count[i] === 0) {
							count[i] = 1;
							id = i;
							break;
						}
					}
					setMarkerList([
						...markerList,
						{
							id: id,
							place: place + ' ' + point,
							point: point,
						},
					]);
					setPoint('');
				}
			}
		}
	});
	
	const reset = (e) => {
		if (disabled) {
			setDisabled(false);
			setContent('');
			setMarkerList([]);
			setCounter([0, 0, 0, 0]);
			setPlace('');
		}
	};
	
	const deleteMarker = useCallback(({ colorCode }) => {
		const newMarkerList = markerList.filter((marker) => marker.id !== colorCode);
		count[colorCode] = 0;
		setMarkerList(newMarkerList);
	}, [markerList]);
	
	useEffect(() => {
		if(type === "second"){
			setCounter([1, 1, 1, 1]);
			setMarkerList([{id: 0, place: "합정 인생네컷", point: "인생네컷"}, {id: 1, place: "합정 포토이즘", point: "포토이즘"}, {id: 2, place: "합정 하루필름", point: "하루필름"}, {id: 3, place: "합정 셀픽스", point: "셀픽스"}]);
			setContent('합정');
			setPoint('');
			setPlace('합정');
			setDisabled(true);
		}else{
			setCounter([0, 0, 0, 0]);
			setMarkerList([]);
			setContent('');
			setPoint('');
			setPlace('');
			setDisabled(false);
		}
	}, [type])
	useEffect(() => {
		getMarkerList(markerList);
	}, [markerList]);
	return (
		<div>
			<div className="Editor">
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
					ref={pointRef}
				/>
			</div>
			<div className="MarkerBox">
				{markerList.map((it) => (
					<Marker
						key={it.id}
						colorCode={it.id}
						place={it.point}
						deleteMarker={deleteMarker}
					/>
				))}
			</div>
		</div>
	);
};
export default Editor;