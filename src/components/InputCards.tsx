import AddSVG from "../assets/add.svg";

interface InputCardsProps {
   type: string;
   currState: any;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onAddToList: () => void;
}
export default function InputCards({type, currState, onChange, onAddToList} : InputCardsProps) {
	return (
		<div className={`add-input-container add-card-container`}>
			<input type="text" placeholder={(type == 'skill') ? "Add Skill" : "Add Bullet Point"} onChange={onChange} value={(type == 'skill') ? currState.skill : currState.bulletPoint} />
			<button className="addBtn" type="button" onClick={onAddToList}>
				<img src={AddSVG} alt="add button img" />
			</button>
		</div>
	);
}
