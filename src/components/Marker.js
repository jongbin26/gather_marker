const Marker = ({colorCode, place}) => {
	return <div className="marker">
		<img src={process.env.PUBLIC_URL + `/marker${colorCode+1}.png` } />
		<div className="markerPoint">{place}</div>
	</div>
}
export default Marker;