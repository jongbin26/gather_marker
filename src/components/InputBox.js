import {useState, useRef} from 'react';
const InputBox = () => {
	const [content, setContent] = useState("");
	const [place, setPlace] =useState("");
	const [disabled, setDisabled] = useState(false);
	const styleRef = useRef();
	const onKeyPress = (e) => {
		if(e.key == 'Enter'){
			if (content.length < 1){
				e.target.focus();
				return
			}
			setPlace(content);
			setDisabled(true);
			e.target.style.border = "5px solid #495057";
		}
	}
	const reset = (e) => {
		e.target.className="reset";
		setDisabled(false);
		styleRef.current.style.border = "5px solid #a3a1a1";
		setContent("");
	}
	return (
		<div className="InputBox">
			<input value={content} placeholder="Where Are U Go?" onKeyPress = {onKeyPress} onChange={(e)=>setContent(e.target.value)} disabled={disabled} ref={styleRef}/>
			<div className={disabled ? "reset on" : "reset"} onClick={reset}>+</div>
		</div>
	);
};
export default InputBox;