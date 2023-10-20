import Header from "./Header.tsx";
import {HandleListChange, Skills} from "../App.tsx";

interface SkillFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
   handleSubmitChange: (data: HandleListChange) => void;
   handleRemoveChange: (targetId: string) => void;
	currState: Skills;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function SkillForm({ isActive, onExpand, handleSubmitChange, handleRemoveChange, setState, currState }: SkillFormProps) {
	// Handles the expand/collapse btns by setting the curr index to expand on or -1 to collapse
	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(1);
	};

   const handleSubmit = (e: React.FormEvent) => {

   }

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<Header name="Skills" isActive={isActive} handleExpandClick={handleExpandClick} />
         <div className='main-skill-container'>
            {/* Add individual skills down below */}
            <div className='skill-list-container'>
            </div>
            <form className='skill-input-container' onSubmit={handleSubmit}>
               <input type="text" required/>
               <button type="submit">Add</button>
            </form>
         </div>
		</div>
	);
}
