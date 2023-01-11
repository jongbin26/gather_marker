import React, { useEffect, useState } from 'react';

const { kakao } = window;

const Map = ({ markerList }) => {
	const [map, setMap] = useState(null);
	const [beforeMarkerList, setBeforeMarkerList] = useState([]);
	const [markers, setMarkers] = useState([]);
	const [onClickInfowindow, setOnClickInfowindow] = useState(null);
	const color = ['red', 'orange', 'blue', 'purple'];
	function displayMarker(place, id, newMarkers) {
		//marker
		var marker = new kakao.maps.Marker({
			map: map,
			position: new kakao.maps.LatLng(place.y, place.x),
			image: new kakao.maps.MarkerImage(
				process.env.PUBLIC_URL + `/marker${id + 1}.png`,
				new kakao.maps.Size(30, 32),
				{ offset: new kakao.maps.Point(15, 32) }
			),
		});
		//인포윈도우
		var infowindow = new kakao.maps.CustomOverlay({
			map: map,
			position: new kakao.maps.LatLng(place.y, place.x),
			content:
				'<div class="customoverlay ' +
				color[id] +
				'">' +
				'  <a href="https://map.kakao.com/link/map/' +
				place.place_name +
				',' +
				place.y +
				',' +
				place.x +
				'" target="_blank">' +
				'    <span class="title">' +
				place.place_name +
				'</span>' +
				'  </a>' +
				'</div>',
			yAnchor: 2.2,
		});
		infowindow.setMap(null);
		newMarkers = [...newMarkers, [marker, id, infowindow]];
		return newMarkers;
	}
	useEffect(() => {
		var container = document.getElementById('map');
		var options = { center: new kakao.maps.LatLng(37.55516136519056, 127.16406673327354) };
		var kakaoMap = new kakao.maps.Map(container, options);
		setMap(kakaoMap);
	}, []);
	useEffect(() => {
		if (markerList.length === 0) {
			var container = document.getElementById('map');
			var options = { center: new kakao.maps.LatLng(37.55516136519056, 127.16406673327354) };
			var kakaoMap = new kakao.maps.Map(container, options);
			setMap(kakaoMap);
		}
		const ps = new kakao.maps.services.Places();
		let newMarkers = [...markers];
		//beforeMarkerList.length < markerList.length (경우1)
		if (beforeMarkerList.length < markerList.length) {
			const changeMarkerList = markerList.filter((it) => !beforeMarkerList.includes(it));
			changeMarkerList.map((it) => {
				ps.keywordSearch(it.place, (data, status, _pagination) => {
					if (status === kakao.maps.services.Status.OK) {
						var bounds = new kakao.maps.LatLngBounds();
						for (var i = 0; i < data.length; i++) {
							newMarkers = displayMarker(data[i], it.id, newMarkers);
							bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
						}
						map.setBounds(bounds);
					}
					setMarkers(newMarkers);
				});
			});
		}
		//beforeMarkerList.length > markerList.length (경우2)
		if (beforeMarkerList.length > markerList.length) {
			const changeMarkerList = beforeMarkerList.filter((it) => !markerList.includes(it));
			const newMarker = markers.filter((it) => it[1] !== changeMarkerList[0].id);
			const deleteMarker = markers.filter((it) => it[1] === changeMarkerList[0].id);
			deleteMarker.map((it) => {
				it[2].setMap(null);
				it[0].setMap(null);
			});
			setMarkers(newMarker);
		}
		setBeforeMarkerList(markerList);
		//커스텀 오버레이 닫아주기
		markers.map((it) => {
			setOnClickInfowindow(null);
			it[2].setMap(null);
		});
	}, [markerList]);
	useEffect(() => {
		markers.map((it) => {
			kakao.maps.event.addListener(it[0], 'click', () => {
				//처음으로 인포윈도우가 열리는 경우
				if (onClickInfowindow === null) {
					it[2].setMap(map);
					setOnClickInfowindow(it[2]);
				} else if (onClickInfowindow === it[2]) {
					setOnClickInfowindow(null);
					it[2].setMap(null);
				}
				//인포윈도우가 열리는게 처음이 아닌 경우
				else {
					onClickInfowindow.setMap(null);
					it[2].setMap(map);
					setOnClickInfowindow(it[2]);
				}
			});
		});
	}, [onClickInfowindow, markers]);
	return (
		<div className="Map">
			<div id="map"></div>
		</div>
	);
};

export default React.memo(Map);