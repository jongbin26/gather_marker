import MyBtn from './MyBtn';
import { useState, useEffect, useRef } from 'react';
const TopBox = () => {
	const [menuToggle, setMenuToggle] = useState(false);

	const switchToggle = () => {
		setMenuToggle(!menuToggle);
	};

	const showFirstBtn = () => {
		console.log('First');
	};
	const showSecondBtn = () => {
		console.log('Secons');
	};

	const handleClickOutside = (e) => {
		if (menuToggle && !menuRef.current.contains(e.target)) {
			setMenuToggle(false);
		}
	};
	const menuRef = useRef();
	useEffect(() => {
		if (menuToggle) document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuToggle]);

	return (
		<div className='TopBox'>
			<MyBtn
				name={`menuBtn ${menuToggle ? '' : 'On'} menuBtn-gray`}
				text={'GATHER MARKER'}
				onClick={switchToggle}
			>
				GATHER
				<br />
				MARKER
			</MyBtn>
			<div className={`selectBox ${menuToggle ? 'On' : ''}`} ref={menuRef}>
				<MyBtn name={"leftBtn"} text={'Add Marker'} onClick={showFirstBtn}></MyBtn>
				<MyBtn name={"rightBtn"} text={'Example: STUDIO'} onClick={showSecondBtn}></MyBtn>
			</div>
		</div>
	);
};

export default TopBox;