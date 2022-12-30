import React, { useEffect, useState } from 'react';

const { kakao } = window;

const Map = ({ markerList }) => {
	var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
	function displayMarker(place, id) {
		var marker = new kakao.maps.Marker({
			map: map,
			position: new kakao.maps.LatLng(place.y, place.x),
			image: new kakao.maps.MarkerImage(
				process.env.PUBLIC_URL + `/marker${id + 1}.png`,
				new kakao.maps.Size(30, 32),
				{ offset: new kakao.maps.Point(15, 32) }
			),
		});
		kakao.maps.event.addListener(marker, 'click', function () {
			// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
			infowindow.setContent(
				'<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>'
			);
			infowindow.open(map, marker);
		});
	}
	const [map, setMap] = useState(null);
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
		markerList.map((it) => {
			ps.keywordSearch(it.place, (data, status, _pagination) => {
				if (status === kakao.maps.services.Status.OK) {
					// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
					// LatLngBounds 객체에 좌표를 추가합니다
					var bounds = new kakao.maps.LatLngBounds();
					for (var i = 0; i < data.length; i++) {
						displayMarker(data[i], it.id);
						bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
					}

					// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
					map.setBounds(bounds);
				}
			});
		});
	}, [markerList]);
	return (
		<div className="Map">
			<div id="map"></div>
		</div>
	);
};

export default Map;