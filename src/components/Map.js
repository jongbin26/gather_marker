import React, { useEffect, useState } from 'react';

const { kakao } = window;

const Map = ({ markerList }) => {
	const [map, setMap] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [info, setInfo] = useState();
	useEffect(() => {
		const container = document.getElementById('map');
		const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
		const kakaoMap = new kakao.maps.Map(container, options);
		setMap(kakaoMap);
		if (!map) return;
		const ps = new kakao.maps.services.Places();
		ps.keywordSearch('이태원 맛집', (data, status, _pagination) => {
			if (status === kakao.maps.services.Status.OK) {
				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// LatLngBounds 객체에 좌표를 추가합니다
				const bounds = new kakao.maps.LatLngBounds();
				let markers = [];

				for (var i = 0; i < data.length; i++) {
					// @ts-ignore
					markers.push({
						position: {
							lat: data[i].y,
							lng: data[i].x,
						},
						content: data[i].place_name,
					});
					// @ts-ignore
					bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
				}
				setMarkers(markers);

				// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
				map.setBounds(bounds);
			}
		});
	}, [map]);
	return (
		<div className="Map">
			<div id="map" onCreate={setMap}></div>
		</div>
	);
};

export default Map;