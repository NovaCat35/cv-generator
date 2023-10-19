interface DisableDateProps{
   onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
}
export default function DisableDate({onToggle, checked}: DisableDateProps) {
	return (
		<div className="toggle-container">
			<label htmlFor="checkbox">Current Status</label>
			<input type="checkbox" id="checkbox" onChange={onToggle} checked={checked}/>
		</div>
	);
}
