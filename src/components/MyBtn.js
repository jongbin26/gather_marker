import React from 'react'
const MyBtn = ({ name, text, onClick }) => {
	return (
		<button className={name} onClick={onClick}>
			{text}
		</button>
	);
};
export default MyBtn;