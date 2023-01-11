import React from 'react';
const Marker = ({colorCode, place, deleteMarker}) => {
	return <div className="marker" onClick={() => deleteMarker({colorCode})}>
		<img src={process.env.PUBLIC_URL + `/marker${colorCode+1}.png` } />
		<div className="markerPoint">{place}</div>
	</div>
}
export default React.memo(Marker);