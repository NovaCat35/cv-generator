interface DisableDateProps{
   onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function DisableDate({onToggle}: DisableDateProps) {
	return (
		<div className="toggle-container">
			<label htmlFor="checkbox">Current Status</label>
			<input type="checkbox" id="checkbox" onChange={onToggle}/>
		</div>
	);
}
