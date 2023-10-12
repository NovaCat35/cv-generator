import Input from "./Input.tsx";
import { Person } from "../App.tsx";

interface GeneralFormProps {
   personInfo: Person;
   onChange: (e: React.ChangeEvent<HTMLInputElement>, inputValue: string) => void;
}
 

export default function GeneralForm({ personInfo, onChange }: GeneralFormProps) {
	return (
		<div className="form-container">
			<form action="">
				<Input label='Full name' keyName='name' placeholder='Edward Elric' onChange={onChange} />
				<Input label='Email' keyName='email' placeholder='edward.elric@gmail.com' onChange={onChange} />
				<Input label='Telephone' keyName='phone' placeholder='(202) 456-1111' onChange={onChange} />
			</form>
		</div>
	);
}

