const Marker = ({colorCode, place}) => {
	return <div>
		<div className="colorArea"></div>
		<div className="markerPoint">{place}</div>
	</div>
}
export default Marker;