interface FormButtonsProps {
	handleCancelClick: () => void;
}

export default function FormButtons({ handleCancelClick }: FormButtonsProps) {
	return (
		<div className="button-container">
			<button className="cancel-btn" type="button" onClick={handleCancelClick}>
				Cancel
			</button>
			<button className="submit-btn" type="submit">
				Submit
			</button>
		</div>
	);
}
